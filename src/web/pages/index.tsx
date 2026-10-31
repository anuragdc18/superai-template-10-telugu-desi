import { useEffect, useState, type ReactNode } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Bot,
  Briefcase,
  ChevronDown,
  FileText,
  Globe2,
  GraduationCap,
  Headphones,
  IndianRupee,
  Instagram,
  Landmark,
  MapPin,
  Megaphone,
  MessageCircle,
  Palette,
  PenTool,
  Phone,
  Printer,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Store,
  Users,
} from "lucide-react";
import { CATEGORIES, POPULAR, SLIDES, serviceUrl, waLink, type Category } from "../lib/site";
import { asset } from "../lib/demo";
import { telHref, useSite } from "../queries/site";
import { LeadForm } from "../components/lead-form";
import { WaIcon } from "../components/header";
import { useContent } from "../queries/content";
import { PostCard } from "../components/content-ui";

/* ───────────────────────── shared bits ───────────────────────── */

/** Handwritten note with an optional curly arrow. */
function Note({ children, className = "", te = false, arrow }: { children: ReactNode; className?: string; te?: boolean; arrow?: "down-left" | "down" | "left" }) {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <p lang={te ? "te" : undefined} className={`${te ? "hand-te text-[19px] leading-snug" : "hand text-[22px] leading-tight"} text-navy`}>
        {children}
      </p>
      {arrow && (
        <svg viewBox="0 0 80 50" className={`mt-1 h-9 w-14 text-brand ${arrow === "down-left" ? "-scale-x-100" : ""} ${arrow === "left" ? "rotate-90" : ""}`} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M8 6 C 30 4, 52 14, 58 40" />
          <path d="M48 32 L58 41 L66 30" />
        </svg>
      )}
    </div>
  );
}

function Eyebrow({ te, en, light = false }: { te?: string; en: string; light?: boolean }) {
  return (
    <p className={`inline-flex flex-wrap items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em] ${light ? "text-sun" : "text-brand"}`}>
      <span className="h-[3px] w-6 rounded-full bg-current" />
      {te && (
        <span lang="te" className="te normal-case tracking-normal">
          {te}
        </span>
      )}
      {te ? <span className={`normal-case tracking-normal ${light ? "text-white/60" : "text-body/70"}`}>· {en}</span> : en}
    </p>
  );
}

