import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { CATEGORIES, serviceUrl, waLink } from "../lib/site";
import { telHref, useSite } from "../queries/site";
import { Logo, WaIcon } from "./header";
import { useExtraLinks } from "./content-ui";

export function Footer() {
  const extra = useExtraLinks();
  const site = useSite();
  const reg = CATEGORIES[0];
  const brandDesign = [CATEGORIES[1], CATEGORIES[2]];
  const digital = [CATEGORIES[3], CATEGORIES[4], CATEGORIES[5], CATEGORIES[6]];
  return (
    <footer className="relative bg-navy text-white/75">
      <div className="h-1.5 bg-[linear-gradient(90deg,#FF6A13_0%,#FF6A13_33%,#ffffff_33%,#ffffff_66%,#16A34A_66%)]" />
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="rounded-xl bg-white px-3 py-2 inline-block"><Logo /></div>
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed">
            {site.tagline}
          </p>
          <div className="mt-5 space-y-2.5 text-[15px]">
            <a href={telHref(site.phone)} className="flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4 text-brand" /> {site.phone}</a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white"><Mail className="h-4 w-4 text-brand" /> {site.email}</a>
            {site.addresses.length ? (
              site.addresses.map((a, i) => (
                <p key={i} className="flex items-start gap-2"><MapPin className="mt-1 h-4 w-4 shrink-0 text-brand" /> <span className="whitespace-pre-line">{a.line}</span></p>
              ))
            ) : (
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand" /> {site.city}</p>
            )}
          </div>
          <div className="mt-5 flex gap-2">
            {(
              [
                ["facebook", Facebook],
                ["instagram", Instagram],
                ["linkedin", Linkedin],
                ["youtube", Youtube],
              ] as const
            )
              .filter(([k]) => site.socials[k])
              .map(([k, Icon]) => (
                <a key={k} href={site.socials[k]} target="_blank" rel="noreferrer" aria-label={k} className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 hover:bg-brand hover:text-white">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
          </div>
        </div>
        <div>
          <h4 className="mb-4 font-semibold !text-white">Registration</h4>
          <ul className="space-y-2.5 text-[15px]">
            {reg.menuItems.slice(0, 7).map((m) => (
              <li key={m}><Link to={serviceUrl("registration", m)} className="hover:text-white">{m}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-semibold !text-white">Branding & Design</h4>
          <ul className="space-y-2.5 text-[15px]">
            {brandDesign.flatMap((c) => c.menuItems.slice(0, 4).map((m) => (
              <li key={c.slug + m}><Link to={serviceUrl(c.slug, m)} className="hover:text-white">{m}</Link></li>
            )))}
          </ul>
        </div>
        <div>
          <a
            href={waLink(site.whatsapp)}
            target="_blank"
            rel="noreferrer"
            className="mb-7 flex items-center gap-3 rounded-2xl bg-white/10 p-3 ring-1 ring-white/15 transition hover:bg-white/15"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-wa text-white">
              <WaIcon className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-semibold text-white">Quick Support</span>
              <span className="text-[13px]">Chat on WhatsApp →</span>
            </span>
          </a>
          <h4 className="mb-4 font-semibold !text-white">Digital</h4>
          <ul className="space-y-2.5 text-[15px]">
            {digital.map((c) => (
              <li key={c.slug}><Link to={`/services/${c.slug}`} className="hover:text-white">{c.title}</Link></li>
            ))}
            {extra.map((x) => (
              <li key={x.to}><Link to={x.to} className="hover:text-white">{x.label}</Link></li>
            ))}
            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-[13px] sm:flex-row">
          <p>© {new Date().getFullYear()} {site.siteName}. All rights reserved.</p>
          <p lang="te" className="te">తెలుగు రాష్ట్రాల నుంచి India అంతటా · Serving businesses across India</p>
        </div>
      </div>
    </footer>
  );
}

