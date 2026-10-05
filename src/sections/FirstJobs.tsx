import { Heading } from '../components/ui/Heading.tsx'
import { FIRST_JOBS } from '../content/eigi.ts'
import { JobRunner } from '../features/job-runner/JobRunner.tsx'

/** Before you hire for it, hand it to an Eigi. */
export function FirstJobs() {
  return (
    <section className="section flushTop" id="jobs" aria-labelledby="jobs-title">
      <div className="wrap">
        <Heading eyebrow={FIRST_JOBS.eyebrow} title={FIRST_JOBS.title} serif={FIRST_JOBS.titleSerif} id="jobs-title" />
        <p className="lede" style={{ marginTop: 22 }}>{FIRST_JOBS.lede}</p>
        <JobRunner />
      </div>
    </section>
  )
}
