import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/public/Navbar'
import { Footer } from '@/components/public/Footer'
import { getSiteSettings } from '@/lib/data/store'
import { ShieldCheck, FileText, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service & Advisory Disclaimer | Apex Realty',
  description: 'Terms of service, brokerage policies, and MahaRERA real estate advisory disclaimers for Apex Realty Navi Mumbai.',
}

export default function TermsPage() {
  const settings = getSiteSettings()

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
      <Navbar settings={settings} />

      {/* Header Banner */}
      <div className="pt-28 pb-12 sm:pb-16 bg-[#0c0f14] text-white border-b border-[#c5a059]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#c5a059] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c222c] border border-[#c5a059]/30 text-[#dfba73] text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>MahaRERA Reg: A52000012345</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm sm:text-base text-stone-300">
            Last updated: February 2026 • Real estate consultancy policies and transaction disclosures.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex-1 text-stone-700 leading-relaxed space-y-8 font-normal text-sm sm:text-base">
        <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-[#e8e2d5] shadow-xs">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0c0f14]">
            1. Nature of Advisory Services
          </h2>
          <p>
            Apex Realty is an independent real estate advisory and channel marketing agency operating in the Navi Mumbai Metropolitan Region (Panvel, Kharghar, Kamothe, Taloja, Ulwe, and Seawoods). We act as an authorized channel partner for MahaRERA registered developers and represent verified individual property owners in resale and rental transactions.
          </p>
        </section>

        <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-[#e8e2d5] shadow-xs">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0c0f14]">
            2. Brokerage & Commission Policy
          </h2>
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm">
              <span className="font-bold block mb-1">✓ Developer Inventory (New Launches & Under Construction):</span>
              <p>Zero brokerage is charged to buyers purchasing direct inventory from authorized partner developers. Channel partner remuneration is disbursed directly by the builder.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#faf8f4] border border-[#e8e2d5] text-stone-700 text-xs sm:text-sm">
              <span className="font-bold block mb-1">✓ Secondary Market (Resale & Rental):</span>
              <p>Standard professional brokerage applies to secondary market resale purchases (typically 1% to 2% of the registered deed value) and rental transactions (one month’s rent as service fee), payable upon execution of the registered sale/lease deed.</p>
            </div>
          </div>
        </section>

        <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-[#e8e2d5] shadow-xs">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0c0f14]">
            3. Accuracy of Property Information & MahaRERA Disclaimers
          </h2>
          <p>
            All residential and commercial project details, floor plan renders, elevations, carpet areas, and amenities featured on this platform are compiled directly from builder sanction drawings and official MahaRERA public filings.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
            <li>Carpet areas are calculated in accordance with the Real Estate (Regulation and Development) Act, 2016.</li>
            <li>Government levies, stamp duty (typically 5%–7% in Maharashtra), registration fees, and GST where applicable are payable directly to the competent authorities and are not included in the basic listed price unless explicitly specified.</li>
            <li>Buyers are advised to inspect original developer sanction letters, title search reports, and commencement certificates prior to executing financial bookings.</li>
          </ul>
        </section>

        <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-[#e8e2d5] shadow-xs">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0c0f14]">
            4. Site Visit Policy
          </h2>
          <p>
            Accompanied site visits and doorstep AC cab pickups arranged by Apex Realty are provided complimentary for verified prospective homebuyers. Apex Realty reserves the right to verify client contact credentials prior to dispatching vehicle escorts.
          </p>
        </section>

        <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-[#e8e2d5] shadow-xs">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0c0f14]">
            5. Limitation of Liability
          </h2>
          <p>
            Apex Realty conducts rigorous preliminary due diligence on all listed inventory. However, statutory builder timelines, possession schedules, and structural deliveries remain the sole contractual responsibility of the respective developer under the MahaRERA builder-buyer agreement.
          </p>
        </section>

        <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-[#e8e2d5] shadow-xs">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0c0f14]">
            6. Governing Law & Jurisdiction
          </h2>
          <p>
            These terms are governed by the laws of India and the state of Maharashtra. Any disputes arising in connection with our advisory services shall fall under the exclusive jurisdiction of the competent courts in Panvel / Navi Mumbai.
          </p>
        </section>
      </main>

      <Footer settings={settings} />
    </div>
  )
}
