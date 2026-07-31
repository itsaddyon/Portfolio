"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getGlowTexture } from "./glowTexture";

type AmbientLayerProps = {
  count: number;
  depth: [number, number]; // z range, negative = further away
  size: number;
  opacity: number;
  parallax: number; // how much this layer answers to cursor/scroll, 0–1
  scrollRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
};

/**
 * A purely atmospheric depth layer — no connections, no click logic.
 * Two instances of this (one behind the main constellation, one in front)
 * are what make the scene read as layered space rather than a flat plane.
 */
export function AmbientLayer({
  count,
  depth,
  size,
  opacity,
  parallax,
  scrollRef,
  reducedMotion,
}: AmbientLayerProps) {
  const ref = useRef<THREE.Points>(null);
  const texture = useMemo(() => getGlowTexture(), []);

  const { positions, drift } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const drift = new Float32Array(count * 2);
    // Fixed generous spawn extent — see NeuralField.tsx for why this must
    // not depend on a live viewport measurement.
    const w = 13;
    const h = 8;
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() * 2 - 1) * w;
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * h;
      positions[i * 3 + 2] = depth[0] + Math.random() * (depth[1] - depth[0]);
      drift[i * 2] = Math.random() * Math.PI * 2;
      drift[i * 2 + 1] = 0.02 + Math.random() * 0.03;
    }
    return { positions, drift };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      // Parallax read from the group, not per-point — cheap and gives a
      // convincing sense that this whole layer sits at a fixed depth.
      const px = reducedMotion ? 0 : state.pointer.x;
      const py = reducedMotion ? 0 : state.pointer.y;
      ref.current.position.x = px * parallax * 1.2;
      ref.current.position.y = py * parallax * 0.8 - scrollRef.current * parallax * 4;
      ref.current.rotation.z = scrollRef.current * parallax * 0.15;
    }
    if (!reducedMotion) {
      const posAttr = ref.current?.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < count; i++) {
        positions[i * 3] += Math.sin(t * drift[i * 2 + 1] + drift[i * 2]) * 0.0006;
        positions[i * 3 + 1] += Math.cos(t * drift[i * 2 + 1] + drift[i * 2]) * 0.0006;
      }
      if (posAttr) posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={size}
        color="#d8d6cd"
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
