import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse photos of Sterling CCTV Solutions' installation work — CCTV cameras, access control, biometrics, fire safety, and security equipment deployed across Bangalore.",
  alternates: { canonical: "/gallery" },
};

const GALLERY_IMAGES = [
  {
    src: "https://www.sterlingcctvsolutions.com/images/banner-00.jpg",
    alt: "Sterling CCTV Solutions site visit and installation planning",
  },
  {
    src: "https://www.sterlingcctvsolutions.com/images/gallery-8.jpg",
    alt: "Sterling CCTV Solutions technicians reviewing installation plans",
  },
  ...SERVICES.map((s) => ({ src: s.image, alt: `${s.name} installation by Sterling CCTV Solutions` })),
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader title="Gallery" crumb="Gallery" />

      <section className="max-w-container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">Our Work in Pictures</h2>
          <p className="text-[15px] leading-relaxed text-ink/80">
            A glimpse of the CCTV, access control, and security equipment installations carried out by Sterling
            CCTV Solutions across homes, offices, and public spaces in Bangalore and Karnataka.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <div key={`${img.src}-${i}`} className="relative h-40 sm:h-48 rounded-block overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
