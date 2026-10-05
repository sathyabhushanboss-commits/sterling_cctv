"use client";

/* ============================================================================
   Sterling CCTV Solutions — Home page
   Everything for the home page lives in this one file: data, helpers,
   animation CSS, JSON-LD structured data and all sections.

   ANIMATION INDEX (64)
   Global ..... 01 scroll progress bar · 02 no-JS reveal fallback
   Hero ....... 03 gradient drift · 04 grid pan · 05 radar sweep · 06 radar pings
                07 floating particles · 08 cursor spotlight · 09 live-dot ping
                10 H1 word-by-word rise · 11 paragraph blur-in · 12 CTA shine sweep
                13 CTA hover lift · 14 phone ring wiggle · 15 trust row stagger
                16 camera wall 3D entrance · 17 camera wall mouse tilt
                18 feed Ken Burns · 19 scanline sweep · 20 REC blink
                21 live timestamp tick · 22 video noise flicker · 23 motion-box track
                24 corner brackets draw · 25 feed hover zoom
   Marquee .... 26 infinite ticker · 27 pause on hover
   Counters ... 28 count-up numbers · 29 underline grow · 30 stagger reveal
   Founder .... 31 clip-wipe reveal · 32 Ken Burns zoom
   About ...... 33 eyebrow fade · 34 quote reveal · 35 image clip wipe
                36 image parallax · 37 floating badge bob · 38 "Read More" nudge
   Why us ..... 39 badge shimmer · 40 stats card rise · 41 stat icon pop stagger
                42 stat icon ring pulse (hover) · 43 stat icon spin (hover)
                44 image cards alternate slide-in · 45 card hover lift · 46 card shine
   Services ... 47 heading underline draw · 48 card stagger · 49 image zoom (hover)
                50 summary slide-up (hover) · 51 autoplay carousel · 52 scroll-synced dots
                53 arrow button hover
   Process .... 54 connector line draw · 55 step pop · 56 icon spin-in
   Sectors .... 57 tile stagger · 58 fill sweep (hover) · 59 icon bounce (hover)
   Areas ...... 60 chip pop stagger · 61 chip hover
   FAQ ........ 62 accordion expand · 63 chevron rotate
   CTA ........ 64 gradient shift + pulse rings + floating blobs
   All motion is switched off by the existing prefers-reduced-motion rule in globals.css.
   ========================================================================== */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import {
  UserCheck,
  ClipboardCheck,
  Users,
  PackageCheck,
  ShieldCheck,
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MapPin,
  House,
  Building2,
  Hospital,
  Landmark,
  GraduationCap,
  Hotel,
  Factory,
  CalendarCheck,
  ScanSearch,
  PenTool,
  Wrench,
  Headset,
  BadgeCheck,
} from "lucide-react";
import { SERVICES, WHY_CHOOSE_REASONS, PHONE_DISPLAY, PHONE_TEL, EMAIL, WHATSAPP_URL, SITE_URL } from "@/lib/constants";

const STATS = [
  { icon: UserCheck, label: "22 years of Experience" },
  { icon: ClipboardCheck, label: "4800 Projects" },
  { icon: ShieldCheck, label: "15+ PM Security Assignments" },
  { icon: Users, label: "Professional Staff" },
  { icon: PackageCheck, label: "On-time Standby Products" },
];

const WHY_CHOOSE_IMAGES = Array.from({ length: 8 }, (_, i) => `/images/${i + 1}sct.png`);

/* -------------------------------------------------------------------------- */
/* New content data                                                            */
/* -------------------------------------------------------------------------- */

const HERO_FEEDS = [
  {
    cam: "CAM 01",
    place: "Main gate",
    src: SERVICES[0].image,
    alt: "HD CCTV camera installed by Sterling CCTV Solutions in Bangalore",
  },
  {
    cam: "CAM 02",
    place: "Parking",
    src: SERVICES[1].image,
    alt: "Speed dome PTZ camera covering a parking area",
  },
  {
    cam: "CAM 03",
    place: "Lobby",
    src: SERVICES[2].image,
    alt: "Access control system securing an office entry",
  },
  {
    cam: "CAM 04",
    place: "Site office",
    src: "https://www.sterlingcctvsolutions.com/images/gallery-8.jpg",
    alt: "Sterling CCTV Solutions technicians planning an installation",
  },
];

const HERO_TRUST = [
  "15 Prime Minister security assignments",
  "4,800+ projects completed",
  "Election Commission deployments",
];

const MARQUEE = [
  "Prime Minister of India, 15 occasions",
  "President & Vice President of India",
  "Election Commission of India",
  "Bengaluru Karaga",
  "Valmiki Jayanti",
  "Someshwara Temple festivities",
  "KEA & CET examination centres",
  "Adani Group",
  "Jaya TV & Sun TV productions",
];

const COUNTERS = [
  { value: 22, suffix: "+", label: "Years in the security industry" },
  { value: 4800, suffix: "+", label: "Projects completed" },
  { value: 15, suffix: "", label: "Prime Minister security assignments" },
  { value: 1000, suffix: "+", label: "VVIP and public events secured" },
  { value: 15, suffix: " lakh+", label: "People covered at a single gathering" },
];

const PROCESS = [
  {
    icon: ScanSearch,
    title: "Site survey",
    body: "A master security technician visits your property and maps entry points, blind spots and lighting conditions.",
  },
  {
    icon: PenTool,
    title: "System design",
    body: "We recommend the right mix of cameras, recording, access control and fire safety for your site.",
  },
  {
    icon: Wrench,
    title: "Installation",
    body: "Neat, concealed cabling and a configured recorder, with live viewing set up on your phone.",
  },
  {
    icon: Headset,
    title: "Support",
    body: "We maintain what we install and keep standby products ready, so your cover never goes dark.",
  },
];

