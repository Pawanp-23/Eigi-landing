/*
 * What Sherpie does beside you in each part of the climb: a pose and one short line.
 * Keyed by the altimeter's stage labels (each section's data-stage). Pure, so it is unit-tested.
 */
import type { Pose } from '../sherpie/draw.ts'
import type { Load } from './loads.ts'

export type Beat = { pose: Pose; line: string }

export function beatFor(stage: string, load: Load | null): Beat {
  const pack = load?.tag
  const carrying: Pose = pack ? { pack, eyes: 'happy', blush: true } : { eyes: 'open' }
  if (stage.startsWith('Camp')) {
    return { pose: { ...carrying }, line: pack ? `${stage}. I’ve still got your ${pack.toLowerCase()} pack.` : `${stage}. One step at a time.` }
  }
  switch (stage) {
    case 'The problem': return { pose: { eyes: 'up', brows: 'think', mouth: 'flat', think: true, pack }, line: 'So many peaks. Which one first?' }
    case 'Where we stand': return { pose: { eyes: 'wink', blush: true, pack }, line: 'Tools are great. A guide is better.' }
    case 'Eigi stories': return { pose: { eyes: 'big', mouth: 'small', pack }, line: 'Teams like yours. Real climbs.' }
    case 'The gateway': return { pose: { eyes: 'big', mouth: 'o', arms: 'shrug', pack }, line: 'Ooh. Step through with me.' }
    case 'Field test': return { pose: { flag: true, arms: 'flag', eyes: 'happy', mouth: 'open' }, line: 'Watch this. I’ll plant the flag.' }
    case 'With your sherpa': return { pose: { arms: 'hug', heart: true, eyes: 'soft', brows: 'worried', blush: true }, line: 'That’s us. You never climb alone.' }
    case 'Summit': return { pose: pack ? { give: pack, arms: 'hug', eyes: 'happy', blush: true } : { arms: 'cheer', eyes: 'happy', mouth: 'open', sparks: true }, line: pack ? 'We made it. Your pack goes to your crew now.' : 'We made it!' }
    case 'Questions': return { pose: { eyes: 'up', brows: 'think', mouth: 'small' }, line: 'Ask away. Or radio Amit.' }
    case 'Back at base camp': return { pose: { legs: 'sit', eyes: 'closed', mouth: 'small', zz: true }, line: 'Back where we started. They’re still carrying it all.' }
    default: return { pose: carrying, line: pack ? 'Scroll on. I’ve got your pack.' : 'I’m right beside you.' }
  }
}

/** Parts of the climb on a black sky: Sherpie draws its props (flag, thoughts, zz) in white there. */
export const DARK_STAGES = new Set(['The gateway', 'With your sherpa', 'Summit', 'Questions', 'Back at base camp'])

/** Shown once when you stop scrolling for a while. */
export const STILL_WITH_ME: Beat = { pose: { back: true, tilt: -6, mouth: 'small' }, line: 'Still with me?' }
