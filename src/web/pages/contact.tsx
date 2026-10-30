import { useEffect } from "react";
import { useSearch } from "wouter";
import { useContent } from "../queries/content";
import { Bunting } from "../components/desi";
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { waLink } from "../lib/site";
import { telHref, useSite } from "../queries/site";
import { LeadForm } from "../components/lead-form";
import { WaIcon } from "../components/header";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const site = useSite();
  const wa = useContent().whatsapp;
  const preset = new URLSearchParams(useSearch()).get("service") ?? "";
  const items: { icon: typeof Phone; label: string; value: string; href?: string }[] = [
    { icon: Phone, label: "Call us", value: site.phone, href: telHref(site.phone) },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: Clock, label: "Working hours", value: site.hours },
    ...site.phones.map((p) => ({ icon: Phone, label: p.label || "Phone", value: p.number, href: telHref(p.number) })),
    ...site.emails.map((m) => ({ icon: Mail, label: m.label || "Email", value: m.email, href: `mailto:${m.email}` })),
    ...(site.addresses.length
      ? site.addresses.map((a) => ({ icon: MapPin, label: a.label || "Office", value: a.line, href: a.mapUrl || undefined }))
      : [{ icon: MapPin, label: "Office", value: site.city, href: undefined }]),
  ];
  const socials = (
    [
      ["facebook", Facebook],
      ["instagram", Instagram],
      ["linkedin", Linkedin],
      ["youtube", Youtube],
    ] as const
  ).filter(([k]) => site.socials[k]);
  return (
    <section className="relative overflow-hidden bg-cream pb-16 pt-14 sm:pb-20 sm:pt-20">
      <Bunting className="!h-6" />
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <p className="mb-2 flex flex-wrap items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em] text-brand">
            <span className="h-[3px] w-6 rounded-full bg-current" /> Contact Us
            <span lang="te" className="te normal-case tracking-normal text-body/70">· మాతో మాట్లాడండి</span>
          </p>
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Let's Talk About Your <span className="text-chili">Business</span>
          </h1>
          <p lang="te" className="hand-te mt-3 inline-block -rotate-2 rounded-xl bg-[#FFF3B8] px-4 py-2 text-[20px] text-navy shadow-sm">
            ఒక్క call చాలు — మిగతాది మేము చూసుకుంటాం!
          </p>
          <p className="mt-4 max-w-md text-[17px]">Fill the form and our expert will call you within 30 minutes. The first consultation is free.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {items.map((it) => {
              const inner = (
                <>
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-royal/10 text-royal"><it.icon className="h-5 w-5" /></span>
                  <span>
                    <span className="block text-[13px]">{it.label}</span>
                    <span className="block whitespace-pre-line font-semibold text-navy">{it.value}</span>
                  </span>
                </>
              );
              return it.href ? (
                <a key={it.label + it.value} href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-line hover:ring-royal/40">{inner}</a>
              ) : (
                <div key={it.label + it.value} className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-line">{inner}</div>
              );
            })}
          </div>
          <a href={waLink(site.whatsapp, site.bot.whatsappMessage)} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-wa px-6 py-3 font-semibold text-white hover:brightness-95">
            <WaIcon /> Chat on WhatsApp
          </a>
          {wa.secondNumber && (
            <a href={waLink(wa.secondNumber, site.bot.whatsappMessage)} target="_blank" rel="noreferrer" className="ml-3 mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-wa px-6 py-2.5 font-semibold text-green-700 hover:brightness-95 hover:bg-wa hover:text-white">
              <WaIcon /> WhatsApp {wa.secondLabel || "us"}
            </a>
          )}
          {socials.length > 0 && (
            <div className="mt-6 flex gap-2">
              {socials.map(([k, Icon]) => (
                <a key={k} href={site.socials[k]} target="_blank" rel="noreferrer" aria-label={k} className="grid h-11 w-11 place-items-center rounded-xl bg-white text-royal ring-1 ring-line hover:bg-royal hover:text-white">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_30px_60px_-34px_rgba(11,31,75,0.45)] sm:p-8">
          <h2 className="text-2xl font-bold">Request a Free Call</h2>
          <p className="mt-1 text-[14px]">Takes less than a minute.</p>
          <div className="mt-6">
            <LeadForm layout="stack" source="contact" cta="Get Free Consultation" withEmail withMessage defaultService={preset} />
          </div>
        </div>
      </div>
    </section>
  );
}
