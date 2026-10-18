import React from 'react'
import { cn } from '@/lib/utils'
import { Sparkles, Flame, CheckCircle2, Clock, ShieldCheck } from 'lucide-react'

interface StatusBadgeProps {
  status?: string
  featured?: boolean
  isNew?: boolean
  isHotDeal?: boolean
  className?: string
}

export function StatusBadge({ status, featured, isNew, isHotDeal, className }: StatusBadgeProps) {
  if (isHotDeal) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-sm',
          className
        )}
      >
        <Flame className="w-3.5 h-3.5 fill-current animate-pulse" />
        Hot Deal
      </span>
    )
  }

  if (featured) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-900/90 text-amber-300 backdrop-blur-sm border border-amber-400/40 shadow-sm',
          className
        )}
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        Featured
      </span>
    )
  }

  if (isNew) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-sm',
          className
        )}
      >
        <Sparkles className="w-3.5 h-3.5" />
        New Launch
      </span>
    )
  }

  switch (status) {
    case 'available':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200',
            className
          )}
        >
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          Available
        </span>
      )
    case 'under_negotiation':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200',
            className
          )}
        >
          <Clock className="w-3 h-3 text-amber-600" />
          In Talks
        </span>
      )
    case 'sold':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200',
            className
          )}
        >
          Sold Out
        </span>
      )
    case 'rented':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200',
            className
          )}
        >
          Rented
        </span>
      )
    case 'hidden':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200',
            className
          )}
        >
          Hidden
        </span>
      )
    default:
      return null
  }
}
