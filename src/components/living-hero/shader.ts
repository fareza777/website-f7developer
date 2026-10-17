// Image-space coordinates below (P) refer to the 1672×941 studio-world artwork.

export const VERTEX_SHADER = `
  attribute vec2 aPos;
  varying vec2 vUv;
  void main() {
    vUv = aPos * 0.5 + 0.5;
    gl_Position = vec4(aPos, 0.0, 1.0);
  }
`;

export const FRAGMENT_SHADER = `
  precision highp float;
  uniform sampler2D uImg;
  uniform sampler2D uDepth;
  uniform vec2 uRes;
  uniform vec2 uImgRes;
  uniform vec2 uMouse;
  uniform vec2 uFocus;
  uniform float uTime;
  uniform float uZoom;
  uniform float uScroll;
  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + vec2(17.1, 9.2); a *= 0.5; }
    return v;
  }
  float ellipse(vec2 P, vec2 c, vec2 r) { return 1.0 - smoothstep(0.55, 1.0, length((P - c) / r)); }
  float box(vec2 P, vec4 b, float s) {
    vec2 lo = smoothstep(b.xy - s, b.xy + s, P);
    vec2 hi = 1.0 - smoothstep(b.zw - s, b.zw + s, P);
    return lo.x * lo.y * hi.x * hi.y;
  }
  float depthAt(vec2 q) { float d = texture2D(uDepth, q).r; return mix(d, sqrt(d), 0.45); }

  void main() {
    vec2 uv = vec2(vUv.x, 1.0 - vUv.y);
    float t = uTime;

    // object-fit: cover with object-position = uFocus, matching the static <img>
    float sr = uRes.x / uRes.y, ir = uImgRes.x / uImgRes.y;
    vec2 sc = sr > ir ? vec2(1.0, ir / sr) : vec2(sr / ir, 1.0);
    vec2 q0 = uv * sc + (1.0 - sc) * uFocus;

    // camera zoom; scrolling flies toward the citadel
    vec2 viewCenter = 0.5 * sc + (1.0 - sc) * uFocus;
    vec2 zc = mix(viewCenter, vec2(0.74, 0.42), uScroll);
    q0 = zc + (q0 - zc) / uZoom;

    // depth parallax: march from the nearest layer to the farthest and stop at the
    // first surface hit, so the front object wins and edges never double up
    vec2 par = uMouse * vec2(0.012, 0.006);
    const int STEPS = 24;
    float prevS = 1.0;
    float prevDiff = 0.0;
    vec2 q = q0 + par * (depthAt(q0) - 0.3);
    for (int i = 0; i <= STEPS; i++) {
      float s = 1.0 - float(i) / float(STEPS);
      vec2 p = q0 + par * (s - 0.3);
      float diff = depthAt(p) - s;
      if (diff >= 0.0) {
        float k = i == 0 ? 0.0 : prevDiff / (prevDiff - diff);
        q = q0 + par * (mix(prevS, s, k) - 0.3);
        break;
      }
      prevS = s;
      prevDiff = diff;
    }
    q = clamp(q, 0.001, 0.999);

    float d = texture2D(uDepth, q).r;
    vec2 P = q * uImgRes;

    // floating rocks bob, the traveler's cape flutters
    q.y -= sin(t * 0.7) * 0.002 * ellipse(P, vec2(945.0, 290.0), vec2(48.0, 82.0));
    q.y -= sin(t * 0.6 + 2.0) * 0.0018 * ellipse(P, vec2(1612.0, 215.0), vec2(42.0, 62.0));
    q.x += sin(P.y * 0.25 - t * 7.0) * 0.0008
           * ellipse(P, vec2(1430.0, 625.0), vec2(30.0, 32.0)) * step(1408.0, P.x);

    // waterfalls
    float wf = box(P, vec4(1195.0, 430.0, 1242.0, 600.0), 6.0)
             + box(P, vec4(1325.0, 455.0, 1368.0, 590.0), 6.0)
             + box(P, vec4(1538.0, 470.0, 1588.0, 570.0), 6.0)
             + box(P, vec4(984.0, 412.0, 1013.0, 475.0), 4.0)
             + box(P, vec4(758.0, 598.0, 784.0, 672.0), 4.0);
    wf = clamp(wf, 0.0, 1.0);
    float streak = noise(vec2(P.x * 0.32, P.y * 0.035 - t * 3.2)) * 0.6
                 + noise(vec2(P.x * 0.7, P.y * 0.08 - t * 5.0)) * 0.4;

    // a single sample of the painting: no blended copies, so nothing can ghost
    float sky = (1.0 - smoothstep(0.06, 0.14, d)) * (1.0 - smoothstep(0.45, 0.62, q.y));
    vec3 col = texture2D(uImg, q).rgb;
    float lum = dot(col, vec3(0.299, 0.587, 0.114));

    // clouds: drifting light and shadow across the painted sky
    float cloudLight = fbm(vec2(q.x * 2.5 + t * 0.018, q.y * 4.0 - t * 0.004));
    col *= mix(1.0, 0.82 + 0.42 * cloudLight, sky);

    col += vec3(0.85, 0.92, 0.8) * (streak - 0.45) * 0.45 * wf * smoothstep(0.18, 0.55, lum);

    // eclipse: pulsing ring, sweeping highlight, halo and god rays
    vec3 acc = vec3(0.84, 0.98, 0.39);
    vec2 dv = P - vec2(1290.0, 168.0);
    float r = length(dv);
    float R = 126.0;
    float ringMask = 1.0 - smoothstep(0.07, 0.13, d);
    float pulse = 0.5 + 0.5 * sin(t * 1.25);
    float ang = atan(dv.y, dv.x);
    float sweep = pow(0.5 + 0.5 * sin(ang * 2.0 - t * 0.9), 16.0);
    float ring = exp(-pow((r - R) / 5.0, 2.0));
    float halo = exp(-pow((r - R) / 38.0, 2.0));
    col += acc * (ring * (0.2 + 0.3 * pulse + 0.7 * sweep) + halo * (0.05 + 0.1 * pulse)) * ringMask;
    vec2 dir = dv / max(r, 1.0);
    float rays = pow(noise(dir * 7.0 + vec2(t * 0.06, -t * 0.04)), 3.0);
    float rayFade = exp(-r / 430.0) * smoothstep(R * 0.9, R * 1.4, r);
    col += acc * rays * rayFade * 0.4 * (1.0 - smoothstep(0.15, 0.4, d));

    // distant lightning lighting up the clouds
    float cycle = 8.5;
    float ft = mod(t + 6.0, cycle);
    float flash = exp(-ft * 7.0) + step(0.2, ft) * exp(-(ft - 0.2) * 10.0) * 0.6;
    vec2 L = vec2(600.0 + 700.0 * hash(vec2(floor((t + 6.0) / cycle), 3.1)), 110.0);
    col += vec3(0.8, 0.9, 0.72) * flash * exp(-length(P - L) / 280.0) * lum * 1.8 * sky;

    // valley mist with its own parallax depth
    vec2 m1 = q0 + par * 0.4;
    float mist = fbm(vec2(m1.x * 3.0 - t * 0.025, m1.y * 7.0) + fbm(m1 * 5.0 + t * 0.03) * 1.5);
    float mistMask = smoothstep(0.42, 0.75, q.y) * (1.0 - smoothstep(0.3, 0.55, d));
    col += vec3(0.75, 0.8, 0.68) * smoothstep(0.45, 0.85, mist) * mistMask * 0.22;

    // foreground haze drifting in front of everything
    vec2 m2 = q0 + par * 1.3;
    float haze = fbm(vec2(m2.x * 1.6 + t * 0.035, m2.y * 3.2 - t * 0.01));
    col += vec3(0.7, 0.75, 0.62) * smoothstep(0.5, 0.9, haze) * smoothstep(0.6, 1.0, uv.y) * 0.12;

    col *= 1.0 - 0.55 * uScroll;
    col += (hash(uv * uRes) - 0.5) * 0.012;
    gl_FragColor = vec4(col, 1.0);
  }
`;
