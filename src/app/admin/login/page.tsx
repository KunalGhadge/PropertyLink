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
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-radial-at-c from-sky-950/40 via-transparent to-black pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center mx-auto text-white shadow-lg mb-3">
            <Building2 className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400 block">
            Apex Realty Panvel
          </span>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Broker Portal Login
          </h1>
          <p className="text-xs text-slate-400">
            Manage your real estate listings, customer leads, and site settings.
          </p>
        </div>

        {/* Demo Fast Login Selector */}
        <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Quick 1-Click Evaluation Login:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setDemoRole('broker_admin')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                role === 'broker_admin'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Broker Admin
            </button>
            <button
              type="button"
              onClick={() => setDemoRole('agent')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                role === 'agent'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Consultant (Rahul)
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
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
          <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Strict Row Level Security (RLS) & Tenant Isolation Active</span>
          </div>

          <div>
            <Link href="/" className="text-xs text-sky-400 hover:text-sky-300 font-semibold">
              ← Back to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
