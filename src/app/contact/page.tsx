import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

type ContactTone = {
  shell: string
  panel: string
  soft: string
  muted: string
  action: string
  input: string
  textarea: string
}

function getTone(kind: ReturnType<typeof getProductKind>): ContactTone {
  if (kind === 'directory') {
    return {
      shell: 'bg-[#f8fbff] text-slate-950',
      panel: 'border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]',
      soft: 'border border-slate-200 bg-slate-50 transition hover:border-slate-300',
      muted: 'text-slate-600',
      action: 'rounded-md bg-slate-950 text-white shadow-sm hover:bg-slate-800',
      input: 'h-12 rounded-md border border-slate-200 bg-white px-4 text-sm outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-slate-400/40',
      textarea:
        'min-h-[180px] rounded-md border border-slate-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-slate-400/40',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] text-slate-900',
      panel: 'border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]',
      soft: 'border border-slate-200 bg-white/90 transition hover:border-[#1d4ed8]/20 hover:shadow-[0_12px_40px_rgba(29,78,216,0.08)]',
      muted: 'text-slate-600',
      action: 'rounded-md bg-[#0f172a] px-6 text-sm font-semibold text-white shadow-sm hover:bg-slate-800',
      input: 'h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/35',
      textarea:
        'min-h-[180px] rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/35',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#07101f] text-white',
      panel: 'border border-white/10 bg-white/6 shadow-[0_24px_70px_rgba(0,0,0,0.35)]',
      soft: 'border border-white/10 bg-white/5 transition hover:border-white/20',
      muted: 'text-slate-300',
      action: 'rounded-md bg-[#8df0c8] text-[#07111f] font-semibold shadow-sm hover:bg-[#77dfb8]',
      input: 'h-12 rounded-md border border-white/15 bg-white/10 px-4 text-sm text-white outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#8df0c8]/40',
      textarea:
        'min-h-[180px] rounded-md border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#8df0c8]/40',
    }
  }
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4] shadow-[0_20px_55px_rgba(91,56,37,0.08)]',
    soft: 'border border-[#e8dbce] bg-[#f3e8db] transition hover:border-[#5b2b3b]/25',
    muted: 'text-[#71574a]',
    action: 'rounded-md bg-[#5b2b3b] text-[#fff0f5] font-semibold shadow-sm hover:bg-[#74364b]',
    input: 'h-12 rounded-md border border-[#ddcdbd] bg-[#fffaf4] px-4 text-sm outline-none placeholder:text-[#71574a] focus-visible:ring-2 focus-visible:ring-[#5b2b3b]/30',
    textarea:
      'min-h-[180px] rounded-md border border-[#ddcdbd] bg-[#fffaf4] px-4 py-3 text-sm outline-none placeholder:text-[#71574a] focus-visible:ring-2 focus-visible:ring-[#5b2b3b]/30',
  }
}

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const tone = getTone(productKind)
  const isEditorial = productKind === 'editorial'

  const lanes =
    productKind === 'directory'
      ? [
          { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
          { icon: Phone, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
          { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
        ]
      : productKind === 'editorial'
        ? [
            { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
            { icon: Mail, title: 'Partnerships & sponsorships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
            { icon: Sparkles, title: 'Reader & contributor support', body: 'Questions about accounts, formatting, or the publication workflow.' },
          ]
        : productKind === 'visual'
          ? [
              { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
              { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
              { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
            ]
          : [
              { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
              { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
              { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
            ]

  return (
    <div className={`min-h-screen ${tone.shell}`}>
      <NavbarShell />

      {isEditorial ? (
        <section className="border-b border-slate-200 bg-[#1d4ed8] px-4 py-12 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/80">Contact</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">Reach the {SITE_CONFIG.name} desk</h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
              Submissions, partnerships, corrections, or reader support—we route every message to the right editor. No generic queue.
            </p>
          </div>
        </section>
      ) : null}

      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            {!isEditorial ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Contact {SITE_CONFIG.name}</p>
                <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">A support page that matches the product, not a generic contact form.</h1>
                <p className={`mt-5 max-w-2xl text-sm leading-8 ${tone.muted}`}>
                  Tell us what you are trying to publish, fix, or launch. We will route it through the right lane instead of forcing every request into the same
                  support bucket.
                </p>
              </>
            ) : (
              <>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#b45309]">How we can help</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-900">Pick the lane that fits</h2>
                <p className={`mt-4 max-w-2xl text-sm leading-relaxed ${tone.muted}`}>
                  Whether you are pitching a story or coordinating a partnership, the more context you share, the faster we can respond.
                </p>
              </>
            )}
            <div className="mt-8 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className={`rounded-lg border border-slate-200/80 p-5 ${tone.soft}`}>
                  <lane.icon className={`h-5 w-5 ${isEditorial ? 'text-[#1d4ed8]' : ''}`} />
                  <h3 className="mt-3 text-xl font-semibold">{lane.title}</h3>
                  <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-lg p-7 lg:p-8 ${tone.panel}`}>
            <p className={`text-xs font-bold uppercase tracking-[0.24em] ${isEditorial ? 'text-[#b45309]' : 'opacity-70'}`}>Send a message</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">We read every note</h2>
            <p className={`mt-2 text-sm ${tone.muted}`}>Include links, deadlines, or sections so we can reply with a clear next step.</p>
            <form className="mt-6 grid gap-4">
              <input className={tone.input} placeholder="Your name" />
              <input className={tone.input} placeholder="Email address" type="email" />
              <input className={tone.input} placeholder="Subject or topic" />
              <textarea className={tone.textarea} placeholder="Share the full context so we can respond with the right next step." />
              <button type="submit" className={`inline-flex h-12 w-full items-center justify-center sm:w-auto ${tone.action}`}>
                Send message
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
