"use client";

/* ============================================================================
   Sterling CCTV Solutions — Gallery page  (app/gallery/page.tsx)
   Images: /public/images/1s.jpg … /public/images/95s.jpg
   Everything for the gallery lives in this one file. Built mobile-first.

   Animations: hero gradient drift · grid pan · heading word rise
   3D tilt-in reveal per photo (scroll) · pointer 3D tilt + glare (desktop)
   hover zoom · "Show more" · lightbox open zoom · lightbox slide transition
   thumbnail strip auto-scroll · swipe (mobile)

   Premium layer:
   scroll progress bar · film grain · 3D floating photo collage in the hero
   (mouse tilt on desktop, auto drift on touch) · glass stats · scroll cue
   3D tilted film-reel rows · custom "View" cursor (desktop) · masonry / grid
   switch · gold hairline frame on hover · lightbox ambient backdrop
   slideshow with progress bar · click-to-zoom with pan · floating CTA photos

   Scroll + parallax layer (works the same on touch and desktop):
   hero cards fly apart at depth-based speeds · hero copy lifts and fades
   reel rows slide sideways with scroll · sticky stacked highlight cards that
   scale and dim as the next one arrives · every grid photo scrubs in 3D depth
   with scroll · parallax image inside every grid photo · drifting wordmark
   behind the collection heading
   Every photo is shown whole (no cropping, no zoom-crop, no overlays on the image).
   All motion respects prefers-reduced-motion.
   ========================================================================== */

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Expand,
  Phone,
  Camera,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  LayoutGrid,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL, SITE_URL } from "@/lib/constants";

/* -------------------------------------------------------------------------- */
/* Data                                                                        */
/* -------------------------------------------------------------------------- */

const TOTAL = 95;
const STEP = 24;
const SLIDE_MS = 3500;

const PHOTOS = Array.from({ length: TOTAL }, (_, i) => ({
  id: i + 1,
  src: `/images/${i + 1}s.jpg`,
  alt: `CCTV and security installation by Sterling CCTV Solutions, Bangalore (photo ${i + 1})`,
}));

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Sterling CCTV Solutions project gallery",
  url: `${SITE_URL}/gallery`,
  description: "Photos of CCTV, access control and security system installations by Sterling CCTV Solutions in Bangalore.",
  image: PHOTOS.map((p) => ({ "@type": "ImageObject", contentUrl: `${SITE_URL}${p.src}`, description: p.alt })),
};

/* Hero 3D collage — photo index, position, depth, rotation */
const STACK = [
  { i: 3, x: "9%", y: "20%", z: 140, r: -8, mobile: true },
  { i: 16, x: "88%", y: "16%", z: 70, r: 7, mobile: true },
  { i: 28, x: "5%", y: "70%", z: 30, r: 6, mobile: false },
  { i: 43, x: "91%", y: "66%", z: 160, r: -6, mobile: true },
  { i: 60, x: "22%", y: "90%", z: -60, r: -4, mobile: true },
  { i: 75, x: "74%", y: "92%", z: -30, r: 5, mobile: false },
  { i: 89, x: "30%", y: "6%", z: -160, r: 3, mobile: false },
  { i: 52, x: "70%", y: "4%", z: -120, r: -5, mobile: false },
];

const HERO_STATS = [
  { value: `${TOTAL}`, label: "Photos" },
  { value: "22+", label: "Years installing" },
  { value: "4,800+", label: "Sites secured" },
];

const REEL_A = PHOTOS.slice(0, 18);
const REEL_B = PHOTOS.slice(18, 36);

const HIGHLIGHTS = [PHOTOS[9], PHOTOS[22], PHOTOS[37], PHOTOS[54], PHOTOS[70]];

const CTA_FLOAT = [PHOTOS[7], PHOTOS[33], PHOTOS[66], PHOTOS[81]];

const NOISE_SVG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")";

/* Grid photos currently near the viewport — only these are animated on scroll */
const ACTIVE_TILES = new Set<HTMLElement>();

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/* -------------------------------------------------------------------------- */
/* CSS                                                                         */
/* -------------------------------------------------------------------------- */

