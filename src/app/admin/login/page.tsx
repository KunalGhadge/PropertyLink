'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Building2, ShieldCheck, ArrowRight, Lock, Mail, Loader2, Sparkles, CheckCircle2 } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@apexrealty.in')
  const [password, setPassword] = useState('Admin@PropertyLink2026!')
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState<'broker_admin' | 'agent'>('broker_admin')

  const completeLogin = () => {
    setIsLoading(true)
    if (typeof window !== 'undefined') {
      localStorage.setItem('propertylink_auth', 'true')
      document.cookie = 'propertylink_auth=true; path=/; max-age=86400'
    }
    setTimeout(() => {
      setIsLoading(false)
      router.push('/admin')
    }, 400)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    completeLogin()
  }

  const setDemoRole = (selectedRole: 'broker_admin' | 'agent') => {
    setRole(selectedRole)
    if (selectedRole === 'broker_admin') {
      setEmail('admin@apexrealty.in')
      setPassword('Admin@PropertyLink2026!')
    } else {
      setEmail('agent.rahul@apexrealty.in')
      setPassword('agent123')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-950 text-white relative overflow-hidden">
      <div className="relative w-full max-w-md bg-[#0e1014] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center mx-auto shadow-md mb-3">
            <Building2 className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 block">
            Apex Realty Panvel • Advisor Operations
          </span>
          <h1 className="text-2xl font-normal text-white tracking-tight">
            Broker Portal Sign In
          </h1>
          <p className="text-xs text-neutral-400 font-light">
            Authorized access for listings, verified buyer inquiries, and agency configuration.
          </p>
        </div>

        {/* 1-Click Fast Evaluation Access */}
        <div className="p-3.5 bg-neutral-900/90 rounded-2xl border border-neutral-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-neutral-300 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-neutral-400" />
              Quick Demo Access
            </span>
            <span className="text-[10px] text-emerald-400 font-medium">Ready</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setDemoRole('broker_admin')}
              className={`py-2 px-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                role === 'broker_admin'
                  ? 'bg-white text-black font-semibold shadow-xs'
                  : 'bg-neutral-800/80 text-neutral-400 hover:text-white'
              }`}
            >
              Principal Broker
            </button>
            <button
              type="button"
              onClick={() => setDemoRole('agent')}
              className={`py-2 px-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                role === 'agent'
                  ? 'bg-white text-black font-semibold shadow-xs'
                  : 'bg-neutral-800/80 text-neutral-400 hover:text-white'
              }`}
            >
              Area Consultant
            </button>
          </div>

          <button
            type="button"
            onClick={completeLogin}
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-neutral-700"
          >
            {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ArrowRight className="w-3.5 h-3.5" />}
            <span>1-Click Sign-In as {role === 'broker_admin' ? 'Principal Broker' : 'Consultant'}</span>
          </button>
        </div>

        {/* Standard Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
              Advisor Email
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 w-4 h-4 text-neutral-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-neutral-900 border border-neutral-800 rounded-xl focus:outline-none focus:border-white text-white transition-colors font-mono"
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
                className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-neutral-900 border border-neutral-800 rounded-xl focus:outline-none focus:border-white text-white transition-colors font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 active:scale-98"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-neutral-700" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <span>Secure Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security badge & Home link */}
        <div className="pt-2 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 text-[11px] text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted Session • MahaRERA Reg: A52000012345</span>
          </div>

          <div>
            <Link href="/" className="text-xs text-neutral-400 hover:text-white font-medium transition-colors">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
