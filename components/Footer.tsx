import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { SERVICES, QUICK_LINKS, PHONE_DISPLAY, PHONE_TEL, EMAIL, ADDRESS_LINES } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-brand text-inklight">
      <div className="max-w-container mx-auto px-4 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Logo + social */}
        <div>
          <span className="relative h-16 w-16 rounded-full overflow-hidden ring-2 ring-white/40 inline-block mb-5">
            <Image
              src="https://www.sterlingcctvsolutions.com/images/footer-logo.png"
              alt="Sterling CCTV Solutions"
              fill
              sizes="64px"
              className="object-cover"
            />
          </span>
          <p className="text-white font-semibold mb-3">Follow Us</p>
          <div className="flex gap-3">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social media link"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-accent hover:text-black transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-white font-bold mb-4 pb-2 border-b border-white/20">QUICK LINKS</h3>
          <ul className="space-y-2 text-sm">
            {QUICK_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-accent transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-bold mb-4 pb-2 border-b border-white/20">SERVICES</h3>
          <ul className="space-y-2 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`/services#${s.slug}`} className="hover:text-accent transition-colors">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Reach us */}
        <div>
          <h3 className="text-white font-bold mb-4 pb-2 border-b border-white/20">REACH US</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin size={18} className="shrink-0 mt-0.5" />
              <span>
                {ADDRESS_LINES.map((line, i) => (
                  <span key={line}>
                    {line}
                    {i < ADDRESS_LINES.length - 1 && <br />}
                  </span>
                ))}
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone size={18} className="shrink-0" />
              <a href={`tel:${PHONE_TEL}`} className="hover:text-accent transition-colors">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <Mail size={18} className="shrink-0" />
              <a href={`mailto:${EMAIL}`} className="hover:text-accent transition-colors break-all">
                {EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-brand-dark">
        <div className="max-w-container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/70">
          <p>All rights reserved to Sterling CCTV Solutions</p>
          <p>Site by Sathya Enterprises</p>
        </div>
      </div>
    </footer>
  );
}
