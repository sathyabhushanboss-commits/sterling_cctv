"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Phone, Mail, ChevronDown, Menu, X } from "lucide-react";
import { SERVICES, PHONE_DISPLAY, PHONE_TEL, EMAIL } from "@/lib/constants";

export default function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <>
      {/* Top utility bar */}
      <div className="bg-brand text-white text-sm">
        <div className="max-w-container mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2">
          <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 hover:text-accent transition-colors">
            <Phone size={14} />
            {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-accent transition-colors">
            <Mail size={14} />
            {EMAIL}
          </a>
        </div>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-container mx-auto flex items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <span className="relative h-14 w-14 rounded-full overflow-hidden ring-2 ring-brand shrink-0">
              <Image
                src="https://www.sterlingcctvsolutions.com/images/logo.png"
                alt="Sterling CCTV Solutions logo"
                fill
                sizes="56px"
                className="object-cover"
              />
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold tracking-wide text-black">
            <Link href="/" className="hover:text-brand transition-colors">
              HOME
            </Link>
            <Link href="/about-us" className="hover:text-brand transition-colors">
              ABOUT US
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                href="/services"
                className="flex items-center gap-1 hover:text-brand transition-colors"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                SERVICES <ChevronDown size={14} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </Link>
              {servicesOpen && (
                <div className="absolute left-0 top-full w-72 rounded-block border border-black/15 bg-white py-2 shadow-lg z-50">
                  {SERVICES.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services#${s.slug}`}
                      className="block px-5 py-2 text-sm font-medium text-brand-text hover:bg-muted transition-colors"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/projects-clients" className="hover:text-brand transition-colors">
              PROJECTS &amp; CLIENTS
            </Link>
            <Link href="/gallery" className="hover:text-brand transition-colors">
              GALLERY
            </Link>
            <Link href="/demo" className="hover:text-brand transition-colors">
              DEMO
            </Link>
            <Link href="/contact-us" className="hover:text-brand transition-colors">
              CONTACT US
            </Link>
          </nav>

          <div className="hidden lg:block shrink-0">
            <Link
              href="/request-a-quote"
              className="inline-block rounded-btn bg-accent px-5 py-3 text-sm font-bold text-black hover:bg-accent-dark transition-colors"
            >
              REQUEST A
              <br />
              QUOTE
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-black"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-black/10 bg-white px-4 py-3">
            <nav className="flex flex-col text-sm font-semibold text-black">
              <Link href="/" className="py-2 border-b border-black/5">
                HOME
              </Link>
              <Link href="/about-us" className="py-2 border-b border-black/5">
                ABOUT US
              </Link>
              <button
                className="flex items-center justify-between py-2 border-b border-black/5"
                onClick={() => setMobileServicesOpen((v) => !v)}
                aria-expanded={mobileServicesOpen}
              >
                SERVICES
                <ChevronDown size={16} className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileServicesOpen && (
                <div className="pl-3 py-1 flex flex-col">
                  {SERVICES.map((s) => (
                    <Link key={s.slug} href={`/services#${s.slug}`} className="py-1.5 text-brand-text font-medium text-sm">
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
              <Link href="/projects-clients" className="py-2 border-b border-black/5">
                PROJECTS &amp; CLIENTS
              </Link>
              <Link href="/gallery" className="py-2 border-b border-black/5">
                GALLERY
              </Link>
              <Link href="/demo" className="py-2 border-b border-black/5">
                DEMO
              </Link>
              <Link href="/contact-us" className="py-2 border-b border-black/5">
                CONTACT US
              </Link>
              <Link
                href="/request-a-quote"
                className="mt-3 inline-block rounded-btn bg-accent px-5 py-3 text-center text-sm font-bold text-black"
              >
                REQUEST A QUOTE
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
