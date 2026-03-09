"use client";

import { FloatingNav } from "@/components/ui/floating-navbar";
import { AppleCarousel } from "@/components/ui/apple-carousel";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { LayoutGrid } from "@/components/ui/layout-grid";
import { projectsData, servicesData, galleryGridCards } from "@/data/projects";
import { bioData, type ExperienceEntry } from "@/data/bio";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "motion/react";
import Galaxy from "@/components/ui/galaxy";
import ImageTrail from "@/components/ui/image-trail";

const navItems = [
  { name: "Work", link: "#work" },
  { name: "Design", link: "#design" },
  { name: "Experience", link: "#experience" },
  { name: "Services", link: "#services" },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: EASE },
});

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-500">
      <ThemeToggle />
      <FloatingNav navItems={navItems} />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-14 pb-16 pt-32 border-b border-border overflow-hidden">
        {/* Dynamic Galaxy Background */}
        <div className="absolute inset-0 z-0 opacity-40 dark:opacity-60 pointer-events-none">
          <Galaxy
            density={0.8}
            speed={0.4}
            glowIntensity={0.2}
            twinkleIntensity={0.4}
            hueShift={210} // Neutral tech blue
            mouseInteraction={true}
          />
        </div>

        <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-8">
          <span className="w-8 h-px bg-border text-foreground" />
          <span className="text-xs font-black uppercase tracking-[0.35em] text-muted-foreground">Portfolio 2026</span>
        </motion.div>

        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-[clamp(3.5rem,12vw,11rem)] font-black leading-[0.88] tracking-tighter uppercase text-foreground"
          >
            ELIAS
            <br />
            <span className="text-foreground/20">J.</span> PEREZ
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            className="md:absolute md:bottom-4 md:right-0 mt-6 md:mt-0 max-w-xs"
          >
            <p className="font-black text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
              {bioData.title}
            </p>
            <p className="text-foreground/60 text-sm leading-relaxed font-medium">
              {bioData.tagline}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-border text-xs font-bold uppercase tracking-widest text-muted-foreground"
        >
          <span>{bioData.contact.location}</span>
          <a href={`mailto:${bioData.contact.email}`} className="hover:text-foreground transition-colors">{bioData.contact.email}</a>
          <a href={bioData.contact.whatsapp} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">{bioData.contact.phone}</a>
          <span className="ml-auto hidden md:block">
            <a href="#work" className="flex items-center gap-2 text-black/60 hover:text-black transition-colors">
              Scroll to work
              <motion.span animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>↓</motion.span>
            </a>
          </span>
        </motion.div>
      </section>

      {/* ── TRACK RECORD ────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-3 border-b border-border">
        {bioData.trackRecord.map((t, i) => (
          <motion.div
            key={t.label}
            {...fadeUp(i * 0.1)}
            className={`px-10 py-14 flex flex-col gap-2 ${i < bioData.trackRecord.length - 1 ? "md:border-r border-border" : ""}`}
          >
            <span className="text-6xl md:text-7xl font-black tracking-tighter">{t.value}</span>
            <span className="font-black text-sm uppercase tracking-widest">{t.label}</span>
            <span className="text-muted-foreground text-xs font-medium tracking-wider">{t.detail}</span>
          </motion.div>
        ))}
      </section>

      {/* ── FEATURED WORK ───────────────────────────────── */}
      <section id="work" className="py-24 px-6 md:px-14 border-b border-border">
        <motion.div {...fadeUp()} className="flex items-baseline justify-between mb-16">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground block mb-3">Client Projects</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">Webs & Apps</h2>
          </div>
          <span className="text-muted-foreground text-sm font-bold hidden md:block italic">Drag · Click to expand</span>
        </motion.div>
        <AppleCarousel cards={projectsData} />
      </section>

      {/* ── VISUAL GALLERY EXHIBITION ───────────────────── */}
      <section id="design" className="relative py-24 px-6 md:px-14 border-b border-border bg-background overflow-hidden">
        {/* Interactive Image Trail Background Layer */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none sm:pointer-events-auto">
          <ImageTrail
            items={galleryGridCards.map(c => c.thumbnail)}
            variant={6}
          />
        </div>

        <div className="relative z-10">
          <motion.div {...fadeUp()} className="flex items-baseline justify-between mb-12">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground block mb-3">Portfolio Visuals</span>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">Gallery</h2>
            </div>
            <span className="text-muted-foreground text-sm font-bold hidden md:block italic">Branding · Automation · Campaigns · Interfaces</span>
          </motion.div>

          {/* 7-row grid: 7 × 18rem rows + gaps ≈ 140rem on desktop */}
          <div className="w-full min-h-[140rem] md:min-h-[140rem]">
            <LayoutGrid cards={galleryGridCards} />
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ──────────────────────────────────── */}
      <section id="experience" className="py-24 border-b border-border bg-background">
        <div className="px-6 md:px-14 mb-16">
          <motion.div {...fadeUp()}>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground block mb-3">Professional Track</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Experience</h2>
          </motion.div>
        </div>

        <div className="divide-y divide-border">
          {bioData.experience.map((job: ExperienceEntry, i: number) => (
            <motion.div
              key={job.company + job.role}
              {...fadeUp(i * 0.1)}
              className="px-6 md:px-14 py-16 grid lg:grid-cols-[1.5fr_1.5fr_2fr] gap-12 group hover:bg-foreground/[0.01] transition-colors"
            >
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">{job.period}</p>
                <h3 className="font-black text-2xl leading-tight mb-1">{job.company}</h3>
                <p className="text-foreground/60 font-bold text-sm uppercase tracking-tighter">{job.role}</p>
              </div>
              <ul className="space-y-4">
                {job.bullets.map((b: string) => (
                  <li key={b} className="flex gap-4 text-foreground/70 text-sm leading-relaxed font-medium">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-foreground/20 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              {job.image && (
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-muted shadow-xl shadow-black/5">
                  <img
                    src={job.image}
                    alt={job.company}
                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SKILLS ──────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-14 border-b border-border">
        <motion.div {...fadeUp()} className="mb-16">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground block mb-3">Capabilities</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Skills</h2>
        </motion.div>
        <div className="flex flex-wrap gap-3">
          {bioData.skills.map((s, i) => (
            <motion.span
              key={s}
              {...fadeUp(i * 0.05)}
              className="border border-border px-5 py-2.5 rounded-full text-sm font-black uppercase tracking-widest hover:bg-foreground hover:text-background transition-all cursor-default"
            >
              {s}
            </motion.span>
          ))}
        </div>
      </section>

      {/* ── SERVICES BENTO ──────────────────────────────── */}
      <section id="services" className="py-24 px-6 md:px-14 border-b border-border bg-background">
        <motion.div {...fadeUp()} className="mb-16">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground block mb-3">What I Offer</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Services</h2>
        </motion.div>
        <BentoGrid>
          {servicesData.map((s, i) => (
            <BentoGridItem
              key={s.title}
              title={s.title}
              description={s.description}
              tag={s.tag}
              className={
                i === 0
                  ? "md:col-span-2 bg-foreground text-background border-foreground [&_h3]:text-background [&_p]:text-muted [&_span]:text-muted-foreground"
                  : i === 3
                    ? "md:col-span-2"
                    : ""
              }
            />
          ))}
        </BentoGrid>
      </section>

      {/* ── INQUIRY & PLATFORMS ────────────────────────── */}
      <section id="inquiry" className="py-24 px-6 md:px-14 border-b border-border bg-background">
        <motion.div {...fadeUp()} className="mb-16">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground block mb-3">Get Started</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Inquiry</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.a
            href="https://form.typeform.com/to/FK3XpcSF"
            target="_blank" rel="noreferrer"
            {...fadeUp(0.1)}
            className="group p-8 bg-card-bg border border-border rounded-3xl hover:bg-foreground hover:text-background transition-all shadow-sm"
          >
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground group-hover:text-background/40 mb-4">Consultancy — ES</p>
            <h3 className="text-2xl font-black mb-1">Formulario de Consultoría</h3>
            <p className="text-sm font-medium text-muted-foreground group-hover:text-background/50">Cuéntanos sobre tu proyecto.</p>
          </motion.a>

          <motion.a
            href="https://form.typeform.com/to/rqtskTlN"
            target="_blank" rel="noreferrer"
            {...fadeUp(0.2)}
            className="group p-8 bg-card-bg border border-border rounded-3xl hover:bg-foreground hover:text-background transition-all shadow-sm"
          >
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground group-hover:text-background/40 mb-4">Consultancy — EN</p>
            <h3 className="text-2xl font-black mb-1">Consultancy Form</h3>
            <p className="text-sm font-medium text-muted-foreground group-hover:text-background/50">Tell us about your requirements.</p>
          </motion.a>

          <motion.div
            {...fadeUp(0.3)}
            className="space-y-4"
          >
            <a
              href="http://hybrydwaitlist.web.app/"
              target="_blank" rel="noreferrer"
              className="block p-6 bg-foreground text-background rounded-2xl hover:bg-foreground/90 transition-all text-center font-black uppercase tracking-widest text-xs"
            >
              HYBRYD Waitlist
            </a>
            <a
              href="https://businessbotss.github.io/businessform/"
              target="_blank" rel="noreferrer"
              className="block p-6 border border-border rounded-2xl hover:bg-foreground hover:text-background transition-all text-center font-black uppercase tracking-widest text-xs"
            >
              Business Form Examples
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT / CTA ───────────────────────────────── */}
      <section id="contact" className="py-32 px-6 md:px-14 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()}>
            <span className="text-xs font-black uppercase tracking-[0.35em] text-white/30 block mb-8">Business Bots Solutions</span>
            <h2 className="text-[clamp(3rem,9vw,8rem)] font-black leading-none tracking-tighter uppercase mb-16">
              Let&apos;s build
              <br />
              <span className="text-white/20">something.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-white/10">
            <motion.div {...fadeUp(0.1)} className="space-y-4">
              <a
                href={bioData.contact.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-6 border border-white/10 rounded-2xl hover:bg-white hover:text-black transition-all"
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-black/40 mb-1">WhatsApp</p>
                  <p className="font-black text-xl">Direct Message</p>
                </div>
                <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
              </a>
              <a
                href={`mailto:${bioData.contact.email}`}
                className="group flex items-center justify-between p-6 border border-white/10 rounded-2xl hover:bg-white hover:text-black transition-all"
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-black/40 mb-1">Email</p>
                  <p className="font-black text-xl">{bioData.contact.email}</p>
                </div>
                <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
              </a>
              <a
                href={bioData.contact.instagram}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-6 border border-white/10 rounded-2xl hover:bg-white hover:text-black transition-all"
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-black/40 mb-1">Instagram</p>
                  <p className="font-black text-xl">@eliasburgzzz</p>
                </div>
                <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
              </a>
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="flex flex-col justify-between">
              <p className="text-white/50 text-lg leading-relaxed font-bold italic">
                &quot;El enfoque no es crear tecnología aislada, sino sistemas digitales que simplifiquen operaciones y mejoren la experiencia del cliente.&quot;
              </p>
              <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-white/20">
                <span>© 2026 Elias J Perez</span>
                <span>Palma de Mallorca — Dubai</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
