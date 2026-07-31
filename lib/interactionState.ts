/**
 * A tiny mutable bridge between DOM-level hover state (project rows,
 * anywhere outside the Canvas) and the NeuralField's per-frame render
 * loop, which lives in a separate React tree (react-three-fiber) and
 * can't consume normal React state without forcing a re-render every
 * frame. Plain mutable object + direct reads in useFrame — the same
 * pattern already used for scrollRef.
 */
export const hoverAccent = { current: null as string | null };

export function setHoverAccent(hex: string | null) {
  hoverAccent.current = hex;
}