const CSS = `
@keyframes gGrad{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes gGridPan{from{background-position:0 0}to{background-position:56px 56px}}
@keyframes gWord{from{transform:translateY(110%) rotate(6deg);opacity:0}to{transform:none;opacity:1}}
@keyframes gFadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
@keyframes gLbIn{from{opacity:0}to{opacity:1}}
@keyframes gImgIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:none}}
@keyframes gSlideL{from{opacity:0;transform:translateX(60px)}to{opacity:1;transform:none}}
@keyframes gSlideR{from{opacity:0;transform:translateX(-60px)}to{opacity:1;transform:none}}
@keyframes gScan{0%{top:-15%}100%{top:115%}}

.g-hero{background:linear-gradient(120deg,#3a0124,#7A0448,#9F055D,#5c0238);background-size:300% 300%;animation:gGrad 16s ease infinite}
.g-grid{background-image:linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px);background-size:56px 56px;animation:gGridPan 6s linear infinite;mask-image:radial-gradient(ellipse at 50% 40%,#000 25%,transparent 75%);-webkit-mask-image:radial-gradient(ellipse at 50% 40%,#000 25%,transparent 75%)}
.g-scan{position:absolute;left:0;right:0;height:22%;background:linear-gradient(180deg,transparent,rgba(248,207,5,.10),transparent);animation:gScan 5s linear infinite;pointer-events:none}
.g-word{display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:.08em}
.g-word>span{display:inline-block;animation:gWord .9s cubic-bezier(.2,.7,.2,1) both}
.g-fadeup{animation:gFadeUp .8s cubic-bezier(.2,.7,.2,1) both}

/* masonry (mobile first) */
.g-masonry{column-count:2;column-gap:10px}
@media (min-width:768px){.g-masonry{column-count:3;column-gap:16px}}
@media (min-width:1280px){.g-masonry{column-count:4;column-gap:18px}}
.g-item{break-inside:avoid;margin-bottom:10px;perspective:1000px}
@media (min-width:768px){.g-item{margin-bottom:16px}}
@media (min-width:1280px){.g-item{margin-bottom:18px}}

/* 3D reveal */
.g-rev{opacity:0;transform:rotateX(28deg) translateY(50px) scale(.94);transform-origin:50% 0;transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1);transition-delay:var(--dl,0ms)}
.g-rev.g-in{opacity:1;transform:none}

/* tile */
.g-tile{position:relative;display:block;width:100%;overflow:hidden;border-radius:14px;background:#efe7ec;cursor:zoom-in;transform:perspective(900px) rotateX(var(--ty,0deg)) rotateY(var(--tx,0deg));transition:transform .45s cubic-bezier(.2,.7,.2,1),box-shadow .45s}
@media (max-width:639px){.g-tile{border-radius:12px}}
.g-tile.g-live{transition:transform .08s linear,box-shadow .45s}
.g-tile:hover{box-shadow:0 26px 50px -22px rgba(159,5,93,.6)}
.g-tile img{transition:transform 1s cubic-bezier(.2,.7,.2,1),filter .6s}
.g-tile:focus-visible{outline:3px solid #F8CF05;outline-offset:3px}
.g-glare{position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at var(--gx,50%) var(--gy,50%),rgba(255,255,255,.35),transparent 55%);opacity:0;transition:opacity .35s}
.g-tile:hover .g-glare{opacity:1}

/* lightbox */
.g-lb{animation:gLbIn .3s ease both}
.g-lbimg{animation:gImgIn .45s cubic-bezier(.2,.7,.2,1) both}
.g-lbimg.g-next{animation:gSlideL .45s cubic-bezier(.2,.7,.2,1) both}
.g-lbimg.g-prev{animation:gSlideR .45s cubic-bezier(.2,.7,.2,1) both}
.g-thumbs{scrollbar-width:none}
.g-thumbs::-webkit-scrollbar{display:none}
.g-btn{transition:transform .3s,background .3s,color .3s}
.g-btn:hover{transform:scale(1.1);background:#F8CF05;color:#000}

/* ========================================================================== */
/* Premium layer                                                              */
/* ========================================================================== */

@keyframes gCardIn{from{opacity:0;scale:.55}to{opacity:1;scale:1}}
@keyframes gBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
@keyframes gMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes gCue{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}
@keyframes gProg{from{width:0}to{width:100%}}
@keyframes gGrain{0%{background-position:0 0}25%{background-position:-50px 30px}50%{background-position:40px -40px}75%{background-position:-30px -60px}100%{background-position:0 0}}
@keyframes gShine{0%{transform:translateX(-150%) skewX(-20deg)}60%,100%{transform:translateX(250%) skewX(-20deg)}}

.g-progress{transform-origin:left;transform:scaleX(0)}
.g-grain{background-image:${NOISE_SVG};mix-blend-mode:overlay;opacity:.14;animation:gGrain 1s steps(4) infinite;pointer-events:none}

/* hero collage */
.g-stage{perspective:1200px;perspective-origin:50% 45%}
.g-rig{transform-style:preserve-3d;transform:rotateY(calc((var(--mx,.5) - .5)*16deg)) rotateX(calc((var(--my,.5) - .5)*-12deg)) translate3d(0,calc(var(--hp,0)*140px),calc(var(--hp,0)*-260px));transition:transform .7s cubic-bezier(.2,.7,.2,1)}
.g-card{position:absolute;transform:translate3d(-50%,calc(-50% - var(--hp,0) * var(--sp,0px)),var(--z)) rotate(calc(var(--r) + var(--hp,0) * var(--sr,0deg)))}
.g-cardin{animation:gCardIn 1.2s cubic-bezier(.2,.7,.2,1) both;animation-delay:var(--dl,0s)}
.g-bob{animation:gBob var(--bd,7s) ease-in-out infinite;animation-delay:var(--bl,0s)}
.g-photo{position:relative;width:6.25rem;overflow:hidden;border-radius:12px;box-shadow:0 40px 70px -30px rgba(0,0,0,.75)}
.g-photo img{display:block;width:100%;height:auto}
@media (min-width:400px){.g-photo{width:7.25rem}}
@media (min-width:640px){.g-photo{width:9.5rem;border-radius:14px}}
@media (min-width:1024px){.g-photo{width:12.5rem}}
.g-vignette{background:radial-gradient(ellipse at 50% 50%,rgba(58,1,36,.9) 0%,rgba(58,1,36,.55) 38%,transparent 68%)}
.g-glass{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
.g-cue{position:relative;height:44px;width:2px;overflow:hidden;border-radius:2px;background:rgba(255,255,255,.2)}
.g-cue::after{content:"";position:absolute;left:0;right:0;top:0;height:50%;background:#F8CF05;animation:gCue 1.8s cubic-bezier(.6,0,.4,1) infinite}
.g-shinebtn{position:relative;overflow:hidden}
.g-shinebtn::after{content:"";position:absolute;inset:0;width:40%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent);animation:gShine 3.6s ease-in-out infinite;pointer-events:none}

/* reel */
.g-reelsec{background:radial-gradient(ellipse at 50% 0%,#5c0238 0%,#2a0119 55%,#17000d 100%)}
.g-reelstage{transform:perspective(1400px) rotateX(12deg) rotateZ(-3deg) scale(1.08);-webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
.g-reel{animation:gMarquee 70s linear infinite}
.g-reel.g-rev2{animation-direction:reverse;animation-duration:80s}
.g-reelrow:hover .g-reel{animation-play-state:paused}
.g-reelitem{position:relative;flex-shrink:0;height:7.5rem;overflow:hidden;border-radius:12px;background:rgba(255,255,255,.04);cursor:zoom-in;transition:transform .5s cubic-bezier(.2,.7,.2,1),box-shadow .5s;}
@media (min-width:640px){.g-reelitem{height:12rem;border-radius:14px}}
@media (min-width:1024px){.g-reelitem{height:14rem}}
.g-reelitem:hover{transform:translateY(-10px) scale(1.04);box-shadow:0 30px 50px -24px rgba(248,207,5,.45)}
.g-reelitem img{display:block;height:100%;width:auto}


/* layout: uniform grid */
.g-masonry.g-uniform{column-count:unset;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
@media (min-width:768px){.g-masonry.g-uniform{grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}}
@media (min-width:1280px){.g-masonry.g-uniform{grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}}
.g-uniform .g-item{margin-bottom:0}
.g-uniform .g-tile{aspect-ratio:4/5;background:#f6eff3}
.g-uniform .g-tile img{height:100%!important;object-fit:contain}
.g-uniform .g-parimg{height:100%}

/* switch */
.g-switch{position:relative;display:inline-flex;border-radius:999px;background:rgba(159,5,93,.08);padding:4px;border:1px solid rgba(159,5,93,.15)}
.g-switch-pill{position:absolute;top:4px;bottom:4px;left:4px;width:calc(50% - 4px);border-radius:999px;background:linear-gradient(135deg,#9F055D,#C2186E);box-shadow:0 8px 20px -8px rgba(159,5,93,.7);transition:transform .45s cubic-bezier(.2,.7,.2,1)}

/* custom cursor */
.g-cursor{position:fixed;left:0;top:0;z-index:90;pointer-events:none;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:999px;background:#F8CF05;display:flex;align-items:center;justify-content:center;color:#000;font-size:12px;font-weight:800;transition:width .35s cubic-bezier(.2,.7,.2,1),height .35s cubic-bezier(.2,.7,.2,1),margin .35s cubic-bezier(.2,.7,.2,1),opacity .3s;opacity:0}
.g-cursor span{opacity:0;transition:opacity .2s}
.g-cursor.g-on{opacity:1}
.g-cursor.g-big{width:84px;height:84px;margin:-42px 0 0 -42px;background:rgba(248,207,5,.92);box-shadow:0 10px 30px -10px rgba(0,0,0,.5)}
.g-cursor.g-big span{opacity:1}

/* lightbox extras */
.g-lbprog{height:2px;background:linear-gradient(90deg,#F8CF05,#C2186E);animation:gProg ${SLIDE_MS}ms linear both}
.g-zoomwrap{transition:transform .5s cubic-bezier(.2,.7,.2,1)}
.g-zoomwrap.g-zoomed{transform:scale(2.1)}

/* CTA floating photos */
.g-ctaphoto{position:absolute;width:5rem;overflow:hidden;border-radius:12px;box-shadow:0 30px 60px -28px rgba(0,0,0,.7);opacity:.45}
.g-ctaphoto img{display:block;width:100%;height:auto}
@media (min-width:640px){.g-ctaphoto{width:6.5rem;opacity:.6}}
@media (min-width:1024px){.g-ctaphoto{width:9rem;opacity:.9}}

/* ========================================================================== */
/* Scroll + parallax layer                                                    */
/* ========================================================================== */

/* hero copy lifts and fades as the hero scrolls away */
.g-herocopy{transform:translate3d(0,calc(var(--hp,0)*80px),0);opacity:calc(1 - var(--hp,0)*1.3);will-change:transform,opacity}

/* depth scrub wrapper + parallax image inside each tile */
.g-scrub{transform-origin:50% 50%;will-change:transform}
.g-parimg{position:relative;display:block}

/* small expand badge (desktop hover only) */
.g-badge{position:absolute;right:10px;top:10px;display:flex;height:34px;width:34px;align-items:center;justify-content:center;border-radius:999px;background:rgba(255,255,255,.92);color:#9F055D;opacity:0;transform:scale(.6);transition:opacity .35s,transform .35s cubic-bezier(.2,.7,.2,1);pointer-events:none}
.g-tile:hover .g-badge,.g-tile:focus-visible .g-badge{opacity:1;transform:none}
@media (hover:none){.g-badge{display:none}}

/* sticky stacked highlights */
.g-stackcard{position:sticky}
.g-stackinner{transform-origin:50% 0;will-change:transform,filter;transition:filter .2s linear}
.g-stackbg{transform:translate3d(0,var(--sy,0px),0) scale(1.25);will-change:transform}

/* sideways reel drift */
[data-xdrift]{will-change:transform}

/* drifting wordmark */
.g-wordmark{color:transparent;-webkit-text-stroke:1.5px rgba(159,5,93,.12);font-weight:900;font-size:clamp(4.5rem,22vw,13rem);line-height:1;letter-spacing:-.03em;white-space:nowrap;will-change:transform}

@media (prefers-reduced-motion:reduce){
  .g-rev{opacity:1;transform:none;transition:none}
  .g-hero,.g-grid,.g-scan,.g-word>span,.g-fadeup,.g-lb,.g-lbimg{animation:none!important}
  .g-tile,.g-tile img{transition:none}
  .g-cardin,.g-bob,.g-reel,.g-grain,.g-cue::after,.g-shinebtn::after,.g-lbprog{animation:none!important}
  .g-rig,.g-herocopy{transform:none;transition:none;opacity:1}
}
`;

