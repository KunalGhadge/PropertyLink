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
          'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-950 text-white border border-neutral-800 shadow-xs',
          className
        )}
      >
        <Flame className="w-3.5 h-3.5 text-rose-400 fill-current" />
        Hot Deal
      </span>
    )
  }

  if (featured) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-black text-white border border-neutral-800 shadow-xs',
          className
        )}
      >
        <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
        Featured
      </span>
    )
  }

  if (isNew) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-950 text-white border border-neutral-800 shadow-xs',
          className
        )}
      >
        <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
        New Launch
      </span>
    )
  }

  switch (status) {
    case 'available':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 border border-neutral-200/80',
            className
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          Available
        </span>
      )
    case 'under_negotiation':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700 border border-neutral-200/80',
            className
          )}
        >
          <Clock className="w-3 h-3 text-neutral-500" />
          In Talks
        </span>
      )
    case 'sold':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-500 border border-neutral-200',
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
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600 border border-neutral-200',
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
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-400 border border-neutral-200',
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
