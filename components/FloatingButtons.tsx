import { Mail, Phone } from "lucide-react";
import { EMAIL, PHONE_TEL, WHATSAPP_URL } from "@/lib/constants";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col gap-3">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform"
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2c-5.46 0-9.9 4.43-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.43 9.9-9.9 0-2.64-1.03-5.13-2.9-7a9.82 9.82 0 0 0-6.99-2.9zm0 18.13h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.4c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 5.84 2.42 8.18 8.18 0 0 1 2.42 5.82c0 4.55-3.7 8.25-8.26 8.25zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.4-.12-.56.13-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.38-1.99-1.22-.74-.65-1.24-1.46-1.38-1.71-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.83-.2-.48-.4-.42-.56-.42-.14-.01-.31-.01-.48-.01a.92.92 0 0 0-.67.31c-.23.25-.87.85-.87 2.08s.9 2.42 1.02 2.58c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.23-.17-.48-.29z" />
        </svg>
      </a>
      <a
        href={`mailto:${EMAIL}`}
        aria-label="Email us"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EA4335] text-white shadow-lg hover:scale-105 transition-transform"
      >
        <Mail size={24} />
      </a>
      <a
        href={`tel:${PHONE_TEL}`}
        aria-label="Call us"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg hover:scale-105 transition-transform"
      >
        <Phone size={22} />
      </a>
    </div>
  );
}
