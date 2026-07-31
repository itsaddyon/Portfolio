import * as THREE from "three";

/**
 * A soft radial-gradient sprite, generated once and shared by every point
 * layer. This is what turns "dots" into "glowing orbs" — the single
 * highest-leverage change for making the field feel premium instead of
 * like a particle demo.
 */
let cached: THREE.CanvasTexture | null = null;

export function getGlowTexture(): THREE.CanvasTexture {
  if (cached) return cached;

  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.25, "rgba(255,255,255,0.55)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  cached = new THREE.CanvasTexture(canvas);
  return cached;
}
