import { VERTEX_SHADER, FRAGMENT_SHADER } from "./shader";
import { createEmbers, type Pointer } from "./embers";

export interface LivingHeroElements {
  hero: HTMLElement;
  art: HTMLImageElement;
  canvas: HTMLCanvasElement;
  embers: HTMLCanvasElement;
}

const DEPTH_SRC = "/images/studio-world-depth.webp";
// Matches the CSS scale on the static artwork so the canvas fades in without a jump.
const BASE_ZOOM = 1.03;
const SCROLL_ZOOM = 0.18;
const POINTER_EASE = 1.6;
const SOFTWARE_RENDERER =
  /swiftshader|llvmpipe|softpipe|software|basic render/i;
// The first frames decide whether this device can keep up; slower devices fall back.
const SAMPLE_FRAMES = 60;
const SLOW_FRAME_MS = 45;
const RESUME_GAP_MS = 250;
const UNIFORMS = [
  "uImg",
  "uDepth",
  "uRes",
  "uImgRes",
  "uMouse",
  "uFocus",
  "uTime",
  "uZoom",
  "uScroll",
] as const;
type UniformName = (typeof UNIFORMS)[number];

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Could not create shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    throw new Error(gl.getShaderInfoLog(shader) || "Shader failed to compile");
  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const program = gl.createProgram();
  if (!program) throw new Error("Could not create program");
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    throw new Error(gl.getProgramInfoLog(program) || "Program failed to link");
  return program;
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load ${src}`));
    image.src = src;
  });
}

function uploadTexture(
  gl: WebGLRenderingContext,
  image: HTMLImageElement,
  unit: number,
) {
  const texture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return texture;
}

/** Reads the artwork's responsive object-position so the canvas frames it identically. */
function readFocus(art: HTMLImageElement): [number, number] {
  const parts = getComputedStyle(art).objectPosition.split(" ");
  const toFraction = (value: string | undefined) =>
    value?.endsWith("%") ? parseFloat(value) / 100 : 0.5;
  return [toFraction(parts[0]), toFraction(parts[1])];
}

/** CPU-emulated WebGL would stall the whole page, so it gets the static artwork. */
function isSoftwareRenderer(gl: WebGLRenderingContext) {
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const renderer = String(
    gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER),
  );
  return SOFTWARE_RENDERER.test(renderer);
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/**
 * Brings the hero artwork to life with WebGL. Calls onReady once both textures are
 * uploaded and returns a cleanup function. Any failure leaves the static artwork.
 */
export function startLivingHero(
  elements: LivingHeroElements,
  onReady: () => void,
  onError: (error: unknown) => void,
): () => void {
  const { hero, art, canvas } = elements;
  const maybeGl = canvas.getContext("webgl", {
    antialias: false,
    alpha: false,
  });
  const emberContext = elements.embers.getContext("2d");
  if (!maybeGl || !emberContext) {
    onError(new Error("WebGL or 2D canvas is unavailable"));
    return () => {};
  }
  const gl: WebGLRenderingContext = maybeGl;
  if (isSoftwareRenderer(gl)) {
    onError(new Error("WebGL is software-rendered on this device"));
    return () => {};
  }

  let program: WebGLProgram;
  try {
    program = createProgram(gl);
  } catch (error) {
    onError(error);
    return () => {};
  }
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const position = gl.getAttribLocation(program, "aPos");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const uniform = Object.fromEntries(
    UNIFORMS.map((name) => [name, gl.getUniformLocation(program, name)]),
  ) as Record<UniformName, WebGLUniformLocation | null>;

  const embers = createEmbers(emberContext);
  let target: Pointer = { x: 0, y: 0 };
  let pointer: Pointer = { x: 0, y: 0 };
  let imageSize: [number, number] = [1, 1];
  let focus: [number, number] = [0.5, 0.5];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let ready = false;
  let visible = true;
  let disposed = false;
  let rafId = 0;
  let last = performance.now();
  let lastScroll = -1;
  let sampledFrames = 0;
  let sampledMs = 0;
  let textures: (WebGLTexture | null)[] = [];

  function resize() {
    const rect = hero.getBoundingClientRect();
    const nextDpr = Math.min(
      window.devicePixelRatio || 1,
      rect.width < 700 ? 1.25 : 1.5,
    );
    focus = readFocus(art);
    if (rect.width === width && rect.height === height && nextDpr === dpr)
      return;
    width = rect.width;
    height = rect.height;
    dpr = nextDpr;
    for (const surface of [canvas, elements.embers]) {
      surface.width = Math.round(width * dpr);
      surface.height = Math.round(height * dpr);
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    embers.resize(width, height);
  }

  function schedule() {
    if (!rafId && ready && visible && !document.hidden && !disposed)
      rafId = requestAnimationFrame(frame);
  }

  function tooSlow(frameMs: number) {
    if (sampledFrames >= SAMPLE_FRAMES || frameMs > RESUME_GAP_MS) return false;
    sampledFrames += 1;
    sampledMs += frameMs;
    return (
      sampledFrames === SAMPLE_FRAMES &&
      sampledMs / SAMPLE_FRAMES > SLOW_FRAME_MS
    );
  }

  function frame(now: number) {
    rafId = 0;
    const frameMs = now - last;
    last = now;
    if (tooSlow(frameMs)) {
      dispose();
      onError(new Error("Living hero is too slow on this device"));
      return;
    }
    const dt = Math.min(0.05, frameMs / 1000);
    const t = now / 1000;
    const ease = Math.min(1, dt * POINTER_EASE);
    pointer = {
      x: pointer.x + (target.x - pointer.x) * ease,
      y: pointer.y + (target.y - pointer.y) * ease,
    };
    // a very slow, tiny idle drift: the world breathes, the camera never sways
    const drift = Math.sin(t * 0.07) * 0.12;
    const scroll = clamp(-hero.getBoundingClientRect().top / height, 0, 1);

    gl.uniform1i(uniform.uImg, 0);
    gl.uniform1i(uniform.uDepth, 1);
    gl.uniform2f(uniform.uRes, canvas.width, canvas.height);
    gl.uniform2f(uniform.uImgRes, imageSize[0], imageSize[1]);
    gl.uniform2f(uniform.uMouse, pointer.x + drift, pointer.y);
    gl.uniform2f(uniform.uFocus, focus[0], focus[1]);
    gl.uniform1f(uniform.uTime, t);
    gl.uniform1f(uniform.uZoom, BASE_ZOOM + scroll * SCROLL_ZOOM);
    gl.uniform1f(uniform.uScroll, scroll);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    embers.draw(t, dt, pointer, dpr);

    if (scroll !== lastScroll) {
      hero.style.setProperty("--hero-scroll", scroll.toFixed(3));
      lastScroll = scroll;
    }
    schedule();
  }

  const onPointerMove = (event: PointerEvent) => {
    target = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: (event.clientY / window.innerHeight) * 2 - 1,
    };
  };
  const onOrientation = (event: DeviceOrientationEvent) => {
    if (event.gamma === null || event.beta === null) return;
    target = {
      x: clamp(event.gamma / 25, -1, 1),
      y: clamp((event.beta - 45) / 25, -1, 1),
    };
  };
  const onContextLost = (event: Event) => {
    event.preventDefault();
    dispose();
    onError(new Error("WebGL context was lost"));
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    schedule();
  });
  const sizeObserver = new ResizeObserver(resize);

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("deviceorientation", onOrientation);
  canvas.addEventListener("webglcontextlost", onContextLost);
  document.addEventListener("visibilitychange", schedule);
  observer.observe(hero);
  sizeObserver.observe(hero);

  Promise.all([loadImage(art.currentSrc || art.src), loadImage(DEPTH_SRC)])
    .then(([image, depth]) => {
      if (disposed) return;
      textures = [uploadTexture(gl, image, 0), uploadTexture(gl, depth, 1)];
      imageSize = [image.naturalWidth, image.naturalHeight];
      resize();
      ready = true;
      last = performance.now();
      schedule();
      onReady();
    })
    .catch((error) => {
      if (disposed) return;
      dispose();
      onError(error);
    });

  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(rafId);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("deviceorientation", onOrientation);
    canvas.removeEventListener("webglcontextlost", onContextLost);
    document.removeEventListener("visibilitychange", schedule);
    observer.disconnect();
    sizeObserver.disconnect();
    hero.style.removeProperty("--hero-scroll");
    // Free GPU resources but keep the context usable, so a remount on the same
    // canvas (React StrictMode, Fast Refresh) can start again.
    textures.forEach((texture) => gl.deleteTexture(texture));
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
  }

  return dispose;
}
