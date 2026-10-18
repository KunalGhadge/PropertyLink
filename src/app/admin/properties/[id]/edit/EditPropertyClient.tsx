'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { PropertyForm } from '@/components/admin/PropertyForm'
import { updateProperty } from '@/lib/data/store'
import { PropertyWithImages } from '@/types'
import { PropertyFormValues } from '@/lib/validations/property.schema'

export function EditPropertyClient({ property }: { property: PropertyWithImages }) {
  const router = useRouter()

  const handleUpdate = (data: PropertyFormValues) => {
    updateProperty(property.id, data as any)
    router.push('/admin/properties')
  }

  return (
    <div className="space-y-6">
      <PropertyForm
        initialData={property}
        onSubmitSuccess={handleUpdate}
        isEditing
      />
    </div>
  )
}
