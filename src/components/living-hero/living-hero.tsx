"use client";

import { useEffect, useRef, useState } from "react";
import { startLivingHero } from "./renderer";

type HeroState = "loading" | "live" | "static";

/**
 * Animated layer for the home hero. The static .hero-art image stays underneath,
 * so reduced motion, missing or slow WebGL, or a failed load all fall back to it.
 */
export function LivingHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const embersRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<HeroState>("loading");

  useEffect(() => {
    const canvas = canvasRef.current;
    const embers = embersRef.current;
    const hero = canvas?.closest<HTMLElement>(".hero");
    const art = hero?.querySelector<HTMLImageElement>(".hero-art");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canvas || !embers || !hero || !art || reducedMotion.matches) {
      setState("static");
      return;
    }
    const stop = startLivingHero(
      { hero, art, canvas, embers },
      () => setState("live"),
      (error) => {
        console.warn("Living hero disabled, showing static artwork.", error);
        setState("static");
      },
    );
    const onMotionChange = () => {
      if (!reducedMotion.matches) return;
      stop();
      setState("static");
    };
    reducedMotion.addEventListener("change", onMotionChange);
    return () => {
      reducedMotion.removeEventListener("change", onMotionChange);
      stop();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="hero-living"
        data-state={state}
        aria-hidden="true"
      />
      <canvas
        ref={embersRef}
        className="hero-embers"
        data-state={state}
        aria-hidden="true"
      />
    </>
  );
}
