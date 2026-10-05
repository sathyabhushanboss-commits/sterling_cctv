import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Book a Free Security Demo",
  description:
    "Book a free, no-obligation CCTV and security system demo with Sterling CCTV Solutions in Bangalore. Our technicians will assess your site and demonstrate the right setup for you.",
  alternates: { canonical: "/demo" },
};

const DEMO_STEPS = [
  "Call, WhatsApp, or fill the request form to schedule a visit at your convenience.",
  "A Sterling CCTV Solutions technician visits your site to understand coverage requirements.",
  "We demonstrate live camera feeds, mobile viewing, and access control on sample equipment.",
  "You receive a tailored recommendation and quotation — no obligation to purchase.",
];

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader title="Book a Demo" crumb="Demo" />

      <section className="max-w-container mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">
            See Your Security System Before You Buy
          </h2>
          <p className="text-[15px] leading-relaxed text-ink/80 mb-8">
            Sterling CCTV Solutions offers a free, no-obligation on-site demo so you can see exactly how CCTV
            cameras, access control, and other security equipment will work at your home, office, or facility
            before making a decision.
          </p>

          <ul className="space-y-4">
            {DEMO_STEPS.map((step, i) => (
              <li key={step} className="flex gap-3">
                <CheckCircle2 className="text-brand-text shrink-0 mt-0.5" size={22} />
                <span className="text-[15px] leading-relaxed text-ink/85">
                  <strong>Step {i + 1}: </strong>
                  {step}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-muted rounded-block p-8 text-center">
          <h3 className="text-xl font-bold text-black mb-3">Schedule Your Free Demo</h3>
          <p className="text-[15px] text-ink/80 mb-6">
            Call us, message on WhatsApp, or send a request and our team will get back to you within one
            business day.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-block rounded-btn bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-dark transition-colors"
            >
              CALL {PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-btn bg-[#25D366] px-6 py-3 text-sm font-bold text-white hover:opacity-90 transition-opacity"
            >
              CHAT ON WHATSAPP
            </a>
            <Link
              href="/request-a-quote"
              className="inline-block rounded-btn bg-accent px-6 py-3 text-sm font-bold text-black hover:bg-accent-dark transition-colors"
            >
              REQUEST A QUOTE INSTEAD
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
