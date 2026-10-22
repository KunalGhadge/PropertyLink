'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Plus,
  Edit2,
  Trash2,
  Phone,
  Mail,
  UserCheck,
  CheckCircle2,
  XCircle,
  X,
  Sparkles,
  Camera,
  Check,
  Eye,
  EyeOff,
  AlertTriangle,
} from 'lucide-react'
import { getAgents, createAgent, updateAgent, deleteAgent, toggleAgentStatus } from '@/lib/data/store'
import { Agent } from '@/types'

const PRESET_AVATARS = [
  { label: 'Male Advisor 1', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' },
  { label: 'Female Advisor 1', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
  { label: 'Male Advisor 2', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80' },
  { label: 'Female Advisor 2', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
]

export default function AdminTeamPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Form fields
  const [formName, setFormName] = useState('')
  const [formDesignation, setFormDesignation] = useState('Senior Property Advisor')
  const [formEmail, setFormEmail] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formWhatsapp, setFormWhatsapp] = useState('')
  const [formExperience, setFormExperience] = useState(4)
  const [formSpecialization, setFormSpecialization] = useState('Panvel, Kharghar Luxury')
  const [formAvatar, setFormAvatar] = useState(PRESET_AVATARS[0].url)
  const [formIsActive, setFormIsActive] = useState(true)

  const refreshAgents = () => {
    setAgents(getAgents())
  }

  useEffect(() => {
    refreshAgents()
  }, [])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Open Add Modal
  const handleOpenAdd = () => {
    setFormName('')
    setFormDesignation('Senior Property Advisor')
    setFormEmail('')
    setFormPhone('')
    setFormWhatsapp('')
    setFormExperience(4)
    setFormSpecialization('Panvel, Kharghar Luxury')
    setFormAvatar(PRESET_AVATARS[0].url)
    setFormIsActive(true)
    setIsAddModalOpen(true)
  }

  // Open Edit Modal
  const handleOpenEdit = (agent: Agent) => {
    setEditingAgent(agent)
    setFormName(agent.name)
    setFormDesignation(agent.designation || 'Property Consultant')
    setFormEmail(agent.email || '')
    setFormPhone(agent.phone || '')
    setFormWhatsapp(agent.whatsapp_number || agent.phone || '')
    setFormExperience(agent.experience_years || 3)
    setFormSpecialization(agent.specialization?.join(', ') || 'Residential Sales')
    setFormAvatar(agent.avatar_url || PRESET_AVATARS[0].url)
    setFormIsActive(agent.is_active ?? true)
  }

  // Submit Add
  const handleCreateAgent = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName.trim() || !formPhone.trim()) return

    createAgent({
      name: formName.trim(),
      designation: formDesignation.trim(),
      email: formEmail.trim() || 'advisor@apexrealty.in',
      phone: formPhone.trim(),
      whatsapp_number: formWhatsapp.trim() || formPhone.trim(),
      experience_years: Number(formExperience) || 3,
      specialization: formSpecialization.split(',').map((s) => s.trim()).filter(Boolean),
      avatar_url: formAvatar.trim(),
      is_active: formIsActive,
    })

    refreshAgents()
    setIsAddModalOpen(false)
    showToast('New advisor added! Changes are immediately live on the website.')
  }

  // Submit Edit
  const handleUpdateAgent = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingAgent || !formName.trim() || !formPhone.trim()) return

    updateAgent(editingAgent.id, {
      name: formName.trim(),
      designation: formDesignation.trim(),
      email: formEmail.trim() || 'advisor@apexrealty.in',
      phone: formPhone.trim(),
      whatsapp_number: formWhatsapp.trim() || formPhone.trim(),
      experience_years: Number(formExperience) || 3,
      specialization: formSpecialization.split(',').map((s) => s.trim()).filter(Boolean),
      avatar_url: formAvatar.trim(),
      is_active: formIsActive,
    })

    refreshAgents()
    setEditingAgent(null)
    showToast('Advisor details updated! Synced to public site immediately.')
  }

  // Delete
  const handleDeleteAgent = (id: string) => {
    deleteAgent(id)
    refreshAgents()
    setDeleteConfirmId(null)
    showToast('Advisor removed from team.')
  }

  // Toggle Active/Hidden
  const handleToggleStatus = (id: string) => {
    toggleAgentStatus(id)
    refreshAgents()
    showToast('Advisor visibility updated!')
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-neutral-900 text-white border border-neutral-700 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
              Team & Property Specialists
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-xs font-semibold">
              {agents.length} Total
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-1 font-light">
            Manage your firm’s advisors, contact numbers, specializations, and website visibility.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Advisor</span>
        </button>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {agents.map((agent) => {
          const isActive = agent.is_active ?? true
          return (
            <div
              key={agent.id}
              className={`bg-white rounded-2xl border transition-all p-5 flex flex-col justify-between shadow-xs ${
                isActive ? 'border-neutral-200 hover:border-black' : 'border-neutral-200/60 opacity-70 bg-neutral-50/50'
              }`}
            >
              <div className="space-y-4">
                {/* Top Row: Avatar + Info */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                      <Image
                        src={agent.avatar_url || PRESET_AVATARS[0].url}
                        alt={agent.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 text-sm tracking-tight">{agent.name}</h3>
                      <p className="text-xs text-neutral-500 font-light">{agent.designation}</p>
                      <span className="text-[11px] text-neutral-400 font-mono mt-0.5 block">
                        {agent.experience_years} Years Exp.
                      </span>
                    </div>
                  </div>

                  {/* Active Status Pill */}
                  <button
                    onClick={() => handleToggleStatus(agent.id)}
                    title={isActive ? 'Click to hide on website' : 'Click to display on website'}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-neutral-200 text-neutral-600'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-neutral-400'}`} />
                    <span>{isActive ? 'Live on Site' : 'Hidden'}</span>
                  </button>
                </div>

                {/* Specialization Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {agent.specialization?.map((spec) => (
                    <span
                      key={spec}
                      className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 text-[10px] font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Contact Coordinates */}
                <div className="space-y-1.5 text-xs text-neutral-600 pt-3 border-t border-neutral-100 font-light">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{agent.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="truncate">{agent.email}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => handleOpenEdit(agent)}
                  className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-black font-semibold transition-colors cursor-pointer py-1"
                >
                  <Edit2 className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Edit Profile</span>
                </button>

                <button
                  onClick={() => setDeleteConfirmId(agent.id)}
                  className="inline-flex items-center gap-1 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer p-1"
                  title="Remove advisor"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-neutral-900">Remove Advisor?</h4>
              <p className="text-xs text-neutral-500 font-light mt-1">
                Are you sure you want to remove this advisor from your team? This action is immediate.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteAgent(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Advisor Modal */}
      {(isAddModalOpen || editingAgent) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl border border-neutral-200 space-y-5 my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-neutral-700" />
                <h3 className="text-lg font-semibold text-neutral-900 tracking-tight">
                  {editingAgent ? 'Edit Property Consultant' : 'Add New Property Consultant'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsAddModalOpen(false)
                  setEditingAgent(null)
                }}
                className="p-1 text-neutral-400 hover:text-black transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={editingAgent ? handleUpdateAgent : handleCreateAgent}
              className="space-y-4 text-xs"
            >
              {/* Photo Preview & Presets */}
              <div>
                <label className="font-semibold uppercase tracking-wider text-neutral-500 block mb-2">
                  Advisor Photograph
                </label>
                <div className="flex items-center gap-4 mb-3">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                    <Image
                      src={formAvatar || PRESET_AVATARS[0].url}
                      alt="Avatar preview"
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <input
                      type="url"
                      placeholder="Custom photo URL (e.g. Unsplash or Cloudinary)"
                      value={formAvatar}
                      onChange={(e) => setFormAvatar(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:border-black focus:outline-none text-xs"
                    />
                    <span className="text-[10px] text-neutral-400 block font-light">
                      Or pick one of the verified luxury advisor presets below:
                    </span>
                  </div>
                </div>

                {/* Preset Chips */}
                <div className="flex flex-wrap gap-2">
                  {PRESET_AVATARS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setFormAvatar(preset.url)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer border ${
                        formAvatar === preset.url
                          ? 'bg-black text-white border-black'
                          : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border-neutral-200'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Designation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold uppercase tracking-wider text-neutral-500 block mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amit Patil"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:border-black focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold uppercase tracking-wider text-neutral-500 block mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Area Consultant"
                    value={formDesignation}
                    onChange={(e) => setFormDesignation(e.target.value)}
                    className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:border-black focus:outline-none text-xs"
                  />
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold uppercase tracking-wider text-neutral-500 block mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 12345"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:border-black focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold uppercase tracking-wider text-neutral-500 block mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98200 12345"
                    value={formWhatsapp}
                    onChange={(e) => setFormWhatsapp(e.target.value)}
                    className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:border-black focus:outline-none text-xs"
                  />
                </div>
              </div>

              {/* Email & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold uppercase tracking-wider text-neutral-500 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="amit.patil@apexrealty.in"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:border-black focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold uppercase tracking-wider text-neutral-500 block mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    value={formExperience}
                    onChange={(e) => setFormExperience(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:border-black focus:outline-none text-xs"
                  />
                </div>
              </div>

              {/* Specialization */}
              <div>
                <label className="font-semibold uppercase tracking-wider text-neutral-500 block mb-1">
                  Specialization Areas (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Panvel 2 BHK, Kharghar Luxury, Residential Plots"
                  value={formSpecialization}
                  onChange={(e) => setFormSpecialization(e.target.value)}
                  className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:border-black focus:outline-none text-xs"
                />
              </div>

              {/* Visibility Switch */}
              <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <div>
                  <span className="font-semibold text-neutral-800 block">Show on Public Website</span>
                  <span className="text-[11px] text-neutral-500 font-light">
                    Display in the "Meet Our Property Specialists" section on the About page.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormIsActive(!formIsActive)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                    formIsActive ? 'bg-black' : 'bg-neutral-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formIsActive ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false)
                    setEditingAgent(null)
                  }}
                  className="px-4 py-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                >
                  {editingAgent ? 'Save Changes' : 'Add Consultant'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
