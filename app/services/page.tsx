import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "CCTV & Security System Services",
  description:
    "Explore Sterling CCTV Solutions' full range of security services in Bangalore: CCTV cameras, access control, biometrics, fire safety, metal detectors, video door phones, and more.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader title="Our Services" crumb="Services" />

      <section className="max-w-container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">
            Complete Security &amp; Surveillance Solutions
          </h2>
          <p className="text-[15px] leading-relaxed text-ink/80">
            Sterling CCTV Solutions designs, supplies, installs, and maintains electronic security systems for
            homes, offices, factories, institutions, and large public events across Bangalore and Karnataka. Every
            installation is planned by a master security technician and backed by 22 years of field experience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {SERVICES.map((service) => (
            <div key={service.slug} id={service.slug} className="scroll-mt-24">
              <div className="relative h-48 rounded-block overflow-hidden mb-4">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-black mb-1.5">{service.name}</h3>
              <p className="text-[15px] leading-relaxed text-ink/80">{service.summary}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted py-14">
        <div className="max-w-container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-3">
            Not sure which system fits your property?
          </h2>
          <p className="text-ink/70 mb-6">
            Our team will assess your site and recommend the right mix of cameras, access control, and safety
            equipment.
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
