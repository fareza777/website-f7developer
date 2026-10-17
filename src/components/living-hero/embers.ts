interface Ember {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  phase: number;
  size: number;
}

export interface Pointer {
  x: number;
  y: number;
}

function createEmber(width: number, height: number, anywhere: boolean): Ember {
  const z = Math.random();
  return {
    x: Math.random() * width,
    y: anywhere ? Math.random() * height : height + 10,
    z,
    vx: -4 - Math.random() * 8,
    vy: 8 + z * 26 + Math.random() * 10,
    phase: Math.random() * Math.PI * 2,
    size: 0.6 + z * 2.2,
  };
}

/** Glowing lime embers drifting up through the scene, parallaxed by their depth. */
export function createEmbers(ctx: CanvasRenderingContext2D) {
  let embers: Ember[] = [];
  let width = 0;
  let height = 0;

  function resize(nextWidth: number, nextHeight: number) {
    width = nextWidth;
    height = nextHeight;
    const count = width < 700 ? 45 : 95;
    // Keep drifting embers through mobile URL-bar resizes; reseed only on a new count.
    if (embers.length === count) return;
    embers = Array.from({ length: count }, () =>
      createEmber(width, height, true),
    );
  }

  function draw(t: number, dt: number, pointer: Pointer, dpr: number) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = "lighter";
    embers = embers.map((ember) => {
      const moved = {
        ...ember,
        x: ember.x + (ember.vx + Math.sin(t * 0.8 + ember.phase) * 10) * dt,
        y: ember.y - ember.vy * dt,
      };
      return moved.y < -20 || moved.x < -20
        ? createEmber(width, height, false)
        : moved;
    });
    for (const ember of embers) {
      const px = ember.x - pointer.x * ember.z * 30;
      const py = ember.y - pointer.y * ember.z * 18;
      const radius = ember.size * 4;
      const flicker = 0.55 + 0.45 * Math.sin(t * 3 + ember.phase * 3);
      const fade = Math.min(1, Math.max(0, ember.y / (height * 0.3)));
      const alpha = 0.65 * flicker * fade;
      const glow = ctx.createRadialGradient(px, py, 0, px, py, radius);
      glow.addColorStop(0, `rgba(230,255,150,${alpha})`);
      glow.addColorStop(0.35, `rgba(213,251,99,${alpha * 0.5})`);
      glow.addColorStop(1, "rgba(213,251,99,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";
  }

  return { resize, draw };
}
