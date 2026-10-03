"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Site = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  url: string;
  displayUrl: string;
  preview: string;
  color: string;
  platform: "shopify" | "custom";
};

const sites: Site[] = [
  {
    id: 1,
    title: "Luma & Pause",
    description:
      "Storefront for a probiotic, doctor-formulated hair and skin care brand. Custom hero, ritual-based product sections, MRP/discount pricing and a clean, editorial look.",
    tags: ["SHOPIFY", "LIQUID", "E-COMMERCE", "D2C"],
    url: "https://ajkdng-pm.myshopify.com/",
    displayUrl: "ajkdng-pm.myshopify.com",
    preview: "/luma-pause.png",
    color: "#c2627a",
    platform: "shopify",
  },
  {
    id: 2,
    title: "Pruv",
    description:
      "Scalp-focused hair care store built around a Reset · Support · Repair routine, with a 60-second hair test quiz that recommends the right products.",
    tags: ["SHOPIFY", "LIQUID", "E-COMMERCE", "QUIZ"],
    url: "https://6buyc3-9h.myshopify.com/",
    displayUrl: "6buyc3-9h.myshopify.com",
    preview: "/pruv.png",
    color: "#d08a3c",
    platform: "shopify",
  },
  {
    id: 3,
    title: "InstaCater",
    description:
      "Catering booking platform for corporate events, birthdays, house parties and festivals — browse packages by occasion, guest count and cuisine, then book online.",
    tags: ["NEXT.JS", "REACT", "TAILWIND", "BOOKING"],
    url: "https://instacater.in/",
    displayUrl: "instacater.in",
    preview: "/instacater.png",
    color: "#f59e0b",
    platform: "custom",
  },
];

// ── Icons ───────────────────────────────────────────────────────────────────
const ConeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M9.5 3h5l5 16H4.5z" />
    <path d="M7.6 9h8.8M6 14h12" />
    <path d="M2 21h20" />
  </svg>
);

const ShopifyIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 7h14l-1.2 13H6.2z" />
    <path d="M9 10V6a3 3 0 016 0v4" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);

const ExpandIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
);

// Yellow / black caution tape stripe
const hazardStripe =
  "repeating-linear-gradient(-45deg, #facc15 0 12px, #111 12px 24px)";

export default function UnderConstruction() {
  const [previewing, setPreviewing] = useState<Site | null>(null);

  useEffect(() => {
    if (!previewing) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPreviewing(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [previewing]);

  return (
    <section className="w-full px-6 pt-0 pb-14 transition-colors duration-300 dark:bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <ConeIcon />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Under Construction</h2>
              <span className="relative ml-1 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
              </span>
            </div>
            <p className="ml-7 text-sm text-slate-600 dark:text-neutral-500">
              Client websites I&apos;m currently building — live previews, still being polished.
            </p>
          </div>
          <span className="ml-7 sm:ml-0 inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Work in progress
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => (
            <SiteCard key={site.id} site={site} onPreview={() => setPreviewing(site)} />
          ))}
        </div>
      </div>

      {/* Preview lightbox */}
      {previewing && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setPreviewing(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${previewing.title} preview`}
        >
          <div
            className="w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl dark:bg-[#1c1c1f]"
            onClick={(e) => e.stopPropagation()}
          >
            <BrowserBar site={previewing} large onClose={() => setPreviewing(null)} />
            <div className="relative aspect-[16/10] w-full">
              <Image src={previewing.preview} alt={`${previewing.title} homepage`} fill sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover object-top" />
            </div>
            <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-slate-900 dark:text-white">{previewing.title}</span>
                <PlatformBadge site={previewing} />
                <StatusBadge />
              </div>
              <a
                href={previewing.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: previewing.color }}
              >
                Visit live site <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ── Pieces ──────────────────────────────────────────────────────────────────
function PlatformBadge({ site }: { site: Site }) {
  if (site.platform !== "shopify") return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#95BF47]/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#5e8e3e] ring-1 ring-[#95BF47]/40 dark:text-[#95BF47]">
      <ShopifyIcon /> Shopify
    </span>
  );
}

function StatusBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-600 ring-1 ring-amber-500/30 dark:text-amber-400">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
      In progress
    </span>
  );
}

function BrowserBar({ site, large, onClose }: { site: Site; large?: boolean; onClose?: () => void }) {
  return (
    <div className={`flex items-center gap-3 border-b border-black/5 bg-slate-100 dark:border-white/5 dark:bg-[#141416] ${large ? "px-4 py-2.5" : "px-3 py-2"}`}>
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-1.5 truncate rounded-md bg-white px-2.5 py-1 text-[11px] text-slate-500 dark:bg-white/5 dark:text-neutral-400">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3 shrink-0">
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 018 0v4" />
        </svg>
        <span className="truncate">{site.displayUrl}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close preview"
          className="rounded-md p-1 text-slate-500 transition-colors hover:bg-black/5 hover:text-slate-900 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      )}
    </div>
  );
}

function SiteCard({ site, onPreview }: { site: Site; onPreview: () => void }) {
  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-black/20 dark:border-white/5 dark:bg-[#1c1c1f] dark:hover:border-white/10"
      style={{ ["--accent" as string]: site.color }}
    >
      {/* Caution tape */}
      <div className="h-1.5 w-full opacity-90" style={{ background: hazardStripe }} />

      {/* Browser-framed preview */}
      <button
        onClick={onPreview}
        className="relative block text-left"
        aria-label={`Open ${site.title} preview`}
      >
        <BrowserBar site={site} />
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-[#111]">
          <Image
            src={site.preview}
            alt={`${site.title} homepage`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-slate-900 shadow-lg">
              <ExpandIcon /> Preview
            </span>
          </div>

          {/* Corner badges */}
          <div className="absolute left-2.5 top-2.5 flex gap-1.5">
            {site.platform === "shopify" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#95BF47] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                <ShopifyIcon /> Shopify
              </span>
            )}
          </div>
          <div className="absolute right-2.5 top-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/75 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400 shadow-md backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
              Building
            </span>
          </div>
        </div>
      </button>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="min-w-0 flex-1 truncate text-base font-semibold leading-tight text-slate-900 transition-colors duration-200 group-hover:text-[var(--accent)] dark:text-neutral-100">
            {site.title}
          </h3>
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${site.title}`}
            className="shrink-0 rounded-md p-1 text-neutral-500 transition-colors hover:text-slate-900 dark:hover:text-white"
          >
            <ArrowIcon />
          </a>
        </div>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-neutral-400">
          {site.description}
        </p>

        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {site.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-medium tracking-wider text-slate-500 dark:text-neutral-600">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
