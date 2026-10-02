const SUMMIT_M = 8848

/** Page progress (0–1) as height on Everest: 0.5 → "4,424 m". */
export const altitude = (progress: number) => `${Math.round(progress * SUMMIT_M).toLocaleString('en-US')} m`
