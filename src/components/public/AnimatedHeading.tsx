'use client'

import React, { useState, useEffect } from 'react'

interface AnimatedHeadingProps {
  text: string
  className?: string
  charDelay?: number
  initialDelay?: number
}

export function AnimatedHeading({
  text,
  className = 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4',
  charDelay = 30,
  initialDelay = 200,
}: AnimatedHeadingProps) {
  const [isTriggered, setIsTriggered] = useState(false)
  const lines = text.split('\n')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTriggered(true)
    }, initialDelay)
    return () => clearTimeout(timer)
  }, [initialDelay])

  return (
    <h1 className={className} style={{ letterSpacing: '-0.04em' }}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block overflow-hidden">
          {Array.from(line).map((char, charIndex) => {
            const delay =
              lineIndex * line.length * charDelay + charIndex * charDelay
            return (
              <span
                key={charIndex}
                className="inline-block transition-all duration-500"
                style={{
                  transitionDelay: `${delay}ms`,
                  opacity: isTriggered ? 1 : 0,
                  transform: isTriggered ? 'translateX(0)' : 'translateX(-18px)',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            )
          })}
        </span>
      ))}
    </h1>
  )
}