const SECTORS = [
  { icon: House, name: "Homes & apartments" },
  { icon: Building2, name: "Offices & commercial complexes" },
  { icon: Hospital, name: "Hospitals" },
  { icon: Landmark, name: "Banks & government offices" },
  { icon: Hotel, name: "Hotels" },
  { icon: Factory, name: "Factories & warehouses" },
  { icon: GraduationCap, name: "Examination centres" },
  { icon: CalendarCheck, name: "VVIP & public events" },
];

const AREAS = [
  "Rajajinagar",
  "Malleshwaram",
  "Basaveshwaranagar",
  "Vijayanagar",
  "Yeshwanthpur",
  "Peenya",
  "Hebbal",
  "RT Nagar",
  "Yelahanka",
  "Jayanagar",
  "JP Nagar",
  "Banashankari",
  "Koramangala",
  "Indiranagar",
  "Whitefield",
  "Electronic City",
];

const FAQS = [
  {
    q: "Which areas do you install CCTV cameras in?",
    a: "We are based in Rajajinagar and install CCTV and security systems across Bangalore. For large projects and public events we work throughout Karnataka.",
  },
  {
    q: "Do you install CCTV for homes as well as businesses?",
    a: "Yes. We work with individual homes and residential complexes as well as offices, hospitals, banks, hotels, factories, government offices and defence establishments.",
  },
  {
    q: "Can I watch my CCTV cameras on my phone?",
    a: "Yes. Our HD and IP camera installations are set up for remote mobile viewing, so you can check your cameras live from anywhere.",
  },
  {
    q: "What security systems do you provide apart from CCTV?",
    a: "We also supply and install speed dome cameras, access control, biometrics, home automation, fire control panels, fire extinguishers, EPABX systems, baggage scanners, door frame and hand metal detectors, video door phones and PIR motion systems.",
  },
  {
    q: "Can you handle security for large events?",
    a: "Yes. We have delivered end-to-end CCTV security for more than 1,000 VVIP and public events, including the Bengaluru Karaga, where crowds of 10 to 12 lakh people gather.",
  },
  {
    q: "How do I get a quote?",
    a: `Fill in the request a quote form, call us on ${PHONE_DISPLAY}, or message us on WhatsApp. Tell us your site location and what you want to secure, and we will plan the right system for you.`,
  },
];

/* -------------------------------------------------------------------------- */
/* Structured data (JSON-LD) for on-page SEO                                   */
/* -------------------------------------------------------------------------- */

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: "Sterling CCTV Solutions",
      url: SITE_URL,
      logo: "https://www.sterlingcctvsolutions.com/images/logo.png",
      image: `${SITE_URL}/images/banner1.png`,
      description:
        "CCTV installation and home security systems company in Rajajinagar, Bangalore with 22+ years of experience and 4,800+ completed projects.",
      telephone: PHONE_TEL,
      email: EMAIL,
      priceRange: "₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: "#751, 5th Block, Near A2B, Bhasyam Circle, Rajajinagar",
        addressLocality: "Bangalore",
        addressRegion: "Karnataka",
        postalCode: "560010",
        addressCountry: "IN",
      },
      areaServed: [
        { "@type": "City", name: "Bangalore" },
        { "@type": "State", name: "Karnataka" },
      ],
      founder: { "@type": "Person", name: "H K Vinod Kumar", jobTitle: "Founder & CEO" },
      knowsAbout: SERVICES.map((s) => s.name),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Security & surveillance services",
        itemListElement: SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.name,
            description: s.summary,
            url: `${SITE_URL}/services#${s.slug}`,
            areaServed: "Bangalore",
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Sterling CCTV Solutions",
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#business` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "CCTV Installation & Home Security Systems in Bangalore | Sterling CCTV Solutions",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#business` },
      inLanguage: "en-IN",
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Animation CSS                                                               */
/* -------------------------------------------------------------------------- */

const NOISE_SVG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>\")";

