"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import GithubIcon from "./ui/github-icon";
import LinkedinIcon from "./ui/linkedin-icon";
import MailFilledIcon from "./ui/mail-filled-icon";
import TwitterIcon from "./ui/twitter-icon";

// ── tiny data ──────────────────────────────────────────────────────────────
const skills = [ "Python", "Java", "React", "JavaScript", "Node.js",
  "Next.js",  "TypeScript", 
  "Tailwind CSS", "Bootstrap" , "Postman", "PostgreSQL", "MongoDB", "Git", "GitHub",
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Abhishekyaddv",
    icon: (
      <GithubIcon />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abhishekyaaddv/",
    icon: (
      <LinkedinIcon />
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <TwitterIcon />
    ),
  },
  {
    label: "Email",
    href: "mailto:abhishekyaaddv@gmail.com",
    icon: (
      <MailFilledIcon />
    ),
  },
];

const techBadges = [
  { label: "React",      color: "#0ea5e9", bg: "#e0f2fe", icon: "⚛" },
  { label: "JavaScript", color: "#f7df1e", bg: "#636060", icon: "JS" },
  { label: "Node.js",    color: "#16a34a", bg: "#dcfce7", icon: "⬡" },
  { label: "TypeScript", color: "#3178c6", bg: "#dbeafe", icon: "TS" },
  { label: "Next.js",    color: "#111",    bg: "#f3f4f6", icon: "N" },
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
              <TechChip {...techBadges[4]} />  — and many more with a strong focus on clean UI.
            </p>

            <div className="mt-4">
              <span className="theme-copy inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 font-mono text-xs transition-colors select-all hover:border-gray-400 dark:border-white/10 dark:hover:border-white/25">
                abhishekyaaddv@gmail.com
              </span>
            </div>
            </div>
          </div>

          {/* Quote + Experience row */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[200px_1fr]">

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

              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <div>
                    <p className="theme-heading text-md font-semibold dark:text-white">SDE Intern</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-blue-500 text-md font-medium">Social Cults</span>
                      
                    </div>
                    {/* <span className="theme-copy mt-2 inline-block rounded-md bg-gray-100 px-2 py-0.5 text-xs dark:bg-white/10">
                      Current Tenure: 4 months
                    </span> */}
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2 sm:items-end">
                  <span className="theme-copy-muted text-md">Jan 2026 - Present</span>
                  
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
            <div className="relative flex h-37.5 items-center justify-center bg-gray-100 dark:bg-white/5">
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
