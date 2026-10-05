import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { SITE_URL } from "@/lib/constants";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sterling CCTV Solutions | CCTV Installation & Home Security Systems, Bangalore",
    template: "%s | Sterling CCTV Solutions",
  },
  description:
    "Sterling CCTV Solutions located in Bangalore is a leading CCTV installation & Home Security Systems company. 22 years of experience, 4800+ projects.",
  keywords: [
    "CCTV installation Bangalore",
    "CCTV camera installation in Bangalore",
    "home security systems Bangalore",
    "CCTV dealers Rajajinagar",
    "IP camera installation Bangalore",
    "access control system Bangalore",
    "biometric attendance Bangalore",
    "video door phone Bangalore",
    "fire control panel Bangalore",
    "event CCTV security Karnataka",
    "Sterling CCTV Solutions",
  ],
  applicationName: "Sterling CCTV Solutions",
  authors: [{ name: "Sterling CCTV Solutions" }],
  creator: "Sterling CCTV Solutions",
  publisher: "Sterling CCTV Solutions",
  category: "Security & Surveillance",
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Sterling CCTV Solutions",
    title: "CCTV Installation & Home Security Systems in Bangalore | Sterling CCTV Solutions",
    description:
      "22+ years, 4,800+ projects and 15 Prime Minister security assignments. CCTV, access control, biometrics and fire safety installation across Bangalore and Karnataka.",
    images: [
      {
        url: "/images/banner1.png",
        width: 1774,
        height: 887,
        alt: "Sterling CCTV Solutions — Founder & CEO H K Vinod Kumar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CCTV Installation & Home Security Systems in Bangalore | Sterling CCTV Solutions",
    description:
      "22+ years, 4,800+ projects. CCTV, access control, biometrics and fire safety installation across Bangalore.",
    images: ["/images/banner1.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "IN-KA",
    "geo.placename": "Bangalore",
  },
};

export const viewport: Viewport = {
  themeColor: "#9F055D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={montserrat.variable}>
      <body className="font-sans antialiased">
        <Navbar />
        {children}
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
