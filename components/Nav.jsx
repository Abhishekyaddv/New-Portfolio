"use client";

import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  NavItems,
  Navbar,
} from "./ui/resizable-navbar";

const navItems = [
  { name: "Home", link: "#home" },
  { name: "About", link: "#about" },
  { name: "Email", link: "mailto:abhishekyaaddv@gmail.com" },
];

export const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative z-50 w-full px-4 pt-4 md:px-6">
      <Navbar>
        <NavBody>
          <a
            href="#home"
            className="theme-panel-strong relative z-20 flex items-center gap-3 px-3 py-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100"
          >
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-sky-500" />
            Abhishek
          </a>
          <NavItems items={navItems} />
          <div className="relative z-20 flex items-center gap-3">
            <a
              href="/Abhishek%20CV.pdf"
              download="Abhishek-Yadav-CV.pdf"
              className="theme-panel-strong cv-highlight px-3 py-2 text-xs font-semibold text-neutral-900 transition duration-300 hover:-translate-y-0.5 hover:bg-white dark:text-neutral-100 dark:hover:bg-neutral-900"
            >
              Download CV
            </a>
            <ThemeToggle />
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader className="theme-panel-strong px-3 py-2">
            <a href="#home" className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-sky-500" />
              Abhishek
            </a>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            className="theme-panel-solid"
          >
            <a
              href="/Abhishek%20CV.pdf"
              download="Abhishek-Yadav-CV.pdf"
              onClick={() => setIsMobileMenuOpen(false)}
              className="theme-copy cv-highlight relative rounded-md border border-black/10 px-3 py-2 text-sm font-semibold dark:border-white/10"
            >
              Download CV
            </a>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="theme-copy relative text-sm font-medium"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
};