const ANIMATION_CSS = `
/* ---------- reveal system ---------- */
.sx-r{opacity:0;transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1),filter .9s ease,clip-path 1.1s cubic-bezier(.77,0,.18,1);will-change:transform,opacity}
.sx-up{transform:translateY(40px)}
.sx-down{transform:translateY(-30px)}
.sx-left{transform:translateX(-70px)}
.sx-right{transform:translateX(70px)}
.sx-zoom{transform:scale(.86)}
.sx-pop{transform:scale(.4)}
.sx-blur{filter:blur(14px);transform:translateY(18px)}
.sx-flip{transform:perspective(900px) rotateX(38deg) translateY(30px);transform-origin:top center}
.sx-tiltL{transform:perspective(1200px) rotateY(16deg) translateX(-60px)}
.sx-tiltR{transform:perspective(1200px) rotateY(-16deg) translateX(60px)}
.sx-clip{opacity:1;clip-path:inset(0 100% 0 0)}
.sx-clipUp{opacity:1;clip-path:inset(100% 0 0 0)}
.h-full>.sx-r{height:100%}
.sx-r.sx-in{opacity:1;transform:none;filter:none;clip-path:inset(0 0 0 0)}

/* section heading underline draw */
.sx-line{display:block;height:4px;width:72px;margin:14px auto 0;border-radius:4px;background:linear-gradient(90deg,#9F055D,#F8CF05);transform:scaleX(0);transform-origin:left;transition:transform 1s cubic-bezier(.2,.7,.2,1) .25s}
.sx-in .sx-line{transform:scaleX(1)}

/* ---------- keyframes ---------- */
@keyframes sxGrad{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes sxGridPan{from{background-position:0 0}to{background-position:56px 56px}}
@keyframes sxSpin{to{transform:rotate(360deg)}}
@keyframes sxPing{0%{transform:scale(.2);opacity:.9}100%{transform:scale(2.6);opacity:0}}
@keyframes sxFloat{0%,100%{transform:translate(0,0)}50%{transform:translate(12px,-26px)}}
@keyframes sxWord{from{transform:translateY(110%) rotate(7deg);opacity:0}to{transform:none;opacity:1}}
@keyframes sxBlurIn{from{filter:blur(12px);opacity:0;transform:translateY(12px)}to{filter:none;opacity:1;transform:none}}
@keyframes sxFadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
@keyframes sxShine{0%{transform:translateX(-160%) skewX(-20deg)}60%,100%{transform:translateX(260%) skewX(-20deg)}}
@keyframes sxRing{0%,70%,100%{transform:rotate(0)}74%{transform:rotate(-16deg)}78%{transform:rotate(14deg)}82%{transform:rotate(-12deg)}86%{transform:rotate(10deg)}90%{transform:rotate(-6deg)}}
@keyframes sxWallIn{from{opacity:0;transform:perspective(1400px) rotateY(-28deg) translateX(90px) scale(.92)}to{opacity:1;transform:none}}
@keyframes sxKen{from{transform:scale(1.02) translate(0,0)}to{transform:scale(1.16) translate(-2%,-2%)}}
@keyframes sxScan{0%{top:-12%}100%{top:112%}}
@keyframes sxBlink{0%,49%{opacity:1}50%,100%{opacity:0}}
@keyframes sxNoise{0%{background-position:0 0}20%{background-position:-40px 20px}40%{background-position:30px -50px}60%{background-position:-60px -10px}80%{background-position:20px 40px}100%{background-position:0 0}}
@keyframes sxMotion{0%{left:18%;top:30%;width:26%;height:44%}35%{left:44%;top:26%;width:24%;height:48%}70%{left:30%;top:36%;width:28%;height:42%}100%{left:18%;top:30%;width:26%;height:44%}}
@keyframes sxMotionFlash{0%,100%{border-color:#F8CF05}50%{border-color:rgba(248,207,5,.35)}}
@keyframes sxBracket{from{width:0;height:0}to{width:18px;height:18px}}
@keyframes sxMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes sxBob{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-12px) rotate(2deg)}}
@keyframes sxNudge{0%,100%{transform:translateX(0)}50%{transform:translateX(6px)}}
@keyframes sxShimmer{from{background-position:-200% 0}to{background-position:200% 0}}
@keyframes sxPulseRing{0%{box-shadow:0 0 0 0 rgba(248,207,5,.65)}100%{box-shadow:0 0 0 22px rgba(248,207,5,0)}}
@keyframes sxBlob{0%,100%{border-radius:42% 58% 63% 37%/41% 44% 56% 59%;transform:translate(0,0) rotate(0)}50%{border-radius:61% 39% 35% 65%/56% 62% 38% 44%;transform:translate(30px,-20px) rotate(40deg)}}
@keyframes sxBounce{0%,100%{transform:translateY(0)}30%{transform:translateY(-8px)}55%{transform:translateY(0)}75%{transform:translateY(-3px)}}
@keyframes sxSpinIn{from{transform:rotate(-180deg) scale(0)}to{transform:none}}

/* ---------- hero ---------- */
.sx-hero{background:linear-gradient(120deg,#3a0124,#7A0448,#9F055D,#5c0238);background-size:300% 300%;animation:sxGrad 16s ease infinite}
.sx-grid{background-image:linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px);background-size:56px 56px;animation:sxGridPan 6s linear infinite;mask-image:radial-gradient(ellipse at 70% 40%,#000 20%,transparent 75%);-webkit-mask-image:radial-gradient(ellipse at 70% 40%,#000 20%,transparent 75%)}
.sx-spot{background:radial-gradient(520px circle at calc(var(--mx,.5)*100%) calc(var(--my,.5)*100%),rgba(248,207,5,.13),transparent 60%)}
.sx-radar{background:conic-gradient(from 0deg,rgba(248,207,5,.28),rgba(248,207,5,0) 22%,transparent 100%);animation:sxSpin 7s linear infinite}
.sx-pingdot{animation:sxPing 3.2s cubic-bezier(0,.6,.4,1) infinite}
.sx-particle{animation:sxFloat var(--d,9s) ease-in-out infinite;animation-delay:var(--dl,0s)}
.sx-word{display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:.08em}
.sx-word>span{display:inline-block;animation:sxWord .9s cubic-bezier(.2,.7,.2,1) both}
.sx-blurin{animation:sxBlurIn 1.1s ease both}
.sx-fadeup{animation:sxFadeUp .8s cubic-bezier(.2,.7,.2,1) both}
.sx-btn{position:relative;overflow:hidden;transition:transform .35s cubic-bezier(.2,.7,.2,1),box-shadow .35s}
.sx-btn:hover{transform:translateY(-3px);box-shadow:0 14px 30px -10px rgba(0,0,0,.45)}
.sx-btn::after{content:"";position:absolute;inset:0;width:40%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.65),transparent);animation:sxShine 3.6s ease-in-out infinite;pointer-events:none}
.sx-ring{animation:sxRing 3s ease-in-out infinite;transform-origin:50% 50%}
.sx-wall{animation:sxWallIn 1.3s cubic-bezier(.2,.7,.2,1) .35s both}
.sx-tilt{transform:perspective(1400px) rotateY(calc((var(--mx,.5) - .5)*-10deg)) rotateX(calc((var(--my,.5) - .5)*8deg));transition:transform .5s cubic-bezier(.2,.7,.2,1)}
.sx-feed img{animation:sxKen 14s ease-in-out infinite alternate}
.sx-feed:hover img{animation-play-state:paused;transform:scale(1.2)!important;transition:transform .8s}
.sx-scan{position:absolute;left:0;right:0;height:18%;background:linear-gradient(180deg,transparent,rgba(248,207,5,.16),transparent);animation:sxScan 3.8s linear infinite;pointer-events:none}
.sx-noise{background-image:${NOISE_SVG};mix-blend-mode:overlay;opacity:.28;animation:sxNoise .9s steps(4) infinite;pointer-events:none}
.sx-rec{animation:sxBlink 1.1s steps(1) infinite}
.sx-motion{position:absolute;border:2px solid #F8CF05;animation:sxMotion 9s ease-in-out infinite,sxMotionFlash 1s ease-in-out infinite;pointer-events:none}
.sx-br{position:absolute;border-color:rgba(255,255,255,.85);animation:sxBracket .8s cubic-bezier(.2,.7,.2,1) 1.4s both}

/* ---------- marquee ---------- */
.sx-marquee{animation:sxMarquee 38s linear infinite}
.sx-marquee-wrap:hover .sx-marquee{animation-play-state:paused}

/* ---------- about / founder ---------- */
.sx-bob{animation:sxBob 5s ease-in-out infinite}
.sx-nudge{display:inline-block;animation:sxNudge 1.4s ease-in-out infinite}
.sx-kenslow{animation:sxKen 22s ease-in-out infinite alternate}

/* ---------- why us ---------- */
.sx-shimmer{background:linear-gradient(90deg,rgba(194,24,110,.1) 0%,rgba(194,24,110,.1) 40%,rgba(248,207,5,.45) 50%,rgba(194,24,110,.1) 60%,rgba(194,24,110,.1) 100%);background-size:200% 100%;animation:sxShimmer 3.5s linear infinite}
.sx-stat:hover .sx-staticon{animation:sxPulseRing 1.1s ease-out infinite;background:#C2186E;color:#fff}
.sx-stat:hover .sx-staticon svg{transform:rotate(360deg);transition:transform .8s cubic-bezier(.2,.7,.2,1)}
.sx-staticon{transition:background .3s,color .3s}
.sx-card{position:relative;overflow:hidden;transition:transform .5s cubic-bezier(.2,.7,.2,1),box-shadow .5s}
.sx-card:hover{transform:translateY(-6px);box-shadow:0 24px 50px -20px rgba(159,5,93,.55)}
.sx-card::after{content:"";position:absolute;top:0;bottom:0;left:0;width:35%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);transform:translateX(-160%) skewX(-20deg);pointer-events:none}
.sx-card:hover::after{animation:sxShine 1.2s ease forwards}

/* ---------- services ---------- */
.sx-svc img{transition:transform 1s cubic-bezier(.2,.7,.2,1)}
.sx-svc:hover img{transform:scale(1.12)}
.sx-svc .sx-sum{transform:translateY(100%);opacity:0;transition:transform .5s cubic-bezier(.2,.7,.2,1),opacity .5s}
.sx-svc:hover .sx-sum,.sx-svc:focus-within .sx-sum{transform:none;opacity:1}
.sx-svc .sx-name::after{content:"";display:block;height:2px;margin:6px auto 0;width:0;background:#9F055D;transition:width .4s}
.sx-svc:hover .sx-name::after{width:48px}
.sx-arrow{transition:transform .3s,background .3s,color .3s}
.sx-arrow:hover{transform:scale(1.12);background:#9F055D;color:#fff}

/* ---------- process ---------- */
.sx-track{transform:scaleX(0);transform-origin:left;transition:transform 1.6s cubic-bezier(.2,.7,.2,1) .2s}
.sx-in .sx-track{transform:scaleX(1)}
.sx-in .sx-stepicon{animation:sxSpinIn .9s cubic-bezier(.2,.7,.2,1) both;animation-delay:var(--dl,0s)}

/* ---------- sectors ---------- */
.sx-sector{position:relative;overflow:hidden;isolation:isolate;transition:color .4s,transform .4s}
.sx-sector::before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(135deg,#9F055D,#C2186E);transform:translateY(101%);transition:transform .5s cubic-bezier(.2,.7,.2,1)}
.sx-sector:hover{color:#fff;transform:translateY(-4px)}
.sx-sector:hover::before{transform:none}
.sx-sector:hover svg{animation:sxBounce .9s ease;color:#F8CF05}

/* ---------- areas ---------- */
.sx-chip{transition:background .3s,color .3s,transform .3s,border-color .3s}
.sx-chip:hover{background:#9F055D;color:#fff;border-color:#9F055D;transform:translateY(-3px) scale(1.04)}

/* ---------- faq ---------- */
.sx-acc{display:grid;grid-template-rows:0fr;transition:grid-template-rows .5s cubic-bezier(.2,.7,.2,1)}
.sx-acc.open{grid-template-rows:1fr}
.sx-acc>div{overflow:hidden}

/* ---------- cta ---------- */
.sx-cta{background:linear-gradient(110deg,#7A0448,#9F055D,#C2186E,#7A0448);background-size:300% 300%;animation:sxGrad 12s ease infinite}
.sx-blob{animation:sxBlob 14s ease-in-out infinite}
.sx-pulse{animation:sxPulseRing 1.8s ease-out infinite}

/* ---------- progress ---------- */
.sx-progress{transform-origin:left;transform:scaleX(0)}
`;

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

