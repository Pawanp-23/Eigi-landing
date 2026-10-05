import { FIRST_JOBS, type Job } from '../../content/eigi.ts'

export type StageName = 'Understanding' | 'Working' | 'Your OK' | 'Done'

export interface Stage {
  name: StageName
  text: string
  /** this stage waits for the founder's approval */
  needsOk: boolean
}

/** The four stages a job moves through. Jobs your rules allow skip the approval wait. */
export const stagesOf = (job: Job): Stage[] => [
  { name: 'Understanding', text: job.understanding, needsOk: false },
  { name: 'Working', text: job.working, needsOk: false },
  { name: 'Your OK', text: job.approval ?? FIRST_JOBS.noApproval, needsOk: job.approval !== null },
  { name: 'Done', text: job.done, needsOk: false },
]
