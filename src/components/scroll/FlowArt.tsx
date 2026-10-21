'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface FlowSectionProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const FlowSection: React.FC<FlowSectionProps> = ({
  className,
  style = {},
  children,
}) => (
  <section
    data-flow-section
    className={cn(
      'relative h-screen w-full overflow-hidden flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16 select-none',
      className
    )}
    style={style}
  >
    <div className="relative w-full h-full flex flex-col justify-between max-w-7xl mx-auto z-10">
      {children}
    </div>
  </section>
);

export interface FlowArtProps {
  className?: string;
  children: React.ReactNode;
}

export default function FlowArt({ className, children }: FlowArtProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined' || !containerRef.current) return;

      const sections = gsap.utils.toArray<HTMLElement>('[data-flow-section]', containerRef.current);
      if (sections.length <= 1) return;

      // Position sections stacked on top of each other
      sections.forEach((section, index) => {
        gsap.set(section, {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: index + 1,
        });

        // First section stays at 0 rotation, subsequent sections start rotated at 30 deg below the viewport
        if (index > 0) {
          gsap.set(section, {
            rotation: 30,
            transformOrigin: 'bottom left',
            yPercent: 100,
            opacity: 1,
            boxShadow: '0 -20px 50px rgba(0,0,0,0.3)',
          });
        }
      });

      // Pin the outer container and scrub through rotating each container in from 30°
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${(sections.length - 1) * (window.innerHeight || 800)}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 1; i < sections.length; i++) {
        const currentSection = sections[i];
        const prevSection = sections[i - 1];

        // Animate incoming section from 30 degrees to 0 degrees
        tl.to(
          currentSection,
          {
            rotation: 0,
            yPercent: 0,
            ease: 'none',
            duration: 1,
          },
          `step-${i}`
        );

        // Previous section subtly dims and scales down to give deep 3D depth
        tl.to(
          prevSection,
          {
            scale: 0.95,
            opacity: 0.5,
            ease: 'none',
            duration: 1,
          },
          `step-${i}`
        );
      }

      // Ensure ScrollTrigger accurately knows layout after render
      ScrollTrigger.refresh();

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.vars.trigger === containerRef.current) {
            st.kill();
          }
        });
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full h-screen overflow-hidden bg-black', className)}
    >
      <div ref={pinWrapperRef} className="relative w-full h-full">
        {children}
      </div>
    </div>
  );
}
