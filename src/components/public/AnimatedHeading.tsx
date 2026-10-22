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
  charDelay = 25,
  initialDelay = 150,
}: AnimatedHeadingProps) {
  const [isTriggered, setIsTriggered] = useState(false)
  const lines = text.split('\n')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTriggered(true)
    }, initialDelay)
    return () => clearTimeout(timer)
  }, [initialDelay])

  let globalCharIndex = 0

  return (
    <h1 className={className} style={{ letterSpacing: '-0.03em' }}>
      {lines.map((line, lineIndex) => {
        const words = line.split(' ')
        return (
          <span key={lineIndex} className="block overflow-hidden">
            {words.map((word, wordIndex) => {
              const chars = Array.from(word)
              return (
                <span
                  key={wordIndex}
                  className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0"
                >
                  {chars.map((char) => {
                    const delay = globalCharIndex * charDelay + lineIndex * 100
                    globalCharIndex++
                    return (
                      <span
                        key={globalCharIndex}
                        className="inline-block transition-all duration-500 ease-out"
                        style={{
                          transitionDelay: `${delay}ms`,
                          opacity: isTriggered ? 1 : 0,
                          transform: isTriggered
                            ? 'translate3d(0, 0, 0)'
                            : 'translate3d(0, 18px, 0)',
                          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      >
                        {char}
                      </span>
                    )
                  })}
                </span>
              )
            })}
          </span>
        )
      })}
    </h1>
  )
}
