'use client'

import { type FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'
import type { ProductKind } from '@/design/factory/get-product-kind'

const fieldShell: Record<ProductKind, { input: string; action: string; muted: string }> = {
  directory: {
    input: 'h-12 rounded-md border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none ring-offset-background placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-slate-400',
    action: 'inline-flex h-12 items-center justify-center rounded-md bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800',
    muted: 'text-slate-600',
  },
  editorial: {
    input: 'h-12 rounded-md border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/40',
    action: 'inline-flex h-12 items-center justify-center rounded-md bg-[#0f172a] px-6 text-sm font-semibold text-white transition hover:bg-slate-800',
    muted: 'text-slate-600',
  },
  visual: {
    input: 'h-12 rounded-md border border-white/15 bg-white/10 px-4 text-sm text-white outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#8df0c8]/50',
    action: 'inline-flex h-12 items-center justify-center rounded-md bg-[#8df0c8] px-6 text-sm font-semibold text-[#07111f] transition hover:bg-[#77dfb8]',
    muted: 'text-slate-300',
  },
  curation: {
    input: 'h-12 rounded-md border border-[#ddcdbd] bg-[#fffaf4] px-4 text-sm text-[#261811] outline-none placeholder:text-[#71574a] focus-visible:ring-2 focus-visible:ring-[#5b2b3b]/30',
    action: 'inline-flex h-12 items-center justify-center rounded-md bg-[#5b2b3b] px-6 text-sm font-semibold text-[#fff0f5] transition hover:bg-[#74364b]',
    muted: 'text-[#71574a]',
  },
}

export function LoginForm({ productKind }: { productKind: ProductKind }) {
  const f = fieldShell[productKind]
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password) {
      toast({
        title: 'Missing information',
        description: 'Enter your email and password to continue.',
        variant: 'destructive',
      })
      return
    }
    await login(email.trim(), password)
    toast({
      title: 'Signed in',
      description: 'Your session is saved on this device.',
    })
    router.push('/articles')
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
      <input
        className={f.input}
        placeholder="Email address"
        type="email"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <input
        className={f.input}
        placeholder="Password"
        type="password"
        name="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading} className={f.action}>
        {isLoading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}

export function RegisterForm({ productKind }: { productKind: ProductKind }) {
  const f = fieldShell[productKind]
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password) {
      toast({
        title: 'Missing information',
        description: 'Add your name, email, and a password to register.',
        variant: 'destructive',
      })
      return
    }
    await signup(name.trim(), email.trim(), password)
    toast({
      title: 'Welcome aboard',
      description: 'Your account is saved on this device.',
    })
    router.push('/articles')
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
      <input
        className={f.input}
        placeholder="Full name"
        name="name"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
      <input
        className={f.input}
        placeholder="Email address"
        type="email"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <input
        className={f.input}
        placeholder="Password"
        type="password"
        name="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
      <input
        className={f.input}
        placeholder="What do you like to read or write about?"
        name="interest"
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading} className={f.action}>
        {isLoading ? 'Creating…' : 'Create account'}
      </button>
    </form>
  )
}
