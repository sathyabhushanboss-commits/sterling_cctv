import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { UserCheck, ClipboardCheck, Users, PackageCheck, ShieldCheck } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { WHY_CHOOSE_REASONS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Sterling CCTV Solutions — 22+ years securing homes, businesses, VVIP events, and government institutions across Bangalore and Karnataka with 4,800+ completed projects.",
  alternates: { canonical: "/about-us" },
};

const STATS = [
  { icon: UserCheck, label: "22 years of Experience" },
  { icon: ClipboardCheck, label: "4800 Projects" },
  { icon: ShieldCheck, label: "15+ PM Security Assignments" },
  { icon: Users, label: "Professional Staff" },
  { icon: PackageCheck, label: "On-time Standby Products" },
];

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader title="About Us" crumb="About Us" />

      {/* Intro */}
      <section className="max-w-container mx-auto px-4 py-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="uppercase tracking-wide text-sm font-semibold text-black/70 mb-3">
            Who We Are
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-text leading-snug mb-5">
            A trusted name in CCTV installation &amp; home security systems in Bangalore
          </h2>
          <p className="text-[15px] leading-relaxed text-ink/90 mb-4">
            Sterling CCTV Solutions, located in Bangalore, is a leading CCTV installation and home security
            systems company serving customers who want proper installation work carried out by a master
            security technician. Over more than two decades, we have developed a finely tuned process designed
            to fit each client&rsquo;s unique security requirements and existing site conditions.
          </p>
          <p className="text-[15px] leading-relaxed text-ink/90 mb-4">
            Founded and led by <strong>Mr. Vinod Kumar</strong>, Sterling CCTV Solutions began as a small
            security services provider and has since grown into one of Karnataka&rsquo;s most experienced CCTV
            and electronic security integrators, with 12 years dedicated specifically to CCTV installation
            excellence and 22 years of overall industry experience.
          </p>
          <p className="text-[15px] leading-relaxed text-ink/90">
            Today, we serve residential complexes, commercial enterprises, hospitals, banks, hotels, government
            offices, defense establishments, and large public events — having completed over 4,800 projects to
            date.
          </p>
        </div>

        <div className="relative h-72 sm:h-96 rounded-block overflow-hidden">
          <Image
            src="https://www.sterlingcctvsolutions.com/images/gallery-8.jpg"
            alt="Sterling CCTV Solutions technicians reviewing installation plans"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-muted py-16">
        <div className="max-w-container mx-auto px-4">
          <div className="bg-white rounded-block shadow-sm px-6 py-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {STATS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center text-center gap-3">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-text text-brand-text">
                  <Icon size={28} />
                </span>
                <p className="text-sm font-medium text-ink">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones / why choose us */}
      <section className="max-w-container mx-auto px-4 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-10 text-center">
          Our Track Record
        </h2>
        <div className="space-y-7">
          {WHY_CHOOSE_REASONS.map((reason, i) => (
            <div key={reason.title}>
              <h3 className="text-lg sm:text-xl font-bold text-black mb-1.5">
                {i + 1}. {reason.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-ink/85">{reason.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted py-14">
        <div className="max-w-container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-3">
            Ready to secure your property?
          </h2>
          <p className="text-ink/70 mb-6">
            Talk to our security consultants and get a tailored CCTV or access-control plan for your home,
            office, or event.
          </p>
          <Link
            href="/request-a-quote"
            className="inline-block rounded-btn bg-accent px-6 py-3 text-sm font-bold text-black hover:bg-accent-dark transition-colors"
          >
            REQUEST A QUOTE
          </Link>
        </div>
      </section>
    </main>
  );
}
