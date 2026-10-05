"use client";

import { useState, FormEvent } from "react";
import { EMAIL } from "@/lib/constants";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Website enquiry from ${name || "a visitor"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-muted rounded-block p-8 space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-black mb-1.5">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-btn border border-black/15 px-4 py-2.5 text-[15px] text-black focus:outline-none focus:ring-2 focus:ring-brand"
          placeholder="Your name"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-black mb-1.5">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-btn border border-black/15 px-4 py-2.5 text-[15px] text-black focus:outline-none focus:ring-2 focus:ring-brand"
            placeholder="+91 00000 00000"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-black mb-1.5">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-btn border border-black/15 px-4 py-2.5 text-[15px] text-black focus:outline-none focus:ring-2 focus:ring-brand"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-black mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-btn border border-black/15 px-4 py-2.5 text-[15px] text-black focus:outline-none focus:ring-2 focus:ring-brand"
          placeholder="Tell us about your security requirement..."
        />
      </div>

      <button
        type="submit"
        className="inline-block rounded-btn bg-accent px-6 py-3 text-sm font-bold text-black hover:bg-accent-dark transition-colors"
      >
        SEND MESSAGE
      </button>

      {sent && (
        <p className="text-sm text-brand-text font-medium">
          Your email app should now be open with your message ready to send. Prefer to call instead? Use the
          number above.
        </p>
      )}
    </form>
  );
}
