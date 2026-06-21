import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'

const highlights = [
  { label: 'Published features', value: '120+' },
  { label: 'Reading minutes / month', value: '2.4M' },
  { label: 'Topics covered', value: '40+' },
]

const values = [
  {
    title: 'Edited for clarity',
    description: 'Every piece is structured for deep reading, with clear hierarchy, generous spacing, and typography that supports long sessions.',
  },
  {
    title: 'Built for focus',
    description: 'No noisy side rails or infinite gimmicks. The layout stays out of the way so the writing leads.',
  },
  {
    title: 'Open to contributors',
    description: 'We welcome strong reporting, essays, and explainers that fit our standards and audience.',
  },
]

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is an editorial publication for essays, reporting, and long-form stories in a clean reading experience.`}
      actions={
        <Button asChild>
          <Link href="/contact">Contact Us</Link>
        </Button>
      }
    >
      <div className="grid gap-8 border border-slate-200 bg-white lg:grid-cols-[1fr_1fr]">
        <div className="border-b border-slate-200 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b45309]">Our story</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">One home for serious reading.</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            {SITE_CONFIG.name} publishes articles and features for readers who want depth. We prioritize reporting, essays, and explainers, not generic feeds or
            mixed-purpose directories.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.label} className="border border-slate-200 bg-slate-50 px-3 py-4">
                <div className="text-xl font-semibold text-slate-900">{item.value}</div>
                <div className="mt-1 text-xs text-slate-600">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="divide-y divide-slate-200">
          {values.map((value) => (
            <div key={value.title} className="p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-slate-900">{value.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
