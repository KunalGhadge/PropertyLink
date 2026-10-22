'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Building2, ShieldCheck, ArrowRight, Lock, Mail, Loader2 } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@apexrealty.in')
  const [password, setPassword] = useState('Admin@PropertyLink2026!')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (typeof window !== 'undefined') {
      localStorage.setItem('propertylink_auth', 'true')
      document.cookie = 'propertylink_auth=true; path=/; max-age=86400'
    }

    setTimeout(() => {
      setIsLoading(false)
      router.push('/admin')
    }, 350)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-950 text-white relative">
      <div className="w-full max-w-sm sm:max-w-md bg-[#0e1014] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-11 h-11 rounded-2xl bg-white text-black flex items-center justify-center mx-auto shadow-md mb-3">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 block">
            Apex Realty Panvel • Operations Portal
          </span>
          <h1 className="text-2xl font-normal text-white tracking-tight">
            Broker Portal Sign In
          </h1>
          <p className="text-xs text-neutral-400 font-light">
            Authorized management for property inventory, buyer leads, and site settings.
          </p>
        </div>

        {/* Single, Clean Login Form */}
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

          {/* ONE Single Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 active:scale-98"
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

        {/* Security badge & Return link */}
        <div className="pt-2 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 text-[11px] text-neutral-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
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
