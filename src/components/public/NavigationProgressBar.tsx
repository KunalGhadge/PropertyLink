'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function ProgressBarContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // When route changes, briefly trigger smooth completion
    setProgress(100)
    const timeout = setTimeout(() => {
      setLoading(false)
      setProgress(0)
    }, 300)

    return () => clearTimeout(timeout)
  }, [pathname, searchParams])

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return

      const href = target.getAttribute('href')
      if (
        href &&
        href.startsWith('/') &&
        !href.startsWith('/#') &&
        !target.getAttribute('target') &&
        !e.ctrlKey &&
        !e.metaKey
      ) {
        setLoading(true)
        setProgress(30)
        setTimeout(() => setProgress(75), 150)
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  if (!loading && progress === 0) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none h-[2.5px] bg-neutral-100 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-neutral-900 via-black to-neutral-700 transition-all duration-300 ease-out shadow-[0_0_8px_rgba(0,0,0,0.5)]"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transition: progress === 100 ? 'width 200ms ease-out, opacity 300ms ease-in' : 'width 300ms ease-out',
        }}
      />
    </div>
  )
}

export function NavigationProgressBar() {
  return (
    <Suspense fallback={null}>
      <ProgressBarContent />
    </Suspense>
  )
}
