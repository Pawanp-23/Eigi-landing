import { describe, expect, it } from 'vitest'
import { FIRST_JOBS, HIRE_ROLES } from '../../content/eigi.ts'
import { stagesOf } from './stages.ts'

describe('job stages', () => {
  const jobs = HIRE_ROLES.flatMap((r) => r.jobs)

  it('every job moves through the same four stages', () => {
    for (const job of jobs) expect(stagesOf(job).map((s) => s.name)).toEqual(['Understanding', 'Working', 'Your OK', 'Done'])
  })

  it('jobs that send something wait for approval; drafts-only jobs do not', () => {
    const sends = jobs.find((j) => j.approval !== null)!
    const drafts = jobs.find((j) => j.approval === null)!
    expect(stagesOf(sends)[2]).toMatchObject({ needsOk: true, text: sends.approval })
    expect(stagesOf(drafts)[2]).toMatchObject({ needsOk: false, text: FIRST_JOBS.noApproval })
  })
})
