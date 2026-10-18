'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { PropertyForm } from '@/components/admin/PropertyForm'
import { createProperty } from '@/lib/data/store'
import { PropertyFormValues } from '@/lib/validations/property.schema'

export default function NewPropertyPage() {
  const router = useRouter()

  const handleCreate = (data: PropertyFormValues) => {
    createProperty(data as any)
    router.push('/admin/properties')
  }

  return (
    <div className="space-y-6">
      <PropertyForm onSubmitSuccess={handleCreate} />
    </div>
  )
}
