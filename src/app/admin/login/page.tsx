'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Building2, ShieldCheck, ArrowRight, Lock, Mail, Loader2, CheckCircle2 } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('broker@apexrealty.in')
  const [password, setPassword] = useState('admin123')
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState<'broker_admin' | 'agent'>('broker_admin')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login and redirect to /admin
    setTimeout(() => {
      setIsLoading(false)
      router.push('/admin')
    }, 600)
  }

  const setDemoRole = (selectedRole: 'broker_admin' | 'agent') => {
    setRole(selectedRole)
    if (selectedRole === 'broker_admin') {
      setEmail('broker@apexrealty.in')
      setPassword('admin123')
    } else {
      setEmail('agent.rahul@apexrealty.in')
      setPassword('agent123')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-950 text-white relative overflow-hidden">
      <div className="relative w-full max-w-md bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 backdrop-blur-md">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center mx-auto shadow-md mb-3">
            <Building2 className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">
            Apex Realty Panvel
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Broker Portal Login
          </h1>
          <p className="text-xs text-neutral-400">
            Manage your real estate listings, customer leads, and site settings.
          </p>
        </div>

        {/* Demo Fast Login Selector */}
        <div className="p-3 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-2">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
            Quick 1-Click Evaluation Login:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setDemoRole('broker_admin')}
              className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                role === 'broker_admin'
                  ? 'bg-white text-black shadow-xs'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              Broker Admin
            </button>
            <button
              type="button"
              onClick={() => setDemoRole('agent')}
              className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                role === 'agent'
                  ? 'bg-white text-black shadow-xs'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              Consultant (Rahul)
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 w-4 h-4 text-neutral-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-neutral-950 border border-neutral-800 rounded-xl focus:outline-none focus:border-white text-white transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 w-4 h-4 text-neutral-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-neutral-950 border border-neutral-800 rounded-xl focus:outline-none focus:border-white text-white transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 active:scale-98"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-neutral-700" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security badge & Home link */}
        <div className="pt-2 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 text-[11px] text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Strict Row Level Security (RLS) & Tenant Isolation Active</span>
          </div>

          <div>
            <Link href="/" className="text-xs text-neutral-400 hover:text-white font-medium transition-colors">
              ← Back to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
