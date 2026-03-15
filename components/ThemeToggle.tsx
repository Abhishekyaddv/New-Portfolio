"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  return localStorage.getItem("theme") === "dark" ? "dark" : "light";
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

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
  window.dispatchEvent(new Event("theme-change"));
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, () => "light");
  const isDark = theme === "dark";

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";
    applyTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="theme-panel-strong group inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-neutral-900 transition duration-300 hover:-translate-y-0.5 hover:bg-white dark:text-neutral-100 dark:hover:bg-neutral-900"
    >
      <span className="relative grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
        <SunMedium
          className={`absolute h-3.5 w-3.5 text-amber-500 transition-all duration-500 ${isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`}
        />
        <MoonStar
          className={`absolute h-3.5 w-3.5 text-sky-500 transition-all duration-500 ${isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
        />
      </span>
      <span className="min-w-10">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}