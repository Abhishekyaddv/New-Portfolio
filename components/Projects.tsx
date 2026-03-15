"use client";

import { useRef, useState, useSyncExternalStore } from "react";

type Theme = "dark" | "light";

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  return localStorage.getItem("theme") === "light" ? "light" : "dark";
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("storage", onStoreChange);
  window.addEventListener("theme-change", onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("theme-change", onStoreChange);
  };
}

const projects = [
  {
    id: 1,
    title: "Yap - Real time chat application",
    description:
      "A modern, full-stack real-time messaging application built with the MERN stack. Features instant messaging, live user status updates, and a sleek, glassmorphic UI powered by TailwindCSS and DaisyUI.",
    tags: ["REACT", "NEXT.JS", "SOCKET.IO", "TAILWIND", "DAISYUI"],
    color: "#ef4444",
    liveUrl: "https://www.linkedin.com/in/abhishekyaaddv/recent-activity/all/",
    githubUrl: "https://github.com/Abhishekyaddv/YaP---Realtime-Chat-Aplication",
    preview: "/yap.png",
    previewLabel: "Yap - Real time chat application",
    previewBg: "#0f0f1a",
  },
  {
    id: 2,
    title: "React Job Portal",
    description:
      "A fully functional Job Portal application built with React.js. This application demonstrates full CRUD (Create, Read, Update, Delete) operations, allowing users to manage job listings effectively. It serves as a comprehensive portfolio project showcasing modern React practices.",
    tags: ["REACT", "NEXT.JS", "TAILWIND", "CRUD"],
    color: "#22d3ee",
    liveUrl: "https://www.linkedin.com/in/abhishekyaaddv/recent-activity/all/",
    githubUrl: "https://github.com/Abhishekyaddv/Job-Portal-React",
    preview: "/react-portal.png",
    previewLabel: "React Job Portal",
    previewBg: "#0f1a0f",
  },
  {
    id: 3,
    title: "React E-commerce Site",
    description:
      "React E-Commerce Platform 🛒 A full-stack e-commerce application built using React and Vite, featuring a complete shopping cart system, product management, and a secure checkout process. This project demonstrates modern frontend development practices coupled with a robust backend integration.",
    tags: ["REACT", "NEXT.JS", "TAILWIND", "NODE.JS", "EXPRESS.JS"],
    color: "#818cf8",
    liveUrl: "https://www.linkedin.com/in/abhishekyaaddv/recent-activity/all/",
    githubUrl: "https://github.com/Abhishekyaddv/React-Ecommerce-Site",
    preview: "/HomePage.png",
    previewLabel: "React E-commerce Site",
    previewBg: "#0f0f1a",
  },
  {
    id: 4,
    title: "Github user finder",
    description:
      "The GitHub User Finder is a sleek and intuitive web application designed to instantly fetch and display profile information for any GitHub user. Built with modern JavaScript (ES6+), HTML5, and CSS3, this project serves as a practical demonstration of working with external APIs and dynamically rendering data on the front end. It provides a clean, user-friendly interface for quickly accessing key developer metrics and information",
    tags: ["JAVASCRIPT", "HTML", "CSS", "API"],
    color: "#f97316",
    liveUrl: "https://abhishekyaddv.github.io/GitHub-User-Finder-A-Dynamic-API-Powered-Web-Application/github.html",
    githubUrl: "https://github.com/Abhishekyaddv/GitHub-User-Finder-A-Dynamic-API-Powered-Web-Application",
    preview: "/Github.png",
    previewLabel: "Github user finder",
    previewBg: "#1a0f0f",
  },
  {
    id: 5,
    title: "Vanilla Amazon",
    description:
      "Vanilla JS Amazon Clone 🛍️ A fully responsive, front-end clone of the Amazon e-commerce platform, built from the ground up using only vanilla HTML, CSS, and modern JavaScript (ES6+). This project demonstrates a solid understanding of core web technologies without relying on any external frameworks or libraries.",
    tags: ["JAVASCRIPT", "HTML", "CSS", "API"],
    color: "#4ade80",
    liveUrl: "https://abhishekyaddv.github.io/Vanilla-Amazon-Project/amazon.html",
    githubUrl: "https://github.com/Abhishekyaddv/Vanilla-Amazon-Project",
    preview: "/vanilla.png",
    previewLabel: "Vanilla Amazon",
    previewBg: "#0f1a12",
  },
  {
    id: 6,
    title: "Language Learning App - Coming Soon!",
    description:
      "Language Learning App with AI Tutor 🤖 A language learning application that leverages AI to provide personalized tutoring and interactive lessons. Built with React for the frontend and Node.js for the backend, this project demonstrates the integration of AI technologies to create an engaging and effective language learning experience.",
    tags: ["REACT.JS", "NODE.JS", "POSTGRESQL"],
    color: "#e879f9",
    liveUrl: "#",
    githubUrl: "#",
    preview: "/previews/drivedeck.png",
    previewLabel: "Language Learning App - Coming Soon!",
    previewBg: "#1a0f1a",
  },
];

