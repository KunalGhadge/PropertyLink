import React from 'react'
import { notFound } from 'next/navigation'
import { getPropertyById } from '@/lib/data/store'
import { EditPropertyClient } from './EditPropertyClient'

interface EditPropertyPageProps {
  params: Promise<{ id: string }>
}

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const { id } = await params
  const property = getPropertyById(id)

  if (!property) {
    notFound()
  }

  return <EditPropertyClient property={property} />
}
