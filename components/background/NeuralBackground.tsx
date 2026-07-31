"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { NeuralField } from "./NeuralField";
import { AmbientLayer } from "./AmbientLayer";
import { CameraRig } from "./CameraRig";

/**
 * Fixed, full-viewport backdrop — the site's one signature identity.
 * Three depth layers (far ambient / mid constellation / near ambient)
 * plus a fog-based falloff and a camera that answers to cursor and
 * scroll as a single body. The goal is a world you move through, not a
 * decoration behind the text.
 */
export function NeuralBackground() {
  const [count, setCount] = useState(120);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [ready, setReady] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const scrollRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    const resize = () => {
      const w = window.innerWidth;
      // Noticeably denser than the first pass — this field should read
      // as rich at a glance, not "a few dots that happen to move".
      setCount(w < 640 ? 250 : w < 1024 ? 420 : 700);
    };
    resize();
    window.addEventListener("resize", resize);

    // Lerped scroll progress (0 → 1 across the ENTIRE document, not just
    // the first couple of screens) drives the world parallax — read every
    // frame by CameraRig and each layer, never causing a React re-render.
    // Spanning the full page means the constellation keeps subtly
    // evolving (drifting, rotating) all the way down to the footer
    // instead of freezing once you scroll past the hero.
    let raf = 0;
    const tick = () => {
      const max = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const p = Math.min(window.scrollY / max, 1);
      scrollRef.current += (p - scrollRef.current) * 0.08;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    setReady(true);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!ready) return <div className="fixed inset-0 z-0 bg-canvas" />;

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <div className="absolute inset-0 atmosphere" />
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: canvasReady ? 1 : 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onCreated={() => {
          // Fires once the WebGL context exists and the first frame is
          // about to render — waiting for this (instead of fading in on
          // mount) is what actually hides the shader-compile pop-in on
          // slower GPUs, rather than just masking it with a fixed delay.
          requestAnimationFrame(() => setCanvasReady(true));
        }}
      >
        <fog attach="fog" args={["#0A0A0B", 5, 15]} />
        <Suspense fallback={null}>
          <AmbientLayer
            count={count < 150 ? 50 : 90}
            depth={[-9, -6]}
            size={0.18}
            opacity={0.35}
            parallax={0.35}
            scrollRef={scrollRef}
            reducedMotion={reducedMotion}
          />
          <NeuralField count={count} reducedMotion={reducedMotion} scrollRef={scrollRef} />
          <AmbientLayer
            count={count < 150 ? 16 : 28}
            depth={[1.5, 3]}
            size={0.24}
            opacity={0.5}
            parallax={0.8}
            scrollRef={scrollRef}
            reducedMotion={reducedMotion}
          />
          <CameraRig scrollRef={scrollRef} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
      </motion.div>
      {/* Cinematic vignette — pulls focus to center, sells depth at the edges */}
      <div className="pointer-events-none absolute inset-0 vignette" />
    </div>
  );
}