// Arrow icon
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);

// GitHub icon
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

// Book icon for section header
const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" className="w-5 h-5">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
  </svg>
);

export default function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, () => "dark");
  const isDark = theme === "dark";
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPopupPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const activeProject = projects.find((p) => p.id === hovered);

  return (
    <section className="w-full min-h-screen px-6 py-14 transition-colors duration-300 #ffffff dark:bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2.5 mb-1.5">
            <BookIcon />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Featured Projects</h2>
          </div>
          <p className="ml-7 text-sm text-slate-600 dark:text-neutral-500">
            Showcasing my most ambitious full-stack and AI applications.
          </p>
        </div>

        {/* Grid + popup container */}
        <div
          ref={containerRef}
          className="relative"
          onMouseMove={handleMouseMove}
        >
          {/* Floating preview popup */}
          {hovered !== null && activeProject && (
            <div
              className="pointer-events-none absolute z-50 w-[220px] overflow-hidden rounded-xl border transition-opacity duration-150 shadow-2xl border-black/10 dark:border-white/10"
              style={{
                left: popupPos.x + 20,
                top: popupPos.y - 60,
                transform: "translateY(-30%)",
              }}
            >
              {/* Preview image area */}
              <div
                className="h-[130px] w-full flex items-center justify-center"
                style={{ backgroundColor: activeProject.previewBg }}
              >
                <img
                  src={activeProject.preview}
                  alt={activeProject.previewLabel}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // fallback — show a branded placeholder
                    const t = e.currentTarget;
                    t.style.display = "none";
                    const parent = t.parentElement!;
                    parent.innerHTML = `
                      <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:12px">
                        <div style="font-size:28px;font-weight:800;color:${activeProject.color};font-family:monospace;letter-spacing:-1px">{}</div>
                        <div style="font-size:11px;color:#888;text-align:center;line-height:1.4">${activeProject.title}</div>
                      </div>
                    `;
                  }}
                />
              </div>
              {/* Label */}
              <div className="px-3 py-2 text-center bg-white/95 dark:bg-[#1a1a1a]">
                <span className="text-xs font-semibold text-slate-900 dark:text-white">{activeProject.previewLabel}</span>
              </div>
            </div>
          )}

          {/* Project cards grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isDark={isDark}
                isHovered={hovered === project.id}
                onHover={() => setHovered(project.id)}
                onLeave={() => setHovered(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── ProjectCard ─────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  isDark,
  isHovered,
  onHover,
  onLeave,
}: {
  project: (typeof projects)[0];
  isDark: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group relative flex cursor-default flex-col justify-between rounded-2xl border p-5 transition-all duration-300 border-black/10 bg-white hover:border-black/20 hover:bg-slate-50 dark:border-white/5 dark:bg-[#1c1c1f] dark:hover:border-white/10 dark:hover:bg-[#222226]"
      style={{
        boxShadow: isHovered
          ? `0 0 0 1px ${project.color}22, 0 8px 32px ${project.color}11`
          : "none",
      }}
    >
      {/* Top row: dot + actions */}
      <div className="mb-4 flex items-center justify-between">
        {/* Color dot */}
        <span
          className="h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:scale-125"
          style={{ backgroundColor: project.color }}
        />

        {/* Action buttons */}
        <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-500">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-1 transition-colors hover:text-slate-900 dark:hover:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <ArrowIcon />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-1 transition-colors hover:text-slate-900 dark:hover:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <GithubIcon />
          </a>
        </div>
      </div>

      {/* Title */}
      <h3
        className="mb-2 text-base font-semibold transition-colors duration-200"
        style={{ color: isHovered ? project.color : isDark ? "#f5f5f5" : "#0f172a" }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-600 dark:text-neutral-400">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {project.tags.map((tag) => (
          <span key={tag} className="text-[10px] font-medium tracking-wider text-slate-500 dark:text-neutral-600">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
