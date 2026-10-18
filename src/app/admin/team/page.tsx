'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Plus, UserCheck, Phone, MessageCircle, Mail, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { getAgents, createAgent } from '@/lib/data/store'
import { Agent } from '@/types'

export default function AdminTeamPage() {
  const [agents, setAgents] = useState(getAgents())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newDesignation, setNewDesignation] = useState('Senior Property Advisor')
  const [newEmail, setNewEmail] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newExperience, setNewExperience] = useState(4)
  const [newSpecialization, setNewSpecialization] = useState('Panvel & Kharghar')

  const handleAddAgent = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim() || !newPhone.trim()) return

    createAgent({
      name: newName.trim(),
      designation: newDesignation.trim(),
      email: newEmail.trim() || 'advisor@apexrealty.in',
      phone: newPhone.trim(),
      whatsapp_number: newPhone.trim(),
      experience_years: Number(newExperience) || 3,
      specialization: newSpecialization.split(',').map((s) => s.trim()),
    })

    setAgents(getAgents())
    setIsModalOpen(false)
    setNewName('')
    setNewPhone('')
    setNewEmail('')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Consultants & Team Members ({agents.length})
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Assign incoming website and WhatsApp leads to dedicated property specialists.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Advisor</span>
        </button>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border-2 border-sky-400 shrink-0">
                  <Image
                    src={agent.avatar_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'}
                    alt={agent.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{agent.name}</h3>
                  <p className="text-xs text-sky-600 font-semibold">{agent.designation}</p>
                  <p className="text-[11px] text-slate-400">{agent.experience_years} Years Experience</p>
                </div>
              </div>

              {/* Specialization Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {agent.specialization?.map((spec) => (
                  <span
                    key={spec}
                    className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-semibold"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* Contact details */}
              <div className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{agent.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{agent.email}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Active Advisor
              </span>
              <a
                href={`tel:${agent.phone}`}
                className="text-xs font-bold text-sky-600 hover:text-sky-700"
              >
                Call Advisor →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Add Agent Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-lg font-bold text-slate-900">Add New Property Consultant</h3>
            <form onSubmit={handleAddAgent} className="space-y-3 text-xs">
              <div>
                <label className="font-bold uppercase text-slate-600 block mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Shinde"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-slate-600 block mb-1">
                  Designation
                </label>
                <input
                  type="text"
                  value={newDesignation}
                  onChange={(e) => setNewDesignation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-slate-600 block mb-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98200 00000"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-slate-600 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="advisor@apexrealty.in"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-slate-600 block mb-1">
                  Specialization (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Panvel, Affordable Housing, Kharghar Luxury"
                  value={newSpecialization}
                  onChange={(e) => setNewSpecialization(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold"
                >
                  Add Consultant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
