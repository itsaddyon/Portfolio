"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getGlowTexture } from "./glowTexture";
import { hoverAccent } from "@/lib/interactionState";

/**
 * The living constellation — the site's signature identity.
 */

type FieldProps = {
  count: number;
  reducedMotion: boolean;
  scrollRef: React.MutableRefObject<number>;
};

type Pulse = { origin: THREE.Vector3; born: number };

export function NeuralField({ count, reducedMotion, scrollRef }: FieldProps) {
  const { viewport, size } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const pulses = useRef<Pulse[]>([]);
  const mouse3d = useRef(new THREE.Vector3(9999, 9999, 0));
  const globalMouse = useRef({ x: 0, y: 0 });
  const elapsedRef = useRef(0);
  const texture = useMemo(() => getGlowTexture(), []);

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

  // Project-hover tint: when a project row is hovered (set from the DOM
  // side via lib/interactionState), the whole field warms gently toward
  // that project's accent color — a visible, felt connection between the
  // work list and the site's signature background, not just proximity
  // to the literal cursor position.
  const accentColorRef = useRef(new THREE.Color("#ffffff"));
  const accentStrengthRef = useRef(0);
  const lastAccentHexRef = useRef<string | null>(null);

  const bounds = useMemo(
    () => new THREE.Vector3(viewport.width * 1.15, viewport.height * 1.15, 3.5),
    [viewport.width, viewport.height]
  );
  // Spawn extent is a fixed, generous constant — NOT derived from the
  // live viewport. Deriving it from `viewport` caused a real regression:
  // on first mount the canvas can report a too-small size for a frame
  // before it settles, so nodes spawned cramped near the center and (since
  // we correctly stopped re-randomizing on every resize) never recovered.
  // Containment during animation still uses the live `bounds` above —
  // that's fine, it only affects where nodes reflect, never resets them.
  const SPAWN = { x: 17, y: 11, z: 3.5 };

  const { positions, velocities, phase, connectDistance } = useMemo(() => {
    const isMobile = count <= 250;
    const isTablet = count <= 420 && count > 250;
    const spawnX = isMobile ? 3.0 : isTablet ? 8.0 : 17.0;
    const spawnY = isMobile ? 6.2 : isTablet ? 8.0 : 11.0;
    const spawnZ = 3.5;

    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const phase = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() * 2 - 1) * spawnX;
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * spawnY;
      positions[i * 3 + 2] = (Math.random() * 2 - 1) * spawnZ;
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
      phase[i] = Math.random() * Math.PI * 2;
    }
    const connectDistance = Math.max(spawnX, spawnY) * 0.16;
    return { positions, velocities, phase, connectDistance };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const nodeColors = useMemo(() => {
    const c = new Float32Array(count * 3);
    c.fill(1);
    return c;
  }, [count]);

  const maxSegments = count * 8;
  const linePositions = useMemo(() => new Float32Array(maxSegments * 2 * 3), [maxSegments]);
  const lineColors = useMemo(() => new Float32Array(maxSegments * 2 * 3), [maxSegments]);
  const baseColor = useMemo(() => new THREE.Color("#c5a880"), []);
  const nodeBase = useMemo(() => new THREE.Color("#d4b27d"), []);
  const nodeHot = useMemo(() => new THREE.Color("#fff8eb"), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    if (size.height < 300) return; // Guard to prevent squishing on mount before dimensions settle

    const t = state.clock.elapsedTime;
    elapsedRef.current = t;

    if (groupRef.current) {
      groupRef.current.position.y = -scrollRef.current * 1.6;
      groupRef.current.rotation.z = scrollRef.current * 0.06;
    }

    const targetX = globalMouse.current.x * viewport.width * 0.5;
    const targetY = globalMouse.current.y * viewport.height * 0.5;
    mouse3d.current.x += (targetX - mouse3d.current.x) * 0.08;
    mouse3d.current.y += (targetY - mouse3d.current.y) * 0.08;

    // Track the DOM-hover accent, lerping strength in/out so the tint
    // arrives and leaves smoothly rather than snapping.
    const hex = hoverAccent.current;
    if (hex && hex !== lastAccentHexRef.current) {
      accentColorRef.current.set(hex);
    }
    lastAccentHexRef.current = hex;
    const accentTarget = hex ? 1 : 0;
    accentStrengthRef.current += (accentTarget - accentStrengthRef.current) * 0.05;
    const accentStrength = accentStrengthRef.current;

    const posAttr = pointsRef.current?.geometry.attributes.position as THREE.BufferAttribute;
    const colorAttr = pointsRef.current?.geometry.attributes.color as THREE.BufferAttribute;

    // The cursor's light radius — nodes inside this get both a physical
    // pull toward it AND a brightness ramp, so the effect reads instantly.
    const lightRadius = 3.2;

    for (let i = 0; i < count; i++) {
      const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;
      let heat = 0;

      if (!reducedMotion) {
        const dx = positions[ix] - mouse3d.current.x;
        const dy = positions[iy] - mouse3d.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.0001;
        if (dist < lightRadius) {
          const falloff = 1 - dist / lightRadius;
          // Quadratic falloff: strong right at the cursor, gentle further
          // out — visible pull without nodes flinging across the screen.
          const force = falloff * falloff * 0.0032;
          velocities[ix] += (dx / dist) * force;
          velocities[iy] += (dy / dist) * force;
          heat = falloff;
        }
      }

      for (const p of pulses.current) {
        const age = t - p.born;
        const ringRadius = age * 6;
        const d = Math.hypot(positions[ix] - p.origin.x, positions[iy] - p.origin.y);
        if (Math.abs(d - ringRadius) < 1.4) {
          heat = Math.max(heat, (1 - age / 1.6) * 0.9);
        }
      }

      tmpColor.copy(nodeBase).lerp(nodeHot, Math.min(heat, 1));
      if (accentStrength > 0.003) {
        tmpColor.lerp(accentColorRef.current, accentStrength * 0.55);
      }
      nodeColors[ix] = tmpColor.r;
      nodeColors[iy] = tmpColor.g;
      nodeColors[iz] = tmpColor.b;

      velocities[ix] += Math.sin(t * 0.15 + phase[i]) * 0.00006;
      velocities[iy] += Math.cos(t * 0.13 + phase[i]) * 0.00006;
      velocities[ix] *= 0.985;
      velocities[iy] *= 0.985;
      velocities[iz] *= 0.99;

      positions[ix] += velocities[ix];
      positions[iy] += velocities[iy];
      positions[iz] += velocities[iz];

      // Clamp and reflect boundary physics — resolves trapped vibration loop outside of narrow screen bounds
      // Delay clamping for the first 2.0 seconds after mount to let R3F viewport size settle
      if (t > 2.0) {
        if (positions[ix] > bounds.x) {
          positions[ix] = bounds.x;
          velocities[ix] = -Math.abs(velocities[ix]);
        } else if (positions[ix] < -bounds.x) {
          positions[ix] = -bounds.x;
          velocities[ix] = Math.abs(velocities[ix]);
        }

        if (positions[iy] > bounds.y) {
          positions[iy] = bounds.y;
          velocities[iy] = -Math.abs(velocities[iy]);
        } else if (positions[iy] < -bounds.y) {
          positions[iy] = -bounds.y;
          velocities[iy] = Math.abs(velocities[iy]);
        }

        if (positions[iz] > bounds.z) {
          positions[iz] = bounds.z;
          velocities[iz] = -Math.abs(velocities[iz]);
        } else if (positions[iz] < -bounds.z) {
          positions[iz] = -bounds.z;
          velocities[iz] = Math.abs(velocities[iz]);
        }
      }
    }

    if (posAttr) posAttr.needsUpdate = true;
    if (colorAttr) colorAttr.needsUpdate = true;

    pulses.current = pulses.current.filter((p) => t - p.born < 1.6);

    let seg = 0;
    for (let i = 0; i < count && seg < maxSegments; i++) {
      for (let j = i + 1; j < count && seg < maxSegments; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < connectDistance) {
          let opacity = (1 - d / connectDistance) * 0.32;

          const midX = (positions[i * 3] + positions[j * 3]) / 2;
          const midY = (positions[i * 3 + 1] + positions[j * 3 + 1]) / 2;

          // Cursor-light boost on threads too, not just nodes.
          const distToCursor = Math.hypot(midX - mouse3d.current.x, midY - mouse3d.current.y);
          if (!reducedMotion && distToCursor < lightRadius) {
            opacity += (1 - distToCursor / lightRadius) * 0.5;
          }

          for (const p of pulses.current) {
            const age = t - p.born;
            const ringRadius = age * 6;
            const distToPulse = Math.hypot(midX - p.origin.x, midY - p.origin.y);
            if (Math.abs(distToPulse - ringRadius) < 1.4) {
              opacity += (1 - age / 1.6) * 0.6;
            }
          }

          const o = seg * 6;
          linePositions[o] = positions[i * 3];
          linePositions[o + 1] = positions[i * 3 + 1];
          linePositions[o + 2] = positions[i * 3 + 2];
          linePositions[o + 3] = positions[j * 3];
          linePositions[o + 4] = positions[j * 3 + 1];
          linePositions[o + 5] = positions[j * 3 + 2];

          const b = Math.min(opacity, 1);
          tmpColor.copy(baseColor);
          if (accentStrength > 0.003) {
            tmpColor.lerp(accentColorRef.current, accentStrength * 0.45);
          }
          lineColors[o] = tmpColor.r * b;
          lineColors[o + 1] = tmpColor.g * b;
          lineColors[o + 2] = tmpColor.b * b;
          lineColors[o + 3] = tmpColor.r * b;
          lineColors[o + 4] = tmpColor.g * b;
          lineColors[o + 5] = tmpColor.b * b;
          seg++;
        }
      }
    }

    const lineGeo = lineRef.current?.geometry;
    if (lineGeo) {
      lineGeo.setDrawRange(0, seg * 2);
      (lineGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (lineGeo.attributes.color as THREE.BufferAttribute).needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nodes — soft glow sprites that brighten under the cursor's light */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[nodeColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={texture}
          size={0.22}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Connections */}
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Invisible full-field plane to catch clicks and seed a pulse */}
      <mesh
        position={[0, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          pulses.current.push({ origin: e.point.clone(), born: elapsedRef.current });
        }}
      >
        <planeGeometry args={[bounds.x * 2.4, bounds.y * 2.4]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </group>
  );
}