type RevealAnim =
  | "up"
  | "down"
  | "left"
  | "right"
  | "zoom"
  | "pop"
  | "blur"
  | "flip"
  | "tiltL"
  | "tiltR"
  | "clip"
  | "clipUp";

function Reveal({
  children,
  anim = "up",
  delay = 0,
  className = "",
  style,
}: {
  children: ReactNode;
  anim?: RevealAnim;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  // The outer wrapper is observed; the inner one animates. (A fully clipped
  // element reports zero visibility, so clip reveals must not observe themselves.)
  return (
    <div ref={ref} className={className} style={style}>
      <div className={`sx-r sx-${anim} ${inView ? "sx-in" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
        {children}
      </div>
    </div>
  );
}

function Counter({ value, suffix, start }: { value: number; suffix: string; start: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const duration = 2000;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value]);
  return (
    <>
      {n.toLocaleString("en-IN")}
      {suffix}
    </>
  );
}

function useClock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleString("en-GB", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    setNow(fmt());
    const id = setInterval(() => setNow(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function SectionTitle({ children, sub, light = false }: { children: ReactNode; sub?: ReactNode; light?: boolean }) {
  return (
    <Reveal anim="up" className="text-center mb-12">
      <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold ${light ? "text-white" : "text-black"}`}>
        {children}
      </h2>
      <span className="sx-line" aria-hidden="true" />
      {sub && (
        <p className={`mt-5 max-w-2xl mx-auto text-[15px] leading-relaxed ${light ? "text-white/80" : "text-ink/70"}`}>
          {sub}
        </p>
      )}
    </Reveal>
  );
}

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 100}%`,
  size: 3 + (i % 4) * 2,
  d: `${7 + (i % 5) * 2}s`,
  dl: `${(i % 7) * -1.3}s`,
}));

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollToSlide = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    if (card) {
      track.scrollTo({ left: card.offsetLeft - 16, behavior: "smooth" });
    }
    setActiveSlide(index);
  };

  /* ---- new state / refs ---- */
  const heroRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [counterRef, countersInView] = useInView<HTMLDivElement>(0.3);
  const clock = useClock();

  useEffect(() => {
    activeRef.current = activeSlide;
  }, [activeSlide]);

  // Scroll progress bar + parallax (ref-driven, no re-renders)
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      }
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax) || 0.1;
        const rect = el.parentElement?.getBoundingClientRect();
        if (!rect) return;
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.15)`;
      });
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Keep carousel dots in sync with manual swipes
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const cards = Array.from(track.children) as HTMLElement[];
        let best = 0;
        let bestDist = Infinity;
        cards.forEach((c, i) => {
          const d = Math.abs(c.offsetLeft - 16 - track.scrollLeft);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        setActiveSlide(best);
      }, 120);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, []);

  // Carousel autoplay (skipped for reduced-motion users)
  useEffect(() => {
    if (carouselPaused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const r = track.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const next = (activeRef.current + 1) % SERVICES.length;
      const card = track.children[next] as HTMLElement | undefined;
      if (card) track.scrollTo({ left: card.offsetLeft - 16, behavior: "smooth" });
      setActiveSlide(next);
    }, 4200);
    return () => clearInterval(id);
  }, [carouselPaused]);

  const onHeroMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", ((e.clientX - r.left) / r.width).toFixed(3));
    el.style.setProperty("--my", ((e.clientY - r.top) / r.height).toFixed(3));
  };

  const h1Words = "CCTV installation and security systems in Bangalore".split(" ");

  return (
    <main className="min-h-screen bg-white">
      <style dangerouslySetInnerHTML={{ __html: ANIMATION_CSS }} />
      <noscript>
        <style>{`.sx-r{opacity:1!important;transform:none!important;filter:none!important;clip-path:none!important}`}</style>
      </noscript>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      {/* Scroll progress */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none">
        <div ref={progressRef} className="sx-progress h-full bg-accent" />
      </div>

      {/* ---------------------------------------------------------- */}
      {/* Live hero — camera wall                                      */}
      {/* ---------------------------------------------------------- */}
      <section
        ref={heroRef}
        onMouseMove={onHeroMove}
        aria-labelledby="hero-heading"
        className="sx-hero relative overflow-hidden text-white"
      >
        <div className="sx-grid absolute inset-0" aria-hidden="true" />
        <div className="sx-spot absolute inset-0" aria-hidden="true" />
        <div aria-hidden="true" className="absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full opacity-60">
          <div className="sx-radar absolute inset-0 rounded-full" />
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-[18%] rounded-full border border-white/10" />
          <div className="absolute inset-[36%] rounded-full border border-white/10" />
          <span className="sx-pingdot absolute left-[30%] top-[62%] h-3 w-3 rounded-full bg-accent" />
          <span className="sx-pingdot absolute left-[55%] top-[40%] h-3 w-3 rounded-full bg-accent" style={{ animationDelay: "1.1s" }} />
          <span className="sx-pingdot absolute left-[42%] top-[78%] h-3 w-3 rounded-full bg-accent" style={{ animationDelay: "2.2s" }} />
        </div>
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="sx-particle absolute rounded-full bg-white/30"
            style={
              {
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                "--d": p.d,
                "--dl": p.dl,
              } as CSSProperties
            }
          />
        ))}

        <div className="relative max-w-container mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-[1.05fr_1fr] gap-12 items-center">
          <div>
            <p className="sx-fadeup inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
              <span className="relative flex h-2.5 w-2.5">
                <span className="sx-pingdot absolute inline-flex h-full w-full rounded-full bg-accent" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              Securing Bangalore for 22+ years
            </p>

            <h1
              id="hero-heading"
              className="mt-6 text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold leading-[1.08] tracking-tight"
            >
              {h1Words.map((w, i) => (
                <span key={i} className="sx-word mr-[0.25em]">
                  <span style={{ animationDelay: `${150 + i * 90}ms` }}>{w}</span>
                </span>
              ))}
            </h1>

            <p className="sx-blurin mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-white/85" style={{ animationDelay: "0.9s" }}>
              Sterling CCTV Solutions plans, installs and maintains CCTV, access control and fire safety systems for
              homes, businesses and large public events across Karnataka.
            </p>

            <div className="sx-fadeup mt-8 flex flex-wrap gap-4" style={{ animationDelay: "1.15s" }}>
              <Link
                href="/request-a-quote"
                className="sx-btn inline-flex items-center rounded-btn bg-accent px-7 py-4 text-sm font-bold text-black hover:bg-accent-dark"
              >
                Request a quote
              </Link>
              <a
                href={`tel:${PHONE_TEL}`}
                className="sx-btn inline-flex items-center gap-2 rounded-btn border-2 border-white/70 px-6 py-[14px] text-sm font-bold text-white hover:bg-white hover:text-brand"
              >
                <Phone size={18} className="sx-ring" />
                Call {PHONE_DISPLAY}
              </a>
            </div>

            <ul className="mt-10 grid sm:grid-cols-3 gap-4 text-sm text-white/85">
              {HERO_TRUST.map((t, i) => (
                <li key={t} className="sx-fadeup flex items-start gap-2" style={{ animationDelay: `${1.35 + i * 0.15}s` }}>
                  <BadgeCheck size={18} className="mt-0.5 shrink-0 text-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Camera wall */}
          <div className="sx-wall">
            <div className="sx-tilt rounded-xl bg-black/40 p-2.5 ring-1 ring-white/15 shadow-[0_40px_80px_-30px_rgba(0,0,0,.7)] backdrop-blur">
              <div className="mb-2 flex items-center justify-between px-1.5 text-[11px] font-mono text-white/70">
                <span className="flex items-center gap-1.5">
                  <span className="sx-rec h-2 w-2 rounded-full bg-red-500" />
                  LIVE · 4 CH
                </span>
                <span suppressHydrationWarning>{clock ?? "--/--/---- --:--:--"}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {HERO_FEEDS.map((f, i) => (
                  <div key={f.cam} className="sx-feed relative aspect-[4/3] overflow-hidden rounded-md bg-black">
                    <Image
                      src={f.src}
                      alt={f.alt}
                      fill
                      priority={i < 2}
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover opacity-90 saturate-[.85]"
                      style={{ animationDelay: `${i * -3.5}s` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                    <div className="sx-noise absolute inset-0" aria-hidden="true" />
                    <div className="sx-scan" style={{ animationDelay: `${i * 0.9}s` }} aria-hidden="true" />
                    {i === 1 && <div className="sx-motion" aria-hidden="true" />}
                    <span className="sx-br left-2 top-2 border-l-2 border-t-2" />
                    <span className="sx-br right-2 top-2 border-r-2 border-t-2" />
                    <span className="sx-br left-2 bottom-2 border-l-2 border-b-2" />
                    <span className="sx-br right-2 bottom-2 border-r-2 border-b-2" />
                    <div className="absolute left-3 top-2.5 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-white">
                      <span className="sx-rec h-1.5 w-1.5 rounded-full bg-red-500" style={{ animationDelay: `${i * 0.25}s` }} />
                      REC
                    </div>
                    <div className="absolute bottom-2.5 left-3 text-[10px] sm:text-[11px] font-mono leading-tight text-white">
                      {f.cam}
                      <br />
                      <span className="text-white/70">{f.place}</span>
                    </div>
                    {i === 1 && (
                      <span className="absolute bottom-2.5 right-3 rounded bg-accent px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold text-black">
                        MOTION
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Trust marquee                                               */}
      {/* ---------------------------------------------------------- */}
      <section aria-label="Organisations and events we have secured" className="sx-marquee-wrap overflow-hidden bg-accent py-4">
        <div className="sx-marquee flex w-max items-center">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="flex items-center gap-3 px-6 text-sm sm:text-base font-bold text-black whitespace-nowrap" aria-hidden={i >= MARQUEE.length}>
              <ShieldCheck size={18} className="text-brand" />
              {m}
            </span>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Animated counters                                           */}
      {/* ---------------------------------------------------------- */}
      <section aria-label="Sterling CCTV Solutions in numbers" className="bg-white py-14">
        <div ref={counterRef} className="max-w-container mx-auto px-4 grid grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-6">
          {COUNTERS.map((c, i) => (
            <Reveal key={c.label} anim="up" delay={i * 120} className="text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-brand tabular-nums">
                <Counter value={c.value} suffix={c.suffix} start={countersInView} />
              </p>
              <span
                aria-hidden="true"
                className="mx-auto mt-3 block h-[3px] w-10 origin-left rounded bg-accent transition-transform duration-1000"
                style={{ transform: countersInView ? "scaleX(1)" : "scaleX(0)", transitionDelay: `${400 + i * 120}ms` }}
              />
              <p className="mt-3 text-sm font-medium text-ink/75">{c.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Founder vision (original hero banner)                       */}
      {/* ---------------------------------------------------------- */}
      <section className="relative w-full overflow-hidden bg-[#e9e2dd]">
        <Reveal anim="clip">
          <div className="relative w-full aspect-[1366/500] overflow-hidden">
            <Image
              src="/images/banner1.png"
              alt="H K Vinod Kumar, Founder and CEO of Sterling CCTV Solutions, and the company vision"
              fill
              priority
              sizes="100vw"
              className="sx-kenslow object-contain object-center"
            />
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* About                                                       */}
      {/* ---------------------------------------------------------- */}
      <section className="max-w-container mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Reveal anim="left">
            <p className="uppercase tracking-wide text-sm font-semibold text-black/70 mb-3">
              About Sterling CCTV Solutions
            </p>
          </Reveal>
          <Reveal anim="blur" delay={120}>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-text leading-snug mb-5">
              &ldquo;We have developed a finely tuned process, designed to fit your unique security requirements and
              existing conditions&rdquo;
            </h2>
          </Reveal>
          <Reveal anim="up" delay={240}>
            <p className="text-[15px] leading-relaxed text-ink/90 mb-6">
              Sterling CCTV Solutions located in Bangalore is a leading CCTV installation &amp; Home Security Systems
              company servicing customers who want proper installation work done by a master security technician. We
              have developed a finely tuned process, designed to fit your unique security requirements and existing
              conditions.
            </p>
          </Reveal>
          <Reveal anim="up" delay={360}>
            <Link href="/about-us" className="font-semibold text-black hover:text-brand transition-colors">
              Read More <span className="sx-nudge">»</span>
            </Link>
          </Reveal>
        </div>

        <Reveal anim="clipUp" delay={150} className="relative">
          <div className="relative h-72 sm:h-96 rounded-block overflow-hidden">
            <div data-parallax="0.12" className="absolute inset-0 will-change-transform">
              <Image
                src="https://www.sterlingcctvsolutions.com/images/gallery-8.jpg"
                alt="Sterling CCTV Solutions technicians reviewing installation plans"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="sx-bob absolute -bottom-6 -left-4 sm:-left-8 rounded-xl bg-brand px-5 py-4 text-white shadow-xl">
            <p className="text-3xl font-extrabold leading-none text-accent">22+</p>
            <p className="mt-1 text-xs font-semibold">Years of trusted security</p>
          </div>
          <span aria-hidden="true" className="absolute -right-3 -top-3 h-24 w-24 rounded-tr-xl border-r-4 border-t-4 border-accent" />
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Why Choose Us                                               */}
      {/* ---------------------------------------------------------- */}
      <section className="bg-muted py-16">
        <div className="max-w-container mx-auto px-4">
          <Reveal anim="up" className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2">Why Choose Us?</h2>
            <p className="text-ink/70 mb-4">Sterling CCTV Solutions is a team of professional security system engineers and installers.</p>
            <span className="sx-shimmer inline-block rounded-full bg-brand-text/10 px-4 py-1.5 text-sm font-semibold text-brand-text">
              Celebrating 12 Years of Dedicated CCTV Installation Excellence
            </span>
          </Reveal>

          {/* Stats card */}
          <Reveal anim="flip">
            <div className="bg-white rounded-block shadow-sm px-6 py-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-14">
              {STATS.map(({ icon: Icon, label }, i) => (
                <Reveal key={label} anim="pop" delay={200 + i * 110}>
                  <div className="sx-stat flex flex-col items-center text-center gap-3 cursor-default">
                    <span className="sx-staticon flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-text text-brand-text">
                      <Icon size={28} />
                    </span>
                    <p className="text-sm font-medium text-ink">{label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <p className="text-sm font-semibold text-brand-text mb-6">Why Choose Sterling CCTV Solutions?</p>

          {/* Why Choose Us - image grid */}
          <div className="grid grid-cols-1 gap-4 sm:gap-5 overflow-x-hidden">
            {WHY_CHOOSE_IMAGES.map((src, i) => (
              <Reveal key={src} anim={i % 2 === 0 ? "tiltL" : "tiltR"} delay={60}>
                <div className="sx-card relative aspect-[1366/500] rounded-block overflow-hidden">
                  <Image
                    src={src}
                    alt={WHY_CHOOSE_REASONS[i]?.title ?? `Sterling CCTV Solutions ${i + 1}`}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Services We Provide                                        */}
      {/* ---------------------------------------------------------- */}
      <section
        className="max-w-container mx-auto px-4 py-16"
        onMouseEnter={() => setCarouselPaused(true)}
        onMouseLeave={() => setCarouselPaused(false)}
        onFocus={() => setCarouselPaused(true)}
        onTouchStart={() => setCarouselPaused(true)}
      >
        <Reveal anim="up" className="text-center mb-10">
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-black">Services We Provide</h2>
          <span className="sx-line" aria-hidden="true" />
        </Reveal>

        <div className="relative">
          <div
            ref={trackRef}
            role="region"
            aria-label="Security services carousel"
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-px-4"
          >
            {SERVICES.map((service, i) => (
              <div
                key={service.name}
                className="snap-start shrink-0 w-[85%] sm:w-[46%] lg:w-[45%]"
              >
                <Reveal anim="up" delay={Math.min(i, 3) * 120}>
                  <Link href={`/services#${service.slug}`} className="sx-svc block">
                    <div className="relative h-60 sm:h-72 rounded-block overflow-hidden">
                      <Image
                        src={service.image}
                        alt={`${service.name} installation in Bangalore`}
                        fill
                        sizes="(min-width: 1024px) 45vw, 85vw"
                        className="object-cover"
                      />
                      <div className="sx-sum absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-dark/95 via-brand/85 to-transparent p-5 pt-10 text-sm leading-relaxed text-white">
                        {service.summary}
                      </div>
                    </div>
                    <p className="sx-name mt-4 text-center text-base font-semibold text-black">{service.name}</p>
                  </Link>
                </Reveal>
              </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Previous service"
            onClick={() => scrollToSlide((activeSlide - 1 + SERVICES.length) % SERVICES.length)}
            className="sx-arrow absolute -left-2 sm:-left-5 top-[38%] -translate-y-1/2 hidden sm:flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand shadow-lg"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            aria-label="Next service"
            onClick={() => scrollToSlide((activeSlide + 1) % SERVICES.length)}
            className="sx-arrow absolute -right-2 sm:-right-5 top-[38%] -translate-y-1/2 hidden sm:flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand shadow-lg"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {SERVICES.map((s, i) => (
            <button
              key={s.slug}
              aria-label={`Go to ${s.name}`}
              onClick={() => scrollToSlide(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                activeSlide === i ? "w-6 bg-brand" : "w-2 bg-brand/25 hover:bg-brand/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* How we work                                                 */}
      {/* ---------------------------------------------------------- */}
      <section className="bg-muted py-20">
        <div className="max-w-container mx-auto px-4">
          <SectionTitle sub="Every Sterling installation follows the same four steps, planned by a master security technician.">
            How we secure your property
          </SectionTitle>

          <Reveal anim="up" className="relative">
            <div aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-[3px] rounded bg-brand/15 lg:block">
              <div className="sx-track h-full rounded bg-gradient-to-r from-brand to-accent" />
            </div>
            <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map(({ icon: Icon, title, body }, i) => (
                <li key={title} className="relative text-center">
                  <Reveal anim="pop" delay={300 + i * 250}>
                    <span
                      className="sx-stepicon relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white shadow-lg ring-8 ring-muted"
                      style={{ "--dl": `${0.3 + i * 0.25}s` } as CSSProperties}
                    >
                      <Icon size={26} />
                    </span>
                  </Reveal>
                  <Reveal anim="up" delay={450 + i * 250}>
                    <p className="mt-5 text-xs font-bold text-brand-text">Step {i + 1}</p>
                    <h3 className="mt-1 text-lg font-bold text-black">{title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink/75">{body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Sectors                                                     */}
      {/* ---------------------------------------------------------- */}
      <section className="max-w-container mx-auto px-4 py-20">
        <SectionTitle sub="From a single apartment to crowds of 12 lakh people, our systems are built around the site.">
          Security systems for every kind of property
        </SectionTitle>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {SECTORS.map(({ icon: Icon, name }, i) => (
            <Reveal key={name} anim="zoom" delay={(i % 4) * 100 + Math.floor(i / 4) * 150} className="h-full">
              <div className="sx-sector flex h-full min-h-[132px] flex-col items-start gap-4 rounded-xl border border-black/10 bg-white p-5 sm:p-6">
                <Icon size={30} className="text-brand transition-colors" />
                <h3 className="text-[15px] sm:text-base font-bold leading-snug">{name}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Areas served (local SEO)                                    */}
      {/* ---------------------------------------------------------- */}
      <section className="bg-muted py-20">
        <div className="max-w-container mx-auto px-4">
          <SectionTitle sub="From our office at Bhasyam Circle, Rajajinagar, we install CCTV for homes and businesses across the city and cover events throughout Karnataka.">
            CCTV installation across Bangalore
          </SectionTitle>
          <ul className="flex flex-wrap justify-center gap-3">
            {AREAS.map((a, i) => (
              <li key={a}>
                <Reveal anim="pop" delay={i * 45}>
                  <span className="sx-chip inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-white px-4 py-2 text-sm font-semibold text-ink cursor-default">
                    <MapPin size={14} className="text-brand-text" />
                    {a}
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* FAQ                                                         */}
      {/* ---------------------------------------------------------- */}
      <section className="max-w-3xl mx-auto px-4 py-20" aria-labelledby="faq-heading">
        <Reveal anim="up" className="text-center mb-12">
          <h2 id="faq-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black">
            Frequently asked questions
          </h2>
          <span className="sx-line" aria-hidden="true" />
        </Reveal>
        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const open = openFaq === i;
            return (
              <Reveal key={f.q} anim="up" delay={i * 80}>
                <div className={`rounded-xl border transition-colors duration-300 ${open ? "border-brand/40 bg-muted" : "border-black/10 bg-white"}`}>
                  <h3>
                    <button
                      type="button"
                      id={`faq-btn-${i}`}
                      aria-expanded={open}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] sm:text-base font-bold text-black"
                    >
                      {f.q}
                      <ChevronDown
                        size={20}
                        className={`shrink-0 text-brand transition-transform duration-500 ${open ? "rotate-180" : ""}`}
                      />
                    </button>
                  </h3>
                  <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} className={`sx-acc ${open ? "open" : ""}`}>
                    <div>
                      <p className="px-5 pb-5 text-[15px] leading-relaxed text-ink/80">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Closing CTA                                                 */}
      {/* ---------------------------------------------------------- */}
      <section className="sx-cta relative overflow-hidden py-20 text-white">
        <span aria-hidden="true" className="sx-blob absolute -left-24 -top-24 h-72 w-72 bg-white/10" />
        <span aria-hidden="true" className="sx-blob absolute -bottom-28 -right-16 h-80 w-80 bg-accent/20" style={{ animationDelay: "-6s" }} />
        <div className="relative max-w-container mx-auto px-4 text-center">
          <Reveal anim="blur">
            <h2 className="text-3xl sm:text-4xl font-extrabold">Get a security plan for your property</h2>
          </Reveal>
          <Reveal anim="up" delay={150}>
            <p className="mx-auto mt-4 max-w-xl text-white/85">
              Tell us about your site and our team will recommend the right cameras and systems, then install them
              properly.
            </p>
          </Reveal>
          <Reveal anim="up" delay={300}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/request-a-quote"
                className="sx-btn sx-pulse inline-flex items-center rounded-btn bg-accent px-7 py-4 text-sm font-bold text-black hover:bg-accent-dark"
              >
                Request a quote
              </Link>
              <a
                href={`tel:${PHONE_TEL}`}
                className="sx-btn inline-flex items-center gap-2 rounded-btn border-2 border-white/80 px-6 py-[14px] text-sm font-bold hover:bg-white hover:text-brand"
              >
                <Phone size={18} className="sx-ring" />
                {PHONE_DISPLAY}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="sx-btn inline-flex items-center gap-2 rounded-btn bg-[#25D366] px-6 py-4 text-sm font-bold text-white"
              >
                <MessageCircle size={18} />
                WhatsApp us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
