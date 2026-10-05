import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a free quote from Sterling CCTV Solutions for CCTV cameras, access control, biometrics, fire safety systems, and more in Bangalore.",
  alternates: { canonical: "/request-a-quote" },
};

export default function RequestQuotePage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader title="Request a Quote" crumb="Request a Quote" />

      <section className="bg-muted py-16">
        <div className="max-w-container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">
              Get a Free, No-Obligation Quote
            </h2>
            <p className="text-[15px] leading-relaxed text-ink/80">
              Tell us about your property and security requirements, and our team will get back to you with a
              tailored quotation for CCTV cameras, access control, biometrics, fire safety, or any other service
              we offer.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <QuoteForm />
          </div>
        </div>
      </section>
    </main>
  );
}