function GoogleG({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

const Stars = ({ className = "h-4 w-4", count = 5 }: { className?: string; count?: number }) => (
  <span className="flex text-sun">
    {Array.from({ length: count }, (_, k) => k).map((k) => (
      <Star key={k} className={`${className} fill-current`} />
    ))}
  </span>
);

/* ───────────────────────── 1. hero ───────────────────────── */

const slide = (link: string) => SLIDES.find((s) => s.link === link)!;

type HeroSlide = {
  tag: string;
  te: string;
  /** English word(s) inside the Telugu line to highlight in orange */
  hl: string;
  en: string;
  text: string;
  cta: string;
  link: string;
  image: string;
  chips: { icon: typeof FileText; big: string; small: string }[];
};

const HERO: HeroSlide[] = [
  {
    tag: "All Services · 100% Online",
    te: "మీ Business కి అన్నీ ఒకే చోట",
    hl: "Business",
    en: "Everything your business needs, in one place",
    text: "Registration, logo & branding, websites, social media, AI tools and Microsoft certifications — all handled by experts, 100% online.",
    cta: "Get Free Consultation",
    link: "#enquiry",
    image: "/images/hero-all.jpg",
    chips: [
      { icon: Sparkles, big: "7 areas", small: "One expert team" },
      { icon: Smartphone, big: "100% online", small: "No office visit" },
      { icon: Headphones, big: "Free call", small: "Reply in 30 min" },
    ],
  },
  {
    tag: slide("/services/registration").tag,
    te: "Business ని సరైన పద్ధతిలో Start చేయండి",
    hl: "Start",
    en: slide("/services/registration").title,
    text: slide("/services/registration").text,
    cta: slide("/services/registration").cta,
    link: "/services/registration",
    image: "/images/hero-registration.jpg",
    chips: [
      { icon: FileText, big: "GST in 3–7 days", small: "Fully online" },
      { icon: ShieldCheck, big: "CA & CS experts", small: "Document check" },
      { icon: MessageCircle, big: "WhatsApp updates", small: "Every step" },
    ],
  },
  {
    tag: slide("/services/branding").tag,
    te: "మీ Brand ని అందరికీ గుర్తుండేలా చేయండి",
    hl: "Brand",
    en: slide("/services/branding").title,
    text: slide("/services/branding").text,
    cta: slide("/services/branding").cta,
    link: "/services/branding",
    image: "/images/hero-branding.jpg",
    chips: [
      { icon: PenTool, big: "Logo in 3–5 days", small: "2–3 concepts" },
      { icon: Palette, big: "Full brand kit", small: "Print + online" },
      { icon: BadgeCheck, big: "100% yours", small: "All final files" },
    ],
  },
  {
    tag: slide("/services/website").tag,
    te: "Online లో ఎక్కువ Customers పొందండి",
    hl: "Customers",
    en: slide("/services/website").title,
    text: slide("/services/website").text,
    cta: slide("/services/website").cta,
    link: "/services/website",
    image: "/images/hero-website.jpg",
    chips: [
      { icon: Globe2, big: "Website in 2–3 weeks", small: "Mobile-friendly" },
      { icon: Instagram, big: "Monthly posts", small: "Insta & Facebook" },
      { icon: Megaphone, big: "Paid ads", small: "Real enquiries" },
    ],
  },
  {
    tag: slide("/services/microsoft-certifications").tag,
    te: "Microsoft Certified అవ్వండి",
    hl: "Microsoft Certified",
    en: slide("/services/microsoft-certifications").title,
    text: slide("/services/microsoft-certifications").text,
    cta: slide("/services/microsoft-certifications").linkText,
    link: "/services/microsoft-certifications",
    image: "/images/hero-microsoft.jpg",
    chips: [
      { icon: GraduationCap, big: "7 exams", small: "Fundamentals" },
      { icon: BookOpen, big: "Practice tests", small: "Like the real exam" },
      { icon: BadgeCheck, big: "Exam booking", small: "We help you book" },
    ],
  },
];

function Highlight({ text, hl }: { text: string; hl: string }) {
  const at = text.indexOf(hl);
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="relative inline-block text-chili">
        {hl}
        <svg viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-[0.22em] w-full text-sun" aria-hidden>
          <path d="M2 8 C 50 2, 120 2, 198 7" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        </svg>
      </span>
      {text.slice(at + hl.length)}
    </>
  );
}

function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  // a new slide every 5 seconds (pauses while the mouse is over the hero)
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((v) => (v + 1) % HERO.length), 5000);
    return () => clearTimeout(t);
  }, [i, paused]);
  const h = HERO[i];
  const go = h.link.startsWith("#");

  return (
    <section
      className="relative isolate overflow-hidden bg-cream"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {/* one banner per slide, cross-fading */}
      <div className="absolute inset-y-0 right-0 -z-20 w-full lg:w-[62%]">
        {HERO.map((s, idx) => (
          <img
            key={s.image}
            src={asset(s.image)}
            alt=""
            aria-hidden={idx !== i}
            className={`absolute inset-0 h-full w-full object-cover object-[70%_center] transition-opacity duration-1000 ${idx === i ? "kenburns opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#fff8ec_0%,#fff8ec_40%,rgba(255,248,236,0.88)_52%,rgba(255,248,236,0.15)_72%,rgba(255,248,236,0)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(255,248,236,0.55)_0%,rgba(255,248,236,0.93)_42%,#fff8ec_70%)]" />
      {/* festive bunting */}
      <svg viewBox="0 0 600 40" preserveAspectRatio="none" className="pointer-events-none absolute left-0 top-0 -z-10 h-8 w-[55%] opacity-90 max-lg:w-full" aria-hidden>
        {Array.from({ length: 20 }).map((_, k) => (
          <path key={k} d={`M${k * 30} 0 L${k * 30 + 15} 30 L${k * 30 + 30} 0 Z`} fill={["#FF6A13", "#FFC531", "#16A34A", "#1B3A8C", "#E8381E"][k % 5]} opacity="0.85" />
        ))}
      </svg>

      <div className="container-x relative grid min-h-[600px] items-center pb-28 pt-16 lg:min-h-[640px] lg:grid-cols-[1.08fr_1fr] lg:pb-32 lg:pt-14">
        <div className="relative max-w-[660px]">
          <span key={`t${i}`} className="rise inline-flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-[13px] font-bold text-royal shadow-sm ring-1 ring-royal/15">
            <span className="h-2 w-2 rounded-full bg-brand" /> {h.tag}
          </span>
          <h1 key={`h${i}`} lang="te" className="te rise mt-5 text-balance text-[34px] font-extrabold leading-[1.28] text-navy sm:text-[46px] lg:text-[50px]" style={{ animationDelay: "60ms" }}>
            <Highlight text={h.te} hl={h.hl} />
          </h1>
          <p key={`e${i}`} className="rise mt-3 text-[20px] font-bold leading-snug text-royal sm:text-[24px]" style={{ animationDelay: "120ms" }}>
            {h.en}
          </p>
          <p key={`p${i}`} className="rise mt-4 max-w-[520px] text-[16px] leading-relaxed sm:text-[17px]" style={{ animationDelay: "160ms" }}>
            {h.text}
          </p>
          <div key={`c${i}`} className="rise mt-6 grid max-w-[560px] grid-cols-3 gap-2 sm:gap-3" style={{ animationDelay: "200ms" }}>
            {h.chips.map((c, k) => (
              <div key={c.big} className="flex flex-col items-start gap-1.5 rounded-xl bg-white/90 p-2.5 shadow-sm ring-1 ring-line sm:flex-row sm:gap-2 sm:p-3">
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-white ${["bg-brand", "bg-royal", "bg-leaf"][k]}`}>
                  <c.icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 leading-tight">
                  <span className="block text-[12.5px] font-bold text-navy sm:text-[13.5px]">{c.big}</span>
                  <span className="hidden text-[12px] text-body sm:block">{c.small}</span>
                </span>
              </div>
            ))}
          </div>
          <div className="rise mt-7 flex flex-wrap items-center gap-3" style={{ animationDelay: "240ms" }}>
            {go ? (
              <a href={h.link} className="btn-brand">
                {h.cta} <ArrowRight className="h-4 w-4" />
              </a>
            ) : (
              <Link to={h.link} className="btn-brand">
                {h.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            <Link to="/contact" className="btn-outline">
              Talk to an expert
            </Link>
          </div>
          {/* slide tabs */}
          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Choose a topic">
            {HERO.map((s, idx) => (
              <button
                key={s.tag}
                role="tab"
                aria-selected={idx === i}
                onClick={() => setI(idx)}
                className={`h-2.5 rounded-full transition-all ${idx === i ? "w-10 bg-brand" : "w-2.5 bg-navy/20 hover:bg-navy/40"}`}
                aria-label={s.tag}
              />
            ))}
          </div>
        </div>

        {/* sticky notes on the photo side */}
        <div className="pointer-events-none relative hidden h-full lg:block">
          <div className="note-pop absolute left-[2%] top-[4%] grid h-36 w-36 place-items-center rounded-full bg-sun p-5 text-center shadow-[0_14px_30px_-12px_rgba(0,0,0,0.35)]">
            <p lang="te" className="hand-te text-[19px] font-bold leading-tight text-navy">
              ఇంటి నుంచే
              <span className="hand block text-[20px]">100% Online!</span>
            </p>
          </div>
          <ul className="absolute right-0 top-[6%] space-y-1 rounded-2xl bg-white/85 px-4 py-3 shadow-sm backdrop-blur">
            {["Registration", "Branding", "Website", "Growth"].map((t) => (
              <li key={t} className="hand flex items-center gap-2 text-[22px] text-royal">
                <BadgeCheck className="h-5 w-5 text-leaf" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* brush strokes at the bottom */}
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="pointer-events-none absolute bottom-0 left-0 h-24 w-full" aria-hidden>
        <path d="M0 70 C 200 40, 380 95, 620 66 S 1060 30, 1440 60 L1440 120 L0 120 Z" fill="#FF6A13" opacity="0.85" />
        <path d="M0 92 C 260 70, 520 112, 800 88 S 1200 70, 1440 86 L1440 120 L0 120 Z" fill="#1B3A8C" opacity="0.9" />
        <path d="M0 108 C 300 96, 700 118, 1440 104 L1440 120 L0 120 Z" fill="#fff" />
      </svg>
    </section>
  );
}

/* ───────────────────────── 2. callback card + stats ───────────────────────── */

const TRUST = [
  { icon: Star, big: "4.8", small: "Google Rating" },
  { icon: Users, big: "1,000+", small: "Happy Clients" },
  { icon: MapPin, big: "Pan-India", small: "Service" },
  { icon: ShieldCheck, big: "100%", small: "Online Process" },
];

function Callback() {
  return (
    <section id="enquiry" className="relative z-10 scroll-mt-28 bg-white">
      <div className="container-x -mt-14">
        <div className="relative grid gap-5 overflow-hidden rounded-3xl bg-royal p-5 text-white shadow-[0_30px_60px_-30px_rgba(19,40,107,0.7)] sm:p-7 lg:grid-cols-[300px_1fr] lg:items-center">
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-brand/30 blur-2xl" />
          <div className="relative flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sun text-navy">
              <Phone className="h-6 w-6" />
            </span>
            <div>
              <p className="text-[21px] font-extrabold leading-tight !text-white">Get a Free Call from Our Expert</p>
              <p className="mt-1.5 text-[14px] text-white/75">Tell us what you need. We'll guide you — no pressure, no charges.</p>
            </div>
          </div>
          <div className="relative rounded-2xl bg-white p-3 text-body sm:p-4">
            <LeadForm cta="Call Me Back" />
          </div>
        </div>
      </div>
      <div className="container-x py-8">
        <div className="relative grid grid-cols-2 gap-y-5 rounded-2xl border border-line bg-cream px-4 py-5 md:grid-cols-4">
          {TRUST.map((t, idx) => (
            <div key={t.small} className={`flex items-center justify-center gap-3 ${idx > 0 ? "md:border-l md:border-line" : ""}`}>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-royal shadow-sm">
                {idx === 0 ? <GoogleG className="h-6 w-6" /> : <t.icon className="h-5 w-5" />}
              </span>
              <div>
                <p className="flex items-center gap-1 text-lg font-extrabold leading-tight text-navy">
                  {t.big} {idx === 0 && <Star className="h-4 w-4 fill-sun text-sun" />}
                </p>
                <p className="text-[13px]">{t.small}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 3. services (pastel cut-out cards) ───────────────────────── */

const CAT_STYLE: Record<string, { bg: string; icon: typeof FileText; chip: string }> = {
  registration: { bg: "bg-[#FFF1DC]", icon: FileText, chip: "bg-brand" },
  branding: { bg: "bg-[#FFE4EC]", icon: Palette, chip: "bg-chili" },
  design: { bg: "bg-[#E3EEFF]", icon: Printer, chip: "bg-royal" },
  "social-media": { bg: "bg-[#E6F7EC]", icon: Instagram, chip: "bg-leaf" },
  website: { bg: "bg-[#EFE7FF]", icon: Globe2, chip: "bg-[#7C3AED]" },
  "ai-tools": { bg: "bg-[#FFF6D6]", icon: Bot, chip: "bg-[#D97706]" },
  "microsoft-certifications": { bg: "bg-[#E0F4FA]", icon: GraduationCap, chip: "bg-[#0E7490]" },
};

function CatCard({ c, big = false }: { c: Category; big?: boolean }) {
  const st = CAT_STYLE[c.slug];
  return (
    <Link
      to={`/services/${c.slug}`}
      className={`group relative flex overflow-hidden rounded-3xl ${st.bg} p-5 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-[0_24px_40px_-24px_rgba(19,40,107,0.45)] ${
        big ? "min-h-[300px] flex-col sm:min-h-[420px]" : "min-h-[210px]"
      }`}
    >
      <div className={`relative z-10 flex flex-col ${big ? "max-w-[70%]" : "max-w-[58%]"}`}>
        <span className={`grid h-11 w-11 place-items-center rounded-xl text-white shadow-sm ${st.chip}`}>
          <st.icon className="h-5 w-5" />
        </span>
        <h3 className={`mt-3 font-extrabold leading-tight text-navy ${big ? "text-[26px]" : "text-[19px]"}`}>{c.title}</h3>
        <p className="mt-1.5 text-[13.5px] leading-snug">{c.short}</p>
        {big && (
          <ul className="mt-3 space-y-1 text-[13.5px] font-medium text-navy">
            {c.menuItems.slice(0, 5).map((m) => (
              <li key={m} className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-leaf" /> {m}
              </li>
            ))}
          </ul>
        )}
        <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-[13px] font-semibold text-white transition group-hover:gap-2.5">
          View Services <ArrowRight className="h-4 w-4" />
        </span>
      </div>
      <img
        src={c.image}
        alt=""
        loading="lazy"
        className={`cutout pointer-events-none absolute bottom-0 right-0 object-cover object-top transition duration-500 group-hover:scale-[1.04] ${
          big ? "h-[46%] w-[60%]" : "h-full w-[46%]"
        }`}
      />
    </Link>
  );
}

function NotSureCard() {
  const site = useSite();
  return (
    <div className="relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-3xl bg-navy p-5 text-white">
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand/40 blur-2xl" />
      <div className="relative">
        <p lang="te" className="te text-[15px] font-bold text-sun">ఏది కావాలో తెలియదా?</p>
        <p className="mt-1 text-[20px] font-extrabold leading-tight !text-white">Not sure what you need?</p>
        <p className="mt-1.5 text-[13.5px] text-white/75">Our expert suggests the right service — the first call is free.</p>
      </div>
      <div className="relative mt-4 flex flex-wrap gap-2">
        <a href={telHref(site.phone)} className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-[13px] font-semibold text-white">
          <Phone className="h-4 w-4" /> Call free
        </a>
        <a href={waLink(site.whatsapp)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-wa px-4 py-2 text-[13px] font-semibold text-white">
          <WaIcon className="h-4 w-4" /> WhatsApp
        </a>
      </div>
    </div>
  );
}

function Services() {
  const main = CATEGORIES.filter((c) => c.slug !== "microsoft-certifications");
  return (
    <section className="relative bg-white pb-10 pt-6 sm:pt-10">
      <div className="container-x">
        <div className="relative mx-auto mb-10 max-w-3xl text-center">
          <Megaphone className="absolute -left-2 top-2 hidden h-14 w-14 -rotate-12 text-brand sm:block lg:-left-24" />
          <Eyebrow en="Our Services" />
          <h2 className="mt-3 text-3xl font-extrabold sm:text-[40px] sm:leading-tight">
            What Do You Need <span className="text-brand">Help</span> With?
          </h2>
          <p className="mt-2 text-[16px]">Pick a category. Each one has a clear list of services.</p>
          <Note te className="absolute -right-4 -top-6 hidden rotate-[-6deg] rounded-[40%] bg-[#FFF3B8] px-5 py-3 shadow-sm lg:-right-40 lg:block" arrow="down-left">
            మీ business కి అన్నీ ఒకే చోట!
          </Note>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
            <CatCard c={main[0]} big />
          </div>
          {main.slice(1).map((c) => (
            <CatCard key={c.slug} c={c} />
          ))}
          <NotSureCard />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 4. Microsoft banner ───────────────────────── */

function MicrosoftBanner() {
  const ms = CATEGORIES.find((c) => c.slug === "microsoft-certifications")!;
  return (
    <section className="bg-white pb-14">
      <div className="container-x">
        <Link
          to={`/services/${ms.slug}`}
          className="group relative grid overflow-hidden rounded-3xl bg-[#E0F0FF] ring-1 ring-royal/10 lg:grid-cols-[1.05fr_1fr]"
        >
          <div className="relative z-10 p-7 sm:p-10">
            <span className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-[13px] font-bold text-royal shadow-sm">
              <GraduationCap className="h-4 w-4" /> {ms.title}
            </span>
            <h3 lang="te" className="te mt-4 text-[28px] font-extrabold leading-snug text-navy sm:text-[34px]">
              Microsoft Certified <span className="text-brand">అవ్వండి</span>
            </h3>
            <p className="mt-1 text-[17px] font-semibold text-royal">Fundamentals training for Azure, AI, Copilot, Microsoft 365, Power Platform and Security.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {ms.services.map((s) => (
                <span key={s.name} className="rounded-lg bg-white px-2.5 py-1 text-[12.5px] font-bold text-navy ring-1 ring-royal/15">
                  {s.name.split(":")[0]}
                </span>
              ))}
            </div>
            <span className="btn-brand mt-6 !inline-flex">
              View Services <ArrowRight className="h-4 w-4" />
            </span>
          </div>
          <div className="relative min-h-[240px]">
            <img src={asset("/images/ms-banner.jpg")} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[70%_center] transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#E0F0FF] via-[#E0F0FF]/30 to-transparent max-lg:hidden" />
            <Note className="absolute right-5 top-5 rotate-[-6deg] rounded-xl bg-white/90 px-3 py-2">Learn · Practice · Get Certified</Note>
          </div>
        </Link>
      </div>
    </section>
  );
}

/* ───────────────────────── 5. popular services ───────────────────────── */

const POP_STYLE = [
  { icon: IndianRupee, cls: "bg-[#E6F7EC] text-leaf" },
  { icon: Landmark, cls: "bg-[#E3EEFF] text-royal" },
  { icon: BadgeCheck, cls: "bg-[#EFE7FF] text-[#7C3AED]" },
  { icon: Store, cls: "bg-[#FFF1DC] text-brand" },
  { icon: PenTool, cls: "bg-[#FFE4EC] text-chili" },
  { icon: Globe2, cls: "bg-[#E0F4FA] text-[#0E7490]" },
  { icon: Instagram, cls: "bg-[#FFE4EC] text-[#DB2777]" },
  { icon: MessageCircle, cls: "bg-[#E6F7EC] text-[#16A34A]" },
];

function Popular() {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="container-x">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow en="Most Asked" />
            <h2 className="mt-3 text-3xl font-extrabold sm:text-[38px]">Most Popular Services</h2>
            <p className="mt-2 text-[16px]">These are what most of our customers start with.</p>
          </div>
          <Note te className="rotate-[4deg] rounded-2xl bg-white px-5 py-3 shadow-sm ring-1 ring-line" arrow="down">
            తొందరగా మొదలుపెట్టండి,
            <br />
            పెద్దగా ఎదగండి
          </Note>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {POPULAR.map((p, idx) => {
            const st = POP_STYLE[idx % POP_STYLE.length];
            return (
              <Link
                key={p.name}
                to={serviceUrl(p.cat, p.name)}
                className="group flex items-start gap-4 rounded-2xl border border-line bg-white p-5 transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_20px_40px_-26px_rgba(255,106,19,0.6)]"
              >
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${st.cls}`}>
                  <st.icon className="h-6 w-6" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[16px] font-bold leading-snug text-navy">{p.name}</span>
                  <span className="mt-0.5 block text-[13.5px] text-body/80">{p.days}</span>
                  <span className="mt-2 inline-flex items-center gap-1 text-[13.5px] font-semibold text-brand group-hover:gap-2">
                    Know More <ArrowRight className="h-4 w-4" />
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 6. how it works (brush band) ───────────────────────── */

/** Hand-painted brush edge, fixed height on every screen size. */
function BrushEdge({ bottom = false }: { bottom?: boolean }) {
  return (
    <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className={`block h-8 w-full text-royal sm:h-12 ${bottom ? "rotate-180" : ""}`} aria-hidden>
      <path
        fill="currentColor"
        d="M0 48 V30 L40 22 L90 33 L140 18 L200 29 L260 14 L320 27 L380 19 L440 31 L500 16 L560 28 L620 12 L690 26 L750 18 L820 32 L880 15 L940 27 L1000 20 L1070 33 L1130 16 L1190 28 L1250 19 L1320 31 L1380 17 L1440 26 V48 Z"
      />
      <path fill="currentColor" opacity="0.35" d="M0 48 V38 L120 30 L260 36 L420 26 L600 35 L780 27 L960 37 L1140 28 L1300 36 L1440 30 V48 Z" />
    </svg>
  );
}

const STEPS = [
  { img: "step-1.webp", title: "Tell Us What You Need", text: "Fill the form or call us. It takes 1 minute." },
  { img: "step-2.webp", title: "Share Your Documents", text: "Send them on WhatsApp or email. No office visit." },
  { img: "step-3.webp", title: "We Get It Done", text: "You get updates at every step until it's complete." },
];

function Process() {
  return (
    <section className="relative bg-white py-6">
      <BrushEdge />
      <div className="bg-royal py-12 text-white sm:py-14">
        <div className="container-x">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Eyebrow te="ఎలా పని చేస్తుంది?" en="How it works" light />
            <h2 className="mt-3 text-3xl font-extrabold !text-white sm:text-[40px]">Simple 3-Step Process</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {STEPS.map((s, idx) => (
              <div key={s.title} className="relative">
                <div className="overflow-hidden rounded-3xl bg-white text-center shadow-[0_24px_40px_-24px_rgba(0,0,0,0.5)]">
                  <div className="relative h-48 bg-[#FFE7A3]">
                    <img src={asset(`/images/${s.img}`)} alt="" loading="lazy" className="cutout absolute inset-x-0 bottom-0 mx-auto h-full w-[70%] object-cover object-top" />
                  </div>
                  <div className="px-6 pb-7 pt-5">
                    <h3 className="text-[19px] font-extrabold text-navy">{s.title}</h3>
                    <p className="mt-1.5 text-[15px] text-body">{s.text}</p>
                  </div>
                </div>
                <span className="absolute -left-3 -top-3 grid h-12 w-12 place-items-center rounded-full bg-brand text-[20px] font-extrabold text-white ring-4 ring-royal">
                  {idx + 1}
                </span>
                {idx < STEPS.length - 1 && (
                  <ArrowRight className="absolute -right-7 top-[40%] hidden h-7 w-7 text-sun md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <BrushEdge bottom />
    </section>
  );
}

/* ───────────────────────── 7. for every business ───────────────────────── */

const findCat = (name: string) => CATEGORIES.find((c) => c.services.some((s) => s.name === name))!;

const BUSINESSES = [
  { img: "biz-kirana.jpg", title: "Kirana & retail shops", services: ["GST Registration", "Udyam / MSME Registration", "WhatsApp AI Reply Setup"] },
  { img: "biz-salon.jpg", title: "Salons & clinics", services: ["Logo Design", "Social Media Management", "Appointment Booking Chatbot"] },
  { img: "biz-tuition.jpg", title: "Tuitions & coaching", services: ["WordPress Website Development", "Flyer / Posters", "Ads Boosting"] },
  { img: "biz-boutique.jpg", title: "Boutiques & sellers", services: ["Ecommerce Website Development", "Trademark Registration", "Social Media Post Design"] },
];

function ForEveryBusiness() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-x">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Eyebrow te="ప్రతి వ్యాపారం కోసం" en="For every kind of business" />
          <h2 className="mt-3 text-3xl font-extrabold sm:text-[38px]">Built for Businesses Like Yours</h2>
          <p className="mt-2 text-[16px]">Pick what looks like you — here's where most people like you start.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BUSINESSES.map((b, idx) => (
            <div key={b.title} className="group overflow-hidden rounded-3xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-[0_24px_40px_-28px_rgba(19,40,107,0.5)]">
              <div className="relative h-44 overflow-hidden">
                <img src={asset(`/images/${b.img}`)} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className={`absolute left-3 top-3 rounded-lg px-2.5 py-1 text-[12px] font-bold text-white ${["bg-brand", "bg-chili", "bg-royal", "bg-leaf"][idx]}`}>
                  {b.title}
                </span>
              </div>
              <ul className="space-y-1 p-4">
                {b.services.map((name) => (
                  <li key={name}>
                    <Link to={serviceUrl(findCat(name).slug, name)} className="flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-[14px] font-semibold text-navy hover:bg-cream hover:text-brand">
                      <span className="flex items-center gap-2">
                        <BadgeCheck className="h-4 w-4 shrink-0 text-leaf" /> {name}
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 8. trust + reviews ───────────────────────── */

const WHY = [
  { icon: Sparkles, cls: "bg-[#FFE4EC] text-chili", title: "One place for everything", text: "Registration, branding, website and marketing — no running around." },
  { icon: IndianRupee, cls: "bg-[#E6F7EC] text-leaf", title: "Clear pricing", text: "You know the full cost before we start. No hidden charges." },
  { icon: Smartphone, cls: "bg-[#E3EEFF] text-royal", title: "Fully online", text: "Do everything from your phone, from anywhere in India." },
  { icon: Briefcase, cls: "bg-[#FFF1DC] text-brand", title: "Real experts", text: "CA, CS and design experts guide you at every step." },
];


function Trust() {
  const site = useSite();
  const content = useContent();
  const rs = content.reviewsSection;
  const REVIEWS = rs.show ? content.reviews.slice(0, 3) : [];
  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="container-x grid gap-12 lg:grid-cols-[0.95fr_1.3fr] lg:items-start">
        <div>
          <Eyebrow en={`Why ${site.siteName}?`} />
          <h2 className="mt-3 text-3xl font-extrabold sm:text-[38px] sm:leading-tight">Why Businesses Trust Us</h2>
          <div className="mt-8 space-y-5">
            {WHY.map((w) => (
              <div key={w.title} className="flex gap-4">
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${w.cls}`}>
                  <w.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-navy">{w.title}</h3>
                  <p className="text-[15px]">{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {REVIEWS.length > 0 && (
        <div className="rounded-3xl bg-white p-5 ring-1 ring-line sm:p-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-[20px] font-extrabold">What Our Clients Say</h3>
            {rs.rating && (
              <a href={rs.googleUrl || undefined} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[14px] font-semibold text-navy">
                <GoogleG className="h-6 w-6" /> {rs.rating} on Google{rs.ratingCount ? ` (${rs.ratingCount})` : ""} <Stars />
              </a>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {REVIEWS.map((r, idx) => (
              <figure key={r.id} className={`rounded-2xl border border-line bg-cream/60 p-5 ${idx === 2 ? "sm:col-span-2" : ""}`}>
                <Stars count={r.rating} />
                <blockquote className="mt-3 text-[15px] leading-relaxed text-navy">"{r.text}"</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className={`grid h-10 w-10 place-items-center rounded-full text-[14px] font-bold text-white ${["bg-brand", "bg-royal", "bg-leaf"][idx]}`}>
                    {r.name[0]}
                  </span>
                  <span>
                    <span className="block font-bold text-navy">{r.name}</span>
                    <span className="text-[13px]">{r.place}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        )}
      </div>
    </section>
  );
}

/* ───────────────────────── Latest blog posts ───────────────────────── */

function LatestPosts() {
  const content = useContent();
  if (!content.blog.show || !content.posts.length) return null;
  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="container-x">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow te="చిట్కాలు" en={content.blog.title || "Blog"} />
            <h2 className="mt-3 text-3xl font-extrabold sm:text-[38px]">Tips &amp; Guides</h2>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-1.5 font-bold text-brand hover:gap-2.5">
            See all articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.posts.slice(0, 3).map((p) => (
            <PostCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 9. FAQ ───────────────────────── */


function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const FAQS = useContent().faqs;
  if (!FAQS.length) return null;
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.3fr] lg:items-center">
        <div className="relative mx-auto w-full max-w-[380px]">
          <div className="absolute inset-x-6 bottom-0 top-14 rounded-[44%] bg-[#FFF1DC]" />
          <img src={asset("/images/faq-person.webp")} alt="" className="cutout relative mx-auto h-[400px] w-full object-cover object-top" />
          <div className="note-pop absolute -left-2 top-6 rounded-[46%] bg-sun px-5 py-4 shadow-md">
            <p lang="te" className="hand-te text-[20px] font-bold leading-snug text-navy">
              ఏమైనా సందేహాలు
              <br />
              ఉన్నాయా?
            </p>
          </div>
          <span className="hand absolute right-2 top-0 text-[64px] font-bold text-royal" aria-hidden>
            ?
          </span>
        </div>
        <div>
          <Eyebrow te="ఏమైనా సందేహాలు ఉన్నాయా?" en="FAQ" />
          <h2 className="mt-3 text-3xl font-extrabold sm:text-[38px]">Common Questions</h2>
          <div className="mt-7 space-y-3">
            {FAQS.map((f, idx) => {
              const isOpen = open === idx;
              return (
                <div key={f.id} className={`rounded-2xl border bg-white transition ${isOpen ? "border-brand/40 shadow-[0_16px_30px_-24px_rgba(255,106,19,0.7)]" : "border-line"}`}>
                  <button onClick={() => setOpen(isOpen ? null : idx)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold text-navy" aria-expanded={isOpen}>
                    {f.q}
                    <ChevronDown className={`h-5 w-5 shrink-0 text-brand transition ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-4 text-[15px]">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 10. CTA (also used on inner pages) ───────────────────────── */

export function CtaBand() {
  const site = useSite();
  return (
    <section className="bg-white pb-16 pt-4">
      <div className="container-x">
        <div className="relative grid overflow-hidden rounded-3xl bg-[linear-gradient(110deg,#FF6A13_0%,#FF8F2B_55%,#FFC531_100%)] text-white md:grid-cols-[260px_1fr]">
          <div className="relative hidden md:block">
            <div className="absolute bottom-0 left-6 h-[78%] w-[86%] rounded-t-[50%] bg-white" />
            <img src={asset("/images/cta-person.webp")} alt="" className="cutout absolute bottom-0 left-6 h-[92%] w-[86%] object-cover object-top" />
          </div>
          <div className="relative p-7 sm:p-10">
            <span className="hand absolute right-6 top-4 hidden text-[22px] text-navy/80 lg:block">Your growth, our support</span>
            <p lang="te" className="te text-[17px] font-bold !text-navy">చిన్న business, పెద్ద ఎదుగుదల</p>
            <h2 className="mt-1 text-3xl font-extrabold !text-white sm:text-[38px]">Ready to Grow Your Business?</h2>
            <p className="mt-2 max-w-lg text-[16px] text-white/90">Talk to our expert today. The first consultation is free.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5">
                Get Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={waLink(site.whatsapp)} target="_blank" rel="noreferrer" className="btn-wa">
                <WaIcon /> WhatsApp Us
              </a>
              <a href={telHref(site.phone)} className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-5 py-3 font-semibold text-white ring-1 ring-white/50 hover:bg-white/30">
                <Phone className="h-4 w-4" /> {site.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  return (
    <>
      <Hero />
      <Callback />
      <Services />
      <MicrosoftBanner />
      <Popular />
      <Process />
      <ForEveryBusiness />
      <Trust />
      <LatestPosts />
      <Faq />
      <CtaBand />
    </>
  );
}
