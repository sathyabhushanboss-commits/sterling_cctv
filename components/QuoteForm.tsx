"use client";

import { useState, FormEvent } from "react";
import { EMAIL, SERVICES } from "@/lib/constants";

export default function QuoteForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState<string>(SERVICES[0].name);
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Quote request: ${service}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nService required: ${service}\nSite location: ${location}\n\nDetails:\n${details}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-block shadow-sm p-8 space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="qname" className="block text-sm font-semibold text-black mb-1.5">
            Full Name
          </label>
          <input
            id="qname"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-btn border border-black/15 px-4 py-2.5 text-[15px] text-black focus:outline-none focus:ring-2 focus:ring-brand"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="qphone" className="block text-sm font-semibold text-black mb-1.5">
            Phone Number
          </label>
          <input
            id="qphone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-btn border border-black/15 px-4 py-2.5 text-[15px] text-black focus:outline-none focus:ring-2 focus:ring-brand"
            placeholder="+91 00000 00000"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="qemail" className="block text-sm font-semibold text-black mb-1.5">
            Email Address
          </label>
          <input
            id="qemail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-btn border border-black/15 px-4 py-2.5 text-[15px] text-black focus:outline-none focus:ring-2 focus:ring-brand"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="qlocation" className="block text-sm font-semibold text-black mb-1.5">
            Site Location
          </label>
          <input
            id="qlocation"
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-btn border border-black/15 px-4 py-2.5 text-[15px] text-black focus:outline-none focus:ring-2 focus:ring-brand"
            placeholder="Area, city"
          />
        </div>
      </div>

      <div>
        <label htmlFor="qservice" className="block text-sm font-semibold text-black mb-1.5">
          Service Required
        </label>
        <select
          id="qservice"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full rounded-btn border border-black/15 px-4 py-2.5 text-[15px] text-black focus:outline-none focus:ring-2 focus:ring-brand"
        >
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="qdetails" className="block text-sm font-semibold text-black mb-1.5">
          Requirement Details
        </label>
        <textarea
          id="qdetails"
          rows={5}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full rounded-btn border border-black/15 px-4 py-2.5 text-[15px] text-black focus:outline-none focus:ring-2 focus:ring-brand"
          placeholder="Number of cameras, site size, entry points, timeline, etc."
        />
      </div>

      <button
        type="submit"
        className="inline-block rounded-btn bg-accent px-6 py-3 text-sm font-bold text-black hover:bg-accent-dark transition-colors"
      >
        REQUEST QUOTE
      </button>

      {sent && (
        <p className="text-sm text-brand-text font-medium">
          Your email app should now be open with your request ready to send. You can also call us directly for a
          faster response.
        </p>
      )}
    </form>
  );
}
