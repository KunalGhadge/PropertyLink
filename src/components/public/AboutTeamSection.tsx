'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Phone, Sparkles } from 'lucide-react'
import { Agent } from '@/types'
import { getAgents } from '@/lib/data/store'
import { WhatsAppButton } from './WhatsAppButton'

export function AboutTeamSection({ initialAgents }: { initialAgents: Agent[] }) {
  const [agents, setAgents] = useState<Agent[]>(initialAgents)

  useEffect(() => {
    // Sync with browser localStorage immediately on mount
    const current = getAgents().filter((a) => a.is_active !== false)
    if (current.length > 0) {
      setAgents(current)
    }

    const handleUpdate = () => {
      const updated = getAgents().filter((a) => a.is_active !== false)
      setAgents(updated)
    }

    window.addEventListener('propertylink_store_updated', handleUpdate)
    window.addEventListener('storage', handleUpdate)

    return () => {
      window.removeEventListener('propertylink_store_updated', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  if (agents.length === 0) return null

  return (
    <section className="space-y-10">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400 block mb-2">
          Boutique Team
        </span>
        <h2 className="text-2xl sm:text-4xl font-normal text-black tracking-tight">
          Meet Our Property Specialists
        </h2>
        <p className="text-sm text-neutral-500 font-light mt-1">
          Local neighborhood consultants living and working in Navi Mumbai.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-white rounded-2xl border border-neutral-200/90 p-7 text-center space-y-4 hover:border-black transition-all shadow-xs group"
          >
            <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto bg-neutral-100 border-2 border-neutral-200 group-hover:border-black transition-colors shadow-sm">
              <Image
                src={
                  agent.avatar_url ||
                  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'
                }
                alt={agent.name}
                fill
                sizes="96px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div>
              <h3 className="text-base font-semibold text-black tracking-tight">{agent.name}</h3>
              <p className="text-xs text-neutral-500 font-light mt-0.5">{agent.designation}</p>
              <p className="text-[11px] text-neutral-400 font-light mt-0.5">
                {agent.experience_years} Years Real Estate Experience
              </p>
            </div>

            <div className="pt-1 flex flex-wrap justify-center gap-1.5">
              {agent.specialization?.map((spec) => (
                <span
                  key={spec}
                  className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-[10px] font-medium"
                >
                  {spec}
                </span>
              ))}
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-center gap-2">
              <WhatsAppButton
                phone={agent.whatsapp_number || agent.phone}
                size="sm"
                label="WhatsApp"
                className="px-4 py-2 text-xs"
                customMessage={`Hi ${agent.name}, I would like to consult with you about properties in Navi Mumbai.`}
              />
              <a
                href={`tel:${agent.phone.replace(/[^0-9+]/g, '')}`}
                aria-label={`Call ${agent.name}`}
                className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
