'use client';

import React from 'react';
import FlowArt, { FlowSection } from '@/components/scroll/FlowArt';

/**
 * FlowArtSection:
 * Pin-on-scroll interactive showcase with 30° rotation transitions,
 * Bebas Neue headlines, vibrant architectural color blocks, and modular design.
 *
 * NOTE: This component is self-contained. To disable or remove it, simply
 * comment out or delete its import and usage in src/app/page.tsx.
 */
export function FlowArtSection() {
  return (
    <div className="relative w-full overflow-hidden">
      <FlowArt>
        {/* Section 01: Terracotta / Orange */}
        <FlowSection style={{ backgroundColor: '#E85A2B', color: '#000' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">01 — Who we are</p>
          <hr className="my-[1.5vw] border-none border-t border-black opacity-100" />
          <div>
            <h1
              className="text-[clamp(3rem,10vw,11rem)] font-bold leading-[0.88] uppercase tracking-tight"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Create
              <br />
              Without
              <br />
              Limits
            </h1>
          </div>
          <hr className="my-[1.5vw] border-none border-t border-black opacity-100" />
          <p className="mt-auto max-w-[50ch] text-[clamp(0.95rem,2vw,1.5rem)] font-normal leading-relaxed">
            We believe every creator deserves a platform that puts authenticity and craft first.
            No noisy algorithms — just pure design, verified architectural titles, and visionary living spaces.
          </p>
        </FlowSection>

        {/* Section 02: Deep Architectural Black */}
        <FlowSection style={{ backgroundColor: '#000000', color: '#ffffff' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">02 — The mission</p>
          <hr className="my-[1.5vw] border-none border-t border-white/60" />
          <div>
            <h2
              className="text-[clamp(3rem,10vw,11rem)] font-bold leading-[0.88] uppercase tracking-tight"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Art
              <br />
              First
              <br />
              Always
            </h2>
          </div>
          <hr className="my-[1.5vw] border-none border-t border-white/60" />
          <p className="max-w-[50ch] text-[clamp(0.95rem,2vw,1.5rem)] font-normal leading-relaxed">
            A curated advisory built for discerning buyers and creators. We are redefining how spaces
            are experienced, transacted, and cherished.
          </p>
          <hr className="my-[1.5vw] border-none border-t border-white/60" />
          <div className="flex flex-wrap gap-[2vw]">
            <div className="min-w-[150px] flex-1">
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wider">Discovery</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Human-curated residences and verified developments. Real eyes on real property.
              </p>
            </div>
            <div className="min-w-[150px] flex-1">
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wider">Community</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Connect with architects, developers, and visionaries shaping Panvel & Navi Mumbai.
              </p>
            </div>
            <div className="min-w-[150px] flex-1">
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wider">Value</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Direct builder pricing. 100% legal title scrutiny. Zero buyer commission guaranteed.
              </p>
            </div>
          </div>
          <p className="mt-auto ml-auto max-w-[50ch] text-right text-[clamp(0.9rem,1.8vw,1.25rem)] font-normal leading-relaxed opacity-85">
            Every feature we build starts with one question — does this elevate the client experience?
          </p>
        </FlowSection>

        {/* Section 03: Architectural Linen / Warm Cream */}
        <FlowSection style={{ backgroundColor: '#F5F0E8', color: '#000000' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">03 — How it works</p>
          <hr className="my-[1.5vw] border-none border-t border-black/60" />
          <div>
            <h2
              className="text-[clamp(3rem,10vw,11rem)] font-bold leading-[0.88] uppercase tracking-tight"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Show
              <br />
              Up.
              <br />
              Stand
              <br />
              Out.
            </h2>
          </div>
          <hr className="my-[1.5vw] border-none border-t border-black/60" />
          <p className="max-w-[50ch] text-[clamp(0.95rem,2vw,1.5rem)] font-normal leading-relaxed">
            Three steps. Zero friction. Your real estate journey starts moving the moment you connect.
          </p>
          <hr className="my-[1.5vw] border-none border-t border-black/60" />
          <div className="flex flex-wrap gap-[2vw]">
            <div className="min-w-[150px] flex-1">
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wider">01 — Curate</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Explore verified floor plans, transparent carpet area figures, and high-res video walkthroughs.
              </p>
            </div>
            <div className="min-w-[150px] flex-1">
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wider">02 — Connect</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Instant WhatsApp delivery of developer brochures and doorstep AC cab site visit scheduling.
              </p>
            </div>
            <div className="min-w-[150px] flex-1">
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wider">03 — Own</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Verified RERA title registration, assisted bank loan processing, and seamless key handover.
              </p>
            </div>
          </div>
        </FlowSection>

        {/* Section 04: Electric Royal Blue */}
        <FlowSection style={{ backgroundColor: '#1A3DE8', color: '#ffffff' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">04 — The vision</p>
          <hr className="my-[1.5vw] border-none border-t border-white/50" />
          <div>
            <h2
              className="text-[clamp(3rem,10vw,11rem)] font-bold leading-[0.88] uppercase tracking-tight"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Future
              <br />
              Of
              <br />
              Spaces
            </h2>
          </div>
          <hr className="my-[1.5vw] border-none border-t border-white/50" />
          <p className="max-w-[50ch] text-[clamp(0.95rem,2vw,1.5rem)] font-normal leading-relaxed">
            We are not just listing properties. We are building the benchmark of transparent Indian real estate.
          </p>
          <hr className="my-[1.5vw] border-none border-t border-white/50" />
          <div className="flex flex-wrap gap-[2vw]">
            <div className="min-w-[150px] flex-1">
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wider">1,200+</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-85">
                Families settled across Navi Mumbai corridor with 100% legal clarity.
              </p>
            </div>
            <div className="min-w-[150px] flex-1">
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wider">₹150 Cr+</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-85">
                Property transactions advised with zero hidden charges or inflated figures.
              </p>
            </div>
            <div className="min-w-[150px] flex-1">
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wider">100%</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-85">
                MahaRERA verified developments accompanied personally by principal advisors.
              </p>
            </div>
          </div>
        </FlowSection>

        {/* Section 05: Bold Citron / Sun Yellow */}
        <FlowSection style={{ backgroundColor: '#E8E02B', color: '#000000' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">05 — Join us</p>
          <hr className="my-[1.5vw] border-none border-t border-black/60" />
          <div>
            <h2
              className="text-[clamp(3rem,10vw,11rem)] font-bold leading-[0.88] uppercase tracking-tight"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Ready
              <br />
              To
              <br />
              Begin?
            </h2>
          </div>
          <hr className="my-[1.5vw] border-none border-t border-black/60" />
          <p className="mt-auto max-w-[50ch] text-[clamp(0.95rem,2vw,1.5rem)] font-normal leading-relaxed">
            Take control of your real estate journey. Inquire now and let us guide you toward the residence
            of your dreams with absolute precision.
          </p>
        </FlowSection>
      </FlowArt>
    </div>
  );
}

export default FlowArtSection;
