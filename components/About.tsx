"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// ── tiny data ──────────────────────────────────────────────────────────────
const skills = [
  "Next.js", "React", "TypeScript", "JavaScript", "Node.js",
  "Tailwind CSS", "Postman", "PostgreSQL", "MongoDB", "Git", "GitHub",
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Abhishekyaddv",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abhishekyaaddv/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:abhishekyaaddv@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M2 7l10 7 10-7"/>
      </svg>
    ),
  },
];

const techBadges = [
  { label: "TypeScript", color: "#3178c6", bg: "#dbeafe", icon: "TS" },
  { label: "React",      color: "#0ea5e9", bg: "#e0f2fe", icon: "⚛" },
  { label: "Next.js",    color: "#111",    bg: "#f3f4f6", icon: "N" },
  { label: "Node.js",    color: "#16a34a", bg: "#dcfce7", icon: "⬡" },
  { label: "PostgreSQL", color: "#4f46e5", bg: "#ede9fe", icon: "🐘" },
];

// ── clock hook ─────────────────────────────────────────────────────────────
function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit", minute: "2-digit", second: "2-digit",
          hour12: true, timeZone: "Asia/Kolkata",
        }) + " (IST)"
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ── component ──────────────────────────────────────────────────────────────
export default function About() {
  const time = useClock();
  const [profileMouse, setProfileMouse] = useState({ x: 0, y: 0, active: false });

  const handleProfileMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setProfileMouse({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      active: true,
    });
  };

  return (
    <section id="about" className="w-full mb-20 px-4 py-2 md:px-5 ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_260px_220px] gap-4">

        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col gap-4">
          
          {/* Profile card */}
          <div
            className="theme-panel relative overflow-hidden p-6"
            onMouseMove={handleProfileMouseMove}
            onMouseLeave={() => setProfileMouse((prev) => ({ ...prev, active: false }))}
          >
            <div
              className="pointer-events-none absolute inset-0 z-0 opacity-60 transition-opacity duration-500"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.12) 1px, transparent 1px)",
                backgroundSize: "26px 26px",
                opacity: profileMouse.active ? 0.55 : 0.25,
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
              style={{
                background: `radial-gradient(220px circle at ${profileMouse.x}px ${profileMouse.y}px, rgba(56, 189, 248, 0.22), transparent 70%)`,
                opacity: profileMouse.active ? 1 : 0,
              }}
            />

            <div className="relative z-10">
            <div className="relative mb-4 h-[150px] w-[150px] overflow-hidden rounded-xl bg-gray-100 dark:bg-white/10">
            
              <Image
                src="/abhi.png"
                alt="Abhishek profile photo"
                fill
                className="object-cover"
                sizes="150px"
                priority
              />
              
            </div>

            <h2 className="theme-heading mb-3 text-3xl font-bold">About me. </h2>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-semibold text-emerald-500 animate-pulse">
                Available for job
              </span>
            </div>

            <p className="theme-copy text-sm leading-relaxed">
              I build interactive web applications using{" "}
              {techBadges.slice(0, 2).map((b) => (
                <TechChip key={b.label} {...b} />
              ))}{" "}
              {" "}
              {techBadges.slice(2, 4).map((b) => (
                <TechChip key={b.label} {...b} />
              ))}{" "}
              and <TechChip {...techBadges[4]} /> — with a strong focus on clean UI.
            </p>

            <div className="mt-4">
              <span className="theme-copy inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 font-mono text-xs transition-colors select-all hover:border-gray-400 dark:border-white/10 dark:hover:border-white/25">
                abhishekyaaddv@gmail.com
              </span>
            </div>
            </div>
          </div>

          {/* Quote + Experience row */}
          <div className="grid grid-cols-[200px_1fr] gap-4">

            {/* Quote card */}
            <div className="theme-panel flex flex-col justify-center p-5">
              <p className="theme-copy text-sm italic leading-relaxed dark:text-neutral-200">
                &ldquo;Code is read much more often than it is written.&rdquo;
              </p>
              <p className="theme-copy-muted mt-3 text-xs">- Guido van Rossum</p>
            </div>

            {/* Experience card */}
            <div className="theme-panel p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-yellow-400 text-sm">✦</span>
                <span className="theme-copy-muted text-xs font-semibold uppercase tracking-widest dark:text-neutral-400">
                  Experience
                </span>
              </div>

              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <div>
                    <p className="theme-heading text-md font-semibold dark:text-white">SDE Intern</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-blue-500 text-md font-medium">Social Cults</span>
                      <span className="theme-copy-muted text-xs dark:text-neutral-600">🌐</span>
                      <span className="theme-copy-muted text-xs dark:text-neutral-600">in</span>
                    </div>
                    {/* <span className="theme-copy mt-2 inline-block rounded-md bg-gray-100 px-2 py-0.5 text-xs dark:bg-white/10">
                      Current Tenure: 4 months
                    </span> */}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className="theme-copy-muted text-md">Jan 2026 - Present</span>
                  {/* briefcase icon */}
                  {/* <svg viewBox="0 0 80 60" className="h-14 w-20 text-gray-100 dark:text-white/10" fill="currentColor z-10">
                    <rect x="15" y="20" width="50" height="34" rx="4"/>
                    <rect x="28" y="13" width="24" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="4"/>
                    <rect x="35" y="34" width="10" height="6" rx="1" fill="white"/>
                  </svg> */}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── MIDDLE COLUMN ── */}
        <div className="flex flex-col gap-4">

          {/* Location / time card */}
          
          <div className="theme-panel overflow-hidden">
            {/* Map placeholder */}
            <div className="relative flex h-[150px] items-center justify-center bg-gray-100 dark:bg-white/5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#e5e7eb_1px,transparent_1px)] bg-[length:20px_20px] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(148,163,184,0.25)_1px,transparent_1px)]" />

              {/* Pulse rings — three staggered rings expanding from center */}
              <span className="absolute h-8 w-8 rounded-full bg-blue-400/30 animate-[ping_2s_ease-out_0s_infinite]" />
              <span className="absolute h-8 w-8 rounded-full bg-blue-400/20 animate-[ping_2s_ease-out_0.6s_infinite]" />
              <span className="absolute h-8 w-8 rounded-full bg-blue-400/10 animate-[ping_2s_ease-out_1.2s_infinite]" />

              {/* Pin icon */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="1.5"
                className="relative z-10 h-8 w-8 drop-shadow-[0_0_6px_rgba(96,165,250,0.6)]"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>

            <div className="p-4 text-center">
              <p className="theme-heading text-sm font-semibold">India</p>
              <p className="theme-copy-muted mt-0.5 font-mono text-xs">{time}</p>
            </div>
          </div>

          {/* Socials 2×2 grid */}
          <div className="theme-panel p-4">
            <div className="grid grid-cols-2 gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme-copy flex flex-col items-center gap-2 rounded-xl border border-gray-100 py-4 transition-all duration-200 hover:border-gray-300 hover:text-gray-800 hover:shadow-sm dark:border-white/10 dark:hover:border-white/20 dark:hover:text-white"
                >
                  {s.icon}
                  <span className="theme-copy-muted text-xs">{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN — Skills ── */}
        <div className="theme-panel h-fit p-5">
          <div className="flex items-center gap-2 mb-5">
            <span className="theme-copy-muted font-mono text-xs">&gt;_</span>
            <span className="theme-heading text-xs font-bold uppercase tracking-widest dark:text-neutral-200">
              Skills &amp; Stack
            </span>
          </div>
          <ul className="space-y-3">
            {skills.map((skill) => (
              <li key={skill} className="flex items-center justify-between group">
                <span className="theme-copy text-sm transition-colors group-hover:text-gray-900 dark:group-hover:text-white">
                  {skill}
                </span>
                <div className="flex items-center gap-1.5 ml-2 flex-1">
                  <div className="h-px flex-1 bg-gray-100 transition-colors group-hover:bg-gray-200 dark:bg-white/10 dark:group-hover:bg-white/20" />
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-300 transition-colors group-hover:bg-gray-500 dark:bg-neutral-600 dark:group-hover:bg-neutral-300" />
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}

// ── TechChip ───────────────────────────────────────────────────────────────
function TechChip({
  label, color, bg, icon,
}: { label: string; color: string; bg: string; icon: string }) {
  return (
    <span
      className="mx-0.5 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium"
      style={{ backgroundColor: bg, color }}
    >
      <span className="text-[10px]">{icon}</span>
      {label}
    </span>
  );
}
