import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/public/Navbar'
import { Footer } from '@/components/public/Footer'
import { getSiteSettings } from '@/lib/data/store'
import { ShieldCheck, Lock, Mail, Phone, MapPin, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | Apex Realty Panvel & Navi Mumbai',
  description: 'Our commitment to protecting your personal data, lead privacy, and WhatsApp communications under MahaRERA and Indian IT regulations.',
}

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-stone-300">
            Last updated: February 2026 • How Apex Realty protects and handles client property inquiries.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex-1 text-stone-700 leading-relaxed space-y-8 font-normal text-sm sm:text-base">
        <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-[#e8e2d5] shadow-xs">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0c0f14]">
            1. Introduction & Our Commitment
          </h2>
          <p>
            At <strong>Apex Realty Navi Mumbai</strong> (“we”, “our”, or “us”), we respect your privacy and are committed to safeguarding your personal information. As an authorized real estate consultancy operating in Panvel, Kharghar, and across Navi Mumbai under Maharashtra Real Estate Regulatory Authority (MahaRERA registration no. A52000012345), we adhere strictly to the Information Technology Act, 2000 and applicable consumer protection norms.
          </p>
        </section>

        <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-[#e8e2d5] shadow-xs">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0c0f14]">
            2. Information We Collect
          </h2>
          <p>
            When you interact with our website, request property brochures, schedule an accompanied site visit, or inquire via WhatsApp, we may collect:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
            <li><strong>Contact details:</strong> Your full name, mobile/WhatsApp telephone number, and email address.</li>
            <li><strong>Property criteria:</strong> Preferred localities (e.g. Panvel, Kharghar, Kamothe, Taloja), configuration (BHK), budget range, and intention (purchase vs. rental).</li>
            <li><strong>Property-specific inquiries:</strong> Specific project IDs, floor plan requests, and preferred visiting dates.</li>
            <li><strong>Technical device data:</strong> Device type, browser user-agent, and anonymized referral source to optimize site performance.</li>
          </ul>
        </section>

        <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-[#e8e2d5] shadow-xs">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0c0f14]">
            3. How We Use Your Information
          </h2>
          <p>Your information is used exclusively for legitimate real estate advisory services:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
            <li>Sending verified floor plans, payment schedules, and MahaRERA certificates corresponding to your inquiry.</li>
            <li>Coordinating escorted doorstep AC cab site visits with our local property advisors.</li>
            <li>Assisting with pre-sanction home loan documentation through authorized banking partners (SBI, HDFC Bank, ICICI Bank, Bank of Baroda) only upon your explicit request.</li>
            <li>Sending customized property recommendations via WhatsApp or email matching your stated budget.</li>
          </ul>
          <p className="font-semibold text-emerald-800 bg-emerald-50 p-3.5 rounded-xl border border-emerald-200">
            🔒 Zero Spam Guarantee: We never sell, rent, or trade your contact information to third-party data brokers or unsolicited marketing agencies.
          </p>
        </section>

        <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-[#e8e2d5] shadow-xs">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0c0f14]">
            4. WhatsApp & Phone Communications
          </h2>
          <p>
            By submitting your mobile number on our contact or property inquiry forms, you authorize Apex Realty to contact you via phone call or WhatsApp message regarding your specific property requirement, even if registered on the National Do Not Call (NDNC) registry.
          </p>
          <p>
            You may withdraw this consent at any time by simply replying <strong>“STOP”</strong> on WhatsApp or emailing us at <a href="mailto:contact@apexrealty.in" className="text-[#b38b42] underline">contact@apexrealty.in</a>.
          </p>
        </section>

        <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-[#e8e2d5] shadow-xs">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0c0f14]">
            5. Data Security & Storage
          </h2>
          <p>
            We implement robust administrative, technical, and physical safeguards to protect your personal details against unauthorized access, loss, or misuse. All lead transmissions are encrypted via industry-standard Transport Layer Security (HTTPS/TLS).
          </p>
        </section>

        <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-[#e8e2d5] shadow-xs">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0c0f14]">
            6. Grievance Officer & Contact Information
          </h2>
          <p>
            For any queries or concerns regarding data privacy or your personal information, please reach out directly to our designated Principal Broker:
          </p>
          <div className="pt-2 text-stone-800 text-xs sm:text-sm space-y-1.5 font-medium">
            <p><strong>Officer:</strong> Rajesh Sharma (Founder & Principal Broker)</p>
            <p><strong>Agency:</strong> Apex Realty Navi Mumbai (MahaRERA: A52000012345)</p>
            <p><strong>Office Address:</strong> Shop 12, Ground Floor, Orion Plaza, Sector 15, Old Panvel, Navi Mumbai - 410206</p>
            <p><strong>Email:</strong> <a href="mailto:contact@apexrealty.in" className="text-[#b38b42] underline">contact@apexrealty.in</a></p>
            <p><strong>Telephone:</strong> +91 98201 23456</p>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </div>
  )
}
