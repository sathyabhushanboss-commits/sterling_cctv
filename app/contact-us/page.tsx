import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, ADDRESS_LINES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Sterling CCTV Solutions in Rajajinagar, Bangalore. Call, email, or send us a message for CCTV installation and home security system enquiries.",
  alternates: { canonical: "/contact-us" },
};

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader title="Contact Us" crumb="Contact Us" />

      <section className="max-w-container mx-auto px-4 py-16 grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6">Get In Touch</h2>
          <p className="text-[15px] leading-relaxed text-ink/80 mb-8">
            Have a question about CCTV installation, access control, or any of our security services? Reach out
            and our team in Bangalore will respond promptly.
          </p>

          <ul className="space-y-6">
            <li className="flex gap-4">
              <MapPin className="text-brand-text shrink-0" size={22} />
              <div>
                <p className="font-semibold text-black mb-1">Our Office</p>
                <p className="text-[15px] text-ink/80">
                  {ADDRESS_LINES.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <Phone className="text-brand-text shrink-0" size={22} />
              <div>
                <p className="font-semibold text-black mb-1">Phone</p>
                <a href={`tel:${PHONE_TEL}`} className="text-[15px] text-ink/80 hover:text-brand transition-colors">
                  {PHONE_DISPLAY}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <Mail className="text-brand-text shrink-0" size={22} />
              <div>
                <p className="font-semibold text-black mb-1">Email</p>
                <a href={`mailto:${EMAIL}`} className="text-[15px] text-ink/80 hover:text-brand transition-colors break-all">
                  {EMAIL}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <Clock className="text-brand-text shrink-0" size={22} />
              <div>
                <p className="font-semibold text-black mb-1">Business Hours</p>
                <p className="text-[15px] text-ink/80">Monday – Saturday, 9:30 AM – 7:00 PM</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