/* -------------------------------------------------------------------------- */
/* Tile with scroll reveal, scroll depth, inner parallax and pointer tilt      */
/* -------------------------------------------------------------------------- */

function Tile({
  photo,
  index,
  onOpen,
  priority,
}: {
  photo: (typeof PHOTOS)[number];
  index: number;
  onOpen: (i: number) => void;
  priority: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const scrubRef = useRef<HTMLDivElement>(null);
  const tileRef = useRef<HTMLButtonElement>(null);
  const [inView, setInView] = useState(false);

  // one-time reveal
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // register with the scroll engine only while near the viewport
  useEffect(() => {
    const el = wrapRef.current;
    const scrub = scrubRef.current;
    if (!el || !scrub) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) ACTIVE_TILES.add(scrub);
        else ACTIVE_TILES.delete(scrub);
      },
      { rootMargin: "150px 0px 150px 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      ACTIVE_TILES.delete(scrub);
    };
  }, []);

  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = tileRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.classList.add("g-live");
    el.style.setProperty("--tx", `${((x - 0.5) * 12).toFixed(2)}deg`);
    el.style.setProperty("--ty", `${(-(y - 0.5) * 12).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
  };
  const onLeave = () => {
    const el = tileRef.current;
    if (!el) return;
    el.classList.remove("g-live");
    el.style.setProperty("--tx", "0deg");
    el.style.setProperty("--ty", "0deg");
  };

  return (
    <div ref={wrapRef} className="g-item">
      <div className={`g-rev ${inView ? "g-in" : ""}`} style={{ "--dl": `${(index % 4) * 90}ms` } as CSSProperties}>
        <div ref={scrubRef} className="g-scrub">
          <button
            ref={tileRef}
            type="button"
            onClick={() => onOpen(index)}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            aria-label={`Open photo ${photo.id} of ${TOTAL}`}
            className="g-tile"
          >
            <div data-par="" className="g-parimg">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={800}
                height={600}
                priority={priority}
                sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, 50vw"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <span className="g-glare" aria-hidden="true" />
            <span className="g-badge" aria-hidden="true">
              <Expand size={15} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default function GalleryPage() {
  const [visible, setVisible] = useState(STEP);
  const [open, setOpen] = useState<number | null>(null);
  const [dir, setDir] = useState<"next" | "prev" | "">("");
  const thumbsRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  /* premium layer state / refs */
  const heroRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<"masonry" | "grid">("masonry");
  const [playing, setPlaying] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  const openAt = useCallback((i: number) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setDir("");
    setOpen(i);
  }, []);

  const close = useCallback(() => {
    setOpen(null);
    setPlaying(false);
    setZoomed(false);
    lastFocus.current?.focus();
  }, []);

  const go = useCallback((delta: number) => {
    setDir(delta > 0 ? "next" : "prev");
    setOpen((cur) => (cur === null ? cur : (cur + delta + TOTAL) % TOTAL));
  }, []);

  const isOpen = open !== null;

  // keyboard, scroll lock, focus
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, go]);

  // keep the active thumbnail centred; reveal it in the grid too
  useEffect(() => {
    if (open === null) return;
    if (open >= visible) setVisible(Math.min(TOTAL, Math.ceil((open + 1) / STEP) * STEP));
    const strip = thumbsRef.current;
    const thumb = strip?.children[open] as HTMLElement | undefined;
    if (strip && thumb) {
      strip.scrollTo({ left: thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2, behavior: "smooth" });
    }
  }, [open, visible]);

  // reset zoom whenever the photo changes
  useEffect(() => {
    setZoomed(false);
  }, [open]);

  // slideshow
  useEffect(() => {
    if (!playing || open === null) return;
    const id = setTimeout(() => go(1), SLIDE_MS);
    return () => clearTimeout(id);
  }, [playing, open, go]);

  // scroll engine: progress, hero, reel drift, sticky stack, tile depth + parallax, wordmark
  useEffect(() => {
    let raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const doc = document.documentElement;
      const max = doc.scrollHeight - vh;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      if (reduce) return;

      const hero = heroRef.current;
      if (hero) {
        const hp = clamp(window.scrollY / Math.max(1, hero.offsetHeight), 0, 1);
        hero.style.setProperty("--hp", hp.toFixed(3));
      }

      // reel rows slide sideways
      document.querySelectorAll<HTMLElement>("[data-xdrift]").forEach((el) => {
        const r = (el.parentElement ?? el).getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const speed = Number(el.dataset.xdrift) || 0.2;
        el.style.transform = `translate3d(${((r.top + r.height / 2 - vh / 2) * speed).toFixed(1)}px,0,0)`;
      });

      // drifting wordmark
      document.querySelectorAll<HTMLElement>("[data-drift]").forEach((el) => {
        const r = (el.parentElement ?? el).getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const speed = Number(el.dataset.drift) || 0.3;
        el.style.transform = `translate3d(${((r.top - vh / 2) * speed).toFixed(1)}px,0,0)`;
      });

      // sticky stacked highlights
      const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-stackcard]"));
      cards.forEach((card, i) => {
        const inner = card.firstElementChild as HTMLElement | null;
        if (!inner) return;
        const cr = card.getBoundingClientRect();
        if (cr.bottom < -200 || cr.top > vh + 200) return;
        inner.style.setProperty("--sy", `${((cr.top - vh * 0.3) * -0.12).toFixed(1)}px`);
        const next = cards[i + 1];
        if (!next) {
          inner.style.transform = "none";
          inner.style.filter = "none";
          return;
        }
        const d = next.getBoundingClientRect().top - cr.top;
        const p = clamp(1 - (d - 16) / (vh * 0.75), 0, 1);
        inner.style.transform = `scale(${(1 - p * 0.08).toFixed(3)}) translate3d(0,${(-p * 12).toFixed(1)}px,0)`;
        inner.style.filter = `brightness(${(1 - p * 0.45).toFixed(3)})`;
      });

      // grid photos: 3D depth scrub (image itself is never cropped)
      ACTIVE_TILES.forEach((scrub) => {
        const r = scrub.getBoundingClientRect();
        const p = clamp((r.top + r.height / 2 - vh / 2) / vh, -1, 1);
        const a = Math.abs(p);
        scrub.style.transform = `perspective(900px) rotateX(${(p * 10).toFixed(2)}deg) scale(${(1 - a * 0.07).toFixed(3)})`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // newly mounted tiles (Show more / layout switch) need a pass too
    const id = window.setInterval(onScroll, 600);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearInterval(id);
      cancelAnimationFrame(raf);
    };
  }, []);

  // touch devices: slow auto drift of the hero collage
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (!window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const loop = (t: number) => {
      if (window.scrollY < hero.offsetHeight) {
        hero.style.setProperty("--mx", (0.5 + Math.sin(t / 2800) * 0.35).toFixed(3));
        hero.style.setProperty("--my", (0.5 + Math.cos(t / 3400) * 0.3).toFixed(3));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // custom "View" cursor (fine pointers only)
  useEffect(() => {
    const c = cursorRef.current;
    if (!c) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = -100;
    let y = -100;
    let cx = -100;
    let cy = -100;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      c.classList.add("g-on");
      const hit = (e.target as HTMLElement | null)?.closest(".g-tile, .g-reelitem, .g-stackinner");
      c.classList.toggle("g-big", !!hit);
    };
    const onLeave = () => c.classList.remove("g-on");
    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      c.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const onHeroMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", ((e.clientX - r.left) / r.width).toFixed(3));
    el.style.setProperty("--my", ((e.clientY - r.top) / r.height).toFixed(3));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (zoomed) return;
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  const onZoomMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed) return;
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}% ${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  };

  const words = "Our work across India".split(" ");
  const current = open !== null ? PHOTOS[open] : null;

  return (
    <main className="min-h-screen bg-white overflow-x-clip">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      {/* Scroll progress */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none">
        <div ref={progressRef} className="g-progress h-full bg-gradient-to-r from-accent to-brand" />
      </div>

      {/* Custom cursor */}
      <div ref={cursorRef} aria-hidden="true" className={`g-cursor ${open !== null ? "!opacity-0" : ""}`}>
        <span>View</span>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Hero                                                          */}
      {/* ------------------------------------------------------------ */}
      <section
        ref={heroRef}
        onMouseMove={onHeroMove}
        className="g-hero relative overflow-hidden text-white"
        aria-labelledby="gallery-heading"
      >
        <div className="g-grid absolute inset-0" aria-hidden="true" />
        <div className="g-scan" aria-hidden="true" />

        {/* 3D floating photo collage */}
        <div className="g-stage absolute inset-0" aria-hidden="true">
          <div className="g-rig absolute inset-0">
            {STACK.map((s, k) => (
              <div
                key={s.i}
                className={`g-card ${s.mobile ? "" : "hidden md:block"}`}
                style={
                  {
                    left: s.x,
                    top: s.y,
                    "--z": `${s.z}px`,
                    "--r": `${s.r}deg`,
                    "--sp": `${Math.round(70 + s.z * 0.9)}px`,
                    "--sr": `${s.r * 1.6}deg`,
                  } as CSSProperties
                }
              >
                <div className="g-cardin" style={{ "--dl": `${0.2 + k * 0.12}s` } as CSSProperties}>
                  <div className="g-bob" style={{ "--bd": `${6 + (k % 4)}s`, "--bl": `${k * -1.1}s` } as CSSProperties}>
                    <div className="g-photo">
                      <Image
                        src={PHOTOS[s.i].src}
                        alt=""
                        width={400}
                        height={300}
                        priority={k < 4}
                        sizes="(min-width:1024px) 200px, 152px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="g-vignette absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="g-grain absolute inset-0" aria-hidden="true" />

        <div className="g-herocopy relative z-10 max-w-container mx-auto px-5 py-16 sm:py-20 lg:py-24 text-center flex min-h-[88svh] sm:min-h-[82vh] flex-col items-center justify-center">
          <p className="g-fadeup inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <Camera size={16} className="text-accent" />
            {TOTAL} photos from our sites
          </p>
          <h1
            id="gallery-heading"
            className="mt-6 text-[2.6rem] sm:text-5xl lg:text-7xl font-extrabold leading-[1.04] tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,.35)]"
          >
            {words.map((w, i) => (
              <span key={i} className="g-word mr-[0.25em]">
                <span style={{ animationDelay: `${120 + i * 90}ms` }}>{w}</span>
              </span>
            ))}
          </h1>
          <p
            className="g-fadeup mx-auto mt-5 max-w-xl text-[15px] sm:text-lg leading-relaxed text-white/85"
            style={{ animationDelay: ".6s" }}
          >
            CCTV, access control and security installations completed by our team for homes, businesses and public
            events.
          </p>
          <nav aria-label="Breadcrumb" className="g-fadeup mt-6 text-sm text-white/70" style={{ animationDelay: ".8s" }}>
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Gallery</span>
          </nav>

          {/* glass stats */}
          <div className="g-fadeup mt-9 grid w-full max-w-lg grid-cols-3 gap-2 sm:gap-3" style={{ animationDelay: "1s" }}>
            {HERO_STATS.map((s) => (
              <div key={s.label} className="g-glass rounded-2xl px-2 py-3.5 sm:px-3 sm:py-4">
                <p className="text-lg sm:text-2xl font-extrabold text-accent tabular-nums">{s.value}</p>
                <p className="mt-1 text-[11px] sm:text-xs text-white/75">{s.label}</p>
              </div>
            ))}
          </div>

          {/* scroll cue */}
          <a
            href="#collection"
            className="g-fadeup mt-9 flex flex-col items-center gap-2 text-xs text-white/70 hover:text-white transition-colors"
            style={{ animationDelay: "1.3s" }}
          >
            <span className="g-cue" aria-hidden="true" />
            Scroll to explore
          </a>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 3D film reel                                                  */}
      {/* ------------------------------------------------------------ */}
      <section className="g-reelsec relative overflow-hidden py-12 sm:py-20 text-white" aria-label="Recent installations">
        <div className="g-grain absolute inset-0" aria-hidden="true" />
        <div className="relative max-w-container mx-auto px-5 mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-3">
          <h2 className="text-[1.7rem] sm:text-3xl lg:text-4xl font-extrabold">Recent installations</h2>
          <p className="max-w-sm text-sm text-white/65">Tap any photo to open it full screen.</p>
        </div>
        <div className="g-reelstage relative space-y-3 sm:space-y-5">
          {[REEL_A, REEL_B].map((row, r) => (
            <div key={r} className="g-reelrow overflow-hidden">
              <div data-xdrift={r === 0 ? "0.35" : "-0.35"}>
                <div className={`g-reel ${r === 1 ? "g-rev2" : ""} flex w-max gap-3 sm:gap-5 px-2`}>
                  {[...row, ...row].map((p, i) => (
                    <button
                      key={`${p.id}-${i}`}
                      type="button"
                      onClick={() => openAt(p.id - 1)}
                      aria-label={`Open photo ${p.id} of ${TOTAL}`}
                      aria-hidden={i >= row.length}
                      tabIndex={i >= row.length ? -1 : 0}
                      className="g-reelitem"
                    >
                      <Image src={p.src} alt={p.alt} width={400} height={300} sizes="(min-width:1024px) 400px, 220px" style={{ height: "100%", width: "auto" }} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* Sticky stacked highlights                                     */}
      {/* ------------------------------------------------------------ */}
      <section className="relative bg-white pt-14 sm:pt-20 pb-6" aria-label="Highlights">
        <div className="max-w-container mx-auto px-4 sm:px-5">
          <div className="mb-8 sm:mb-12 text-center">
            <h2 className="text-[1.7rem] sm:text-3xl lg:text-4xl font-extrabold text-black">Highlights</h2>
            <span className="mx-auto mt-3 block h-[3px] w-16 rounded bg-gradient-to-r from-brand to-accent" aria-hidden="true" />
            <p className="mt-3 text-sm text-ink/60">A closer look at a few of our sites.</p>
          </div>

          <div className="relative mx-auto max-w-5xl">
            {HIGHLIGHTS.map((p, i) => (
              <div
                key={p.id}
                data-stackcard=""
                className="g-stackcard mb-[7vh] last:mb-0"
                style={{ top: `calc(11vh + ${i * 16}px)` }}
              >
                <button
                  type="button"
                  onClick={() => openAt(p.id - 1)}
                  aria-label={`Open photo ${p.id} of ${TOTAL}`}
                  className="g-stackinner relative block h-[56svh] sm:h-[66vh] max-h-[620px] w-full overflow-hidden rounded-3xl shadow-[0_40px_80px_-40px_rgba(90,2,52,.7)] cursor-zoom-in"
                >
                  <span className="absolute inset-0 overflow-hidden bg-[#2a0119]" aria-hidden="true">
                    <Image src={p.src} alt="" fill sizes="50vw" className="g-stackbg object-cover blur-2xl opacity-60" />
                  </span>
                  <span className="absolute inset-3 sm:inset-6">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(min-width:1024px) 1024px, 100vw"
                      className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,.45)]"
                    />
                  </span>
                  <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-brand" aria-hidden="true">
                    <Expand size={18} />
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* Masonry grid                                                  */}
      {/* ------------------------------------------------------------ */}
      <section id="collection" className="relative max-w-container mx-auto px-3 sm:px-4 py-12 sm:py-16 scroll-mt-20" aria-label="Project photos">
        <div className="pointer-events-none absolute inset-x-0 top-2 overflow-hidden" aria-hidden="true">
          <p data-drift="0.3" className="g-wordmark">
            Gallery
          </p>
        </div>

        <div className="relative mb-7 sm:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-5 px-1">
          <div>
            <h2 className="text-[1.7rem] sm:text-3xl lg:text-4xl font-extrabold text-black">The full collection</h2>
            <span className="mt-3 block h-[3px] w-16 rounded bg-gradient-to-r from-brand to-accent" aria-hidden="true" />
            <p className="mt-3 text-sm text-ink/60">Every photo is from a site our team installed.</p>
          </div>
          <div className="g-switch self-start sm:self-auto" role="group" aria-label="Gallery layout">
            <span
              className="g-switch-pill"
              aria-hidden="true"
              style={{ transform: layout === "grid" ? "translateX(100%)" : "translateX(0)" }}
            />
            <button
              type="button"
              onClick={() => setLayout("masonry")}
              aria-pressed={layout === "masonry"}
              className={`relative z-10 inline-flex w-[6.5rem] sm:w-28 items-center justify-center gap-2 rounded-full py-2 text-sm font-semibold transition-colors ${
                layout === "masonry" ? "text-white" : "text-brand"
              }`}
            >
              <LayoutDashboard size={16} />
              Masonry
            </button>
            <button
              type="button"
              onClick={() => setLayout("grid")}
              aria-pressed={layout === "grid"}
              className={`relative z-10 inline-flex w-[6.5rem] sm:w-28 items-center justify-center gap-2 rounded-full py-2 text-sm font-semibold transition-colors ${
                layout === "grid" ? "text-white" : "text-brand"
              }`}
            >
              <LayoutGrid size={16} />
              Grid
            </button>
          </div>
        </div>

        <div className={`relative g-masonry ${layout === "grid" ? "g-uniform" : ""}`}>
          {PHOTOS.slice(0, visible).map((p, i) => (
            <Tile key={p.id} photo={p} index={i} onOpen={openAt} priority={i < 4} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="text-sm text-ink/60">
            Showing {visible} of {TOTAL} photos
          </p>
          <div className="h-1.5 w-48 overflow-hidden rounded-full bg-brand/15">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand to-accent transition-[width] duration-700"
              style={{ width: `${(visible / TOTAL) * 100}%` }}
            />
          </div>
          {visible < TOTAL && (
            <button
              type="button"
              onClick={() => setVisible((v) => Math.min(TOTAL, v + STEP))}
              className="g-shinebtn mt-3 inline-flex w-full max-w-xs sm:w-auto items-center justify-center rounded-btn bg-brand px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Show more photos
            </button>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* CTA                                                           */}
      {/* ------------------------------------------------------------ */}
      <section className="g-hero relative overflow-hidden py-16 sm:py-24 text-white">
        <div className="g-grid absolute inset-0" aria-hidden="true" />
        <div className="g-grain absolute inset-0" aria-hidden="true" />
        {CTA_FLOAT.map((p, k) => (
          <div
            key={p.id}
            aria-hidden="true"
            className={`g-ctaphoto ${k > 1 ? "hidden sm:block" : ""}`}
            style={{
              left: k % 2 === 0 ? (k === 0 ? "3%" : "10%") : undefined,
              right: k % 2 === 1 ? (k === 1 ? "3%" : "10%") : undefined,
              top: k < 2 ? "8%" : "58%",
              transform: `rotate(${k % 2 === 0 ? -7 : 7}deg)`,
            }}
          >
            <div className="g-bob relative" style={{ "--bd": `${7 + k}s`, "--bl": `${k * -1.4}s` } as CSSProperties}>
              <Image src={p.src} alt="" width={300} height={225} sizes="144px" />
            </div>
          </div>
        ))}
        <div className="relative max-w-container mx-auto px-5 text-center">
          <span className="g-glass mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl">
            <ShieldCheck size={26} className="text-accent" />
          </span>
          <h2 className="text-[1.7rem] sm:text-3xl lg:text-4xl font-extrabold leading-tight">
            Want this level of work at your property?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[15px] sm:text-base text-white/85">
            Tell us about your site and we will plan the right cameras and systems for it.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/request-a-quote"
              className="g-shinebtn inline-flex w-full max-w-xs sm:w-auto items-center justify-center rounded-btn bg-accent px-7 py-4 text-sm font-bold text-black hover:bg-accent-dark transition-colors"
            >
              Request a quote
            </Link>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex w-full max-w-xs sm:w-auto items-center justify-center gap-2 rounded-btn border-2 border-white/80 px-6 py-[14px] text-sm font-bold hover:bg-white hover:text-brand transition-colors"
            >
              <Phone size={18} />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* Lightbox                                                      */}
      {/* ------------------------------------------------------------ */}
      {current && open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${current.id} of ${TOTAL}`}
          className="g-lb fixed inset-0 z-[100] flex flex-col bg-[#14000b]/95 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          {/* ambient blurred backdrop of the current photo */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <Image
              key={`amb-${current.id}`}
              src={current.src}
              alt=""
              fill
              sizes="50vw"
              className="g-lbimg object-cover scale-125 blur-3xl opacity-35"
            />
            <div className="absolute inset-0 bg-[#14000b]/50" />
          </div>

          {/* slideshow progress */}
          <div className="relative z-10 h-[2px] w-full">
            {playing && <div key={`p-${open}`} className="g-lbprog" />}
          </div>

          {/* top bar */}
          <div className="relative z-10 flex items-center justify-between px-3 sm:px-4 py-3 text-white">
            <p className="text-sm font-semibold tabular-nums">
              {current.id} <span className="text-white/50">/ {TOTAL}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                aria-pressed={playing}
                className="g-btn flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white"
              >
                {playing ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button
                type="button"
                onClick={() => setZoomed((z) => !z)}
                aria-label={zoomed ? "Zoom out" : "Zoom in"}
                aria-pressed={zoomed}
                className="g-btn hidden sm:flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white"
              >
                {zoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
              </button>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close gallery"
                className="g-btn flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* image */}
          <div
            className="relative z-10 flex-1 min-h-0 px-1 sm:px-16 overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <div key={current.id} className={`g-lbimg ${dir ? `g-${dir}` : ""} relative h-full w-full`}>
              <div
                className={`g-zoomwrap relative h-full w-full ${zoomed ? "g-zoomed cursor-zoom-out" : "cursor-zoom-in"}`}
                style={{ transformOrigin: origin }}
                onMouseMove={onZoomMove}
                onClick={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  setOrigin(
                    `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}% ${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`
                  );
                  setZoomed((z) => !z);
                }}
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="100vw"
                  className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,.6)]"
                  priority
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="g-btn absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/15 text-white"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="g-btn absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/15 text-white"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* thumbnails */}
          <div
            ref={thumbsRef}
            className="g-thumbs relative z-10 flex gap-2 overflow-x-auto px-3 sm:px-4 py-3 pb-[max(12px,env(safe-area-inset-bottom))]"
          >
            {PHOTOS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setDir(i > open ? "next" : "prev");
                  setOpen(i);
                }}
                aria-label={`Show photo ${p.id}`}
                aria-current={i === open}
                className={`relative h-12 w-16 sm:h-14 sm:w-20 shrink-0 overflow-hidden rounded-md bg-black/40 transition-all duration-300 ${
                  i === open ? "ring-2 ring-accent opacity-100 scale-105" : "opacity-45 hover:opacity-80"
                }`}
              >
                <Image src={p.src} alt="" fill sizes="80px" className="object-contain" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}