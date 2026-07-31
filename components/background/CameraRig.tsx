"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

/**
 * The thing that actually sells "one three-dimensional world": the whole
 * scene reacts to cursor and scroll as a single body, not per-element.
 */
export function CameraRig({
  scrollRef,
  reducedMotion,
}: {
  scrollRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
}) {
  const { camera, viewport, size } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 6));
  const globalMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      // Normalize to [-1, 1] relative to window viewport
      globalMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      globalMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        globalMouse.current.x = (touch.clientX / window.innerWidth) * 2 - 1;
        globalMouse.current.y = -(touch.clientY / window.innerHeight) * 2 + 1;
      }
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("touchmove", handleTouch);
    };
  }, []);

  useFrame((state) => {
    if (size.height < 300) return; // Prevent glitches on mount before dimensions settle

    const t = state.clock.elapsedTime;
    const idle = reducedMotion ? 0 : Math.sin(t * 0.05) * 0.15;

    const px = reducedMotion ? 0 : globalMouse.current.x;
    const py = reducedMotion ? 0 : globalMouse.current.y;

    target.current.x = px * 0.5 + idle * 0.3;
    target.current.y = py * 0.3 - scrollRef.current * 0.6;
    target.current.z = 6 - scrollRef.current * 0.8;

    camera.position.x += (target.current.x - camera.position.x) * 0.03;
    camera.position.y += (target.current.y - camera.position.y) * 0.03;
    camera.position.z += (target.current.z - camera.position.z) * 0.03;
    camera.rotation.z += (-scrollRef.current * 0.04 - camera.rotation.z) * 0.03;
    camera.lookAt(0, -scrollRef.current * 1.5, 0);
  });

  return null;
}
