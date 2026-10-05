/** True when the visitor has asked for less motion. Safe to call during server rendering and tests. */
export const prefersReducedMotion = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
