"use client";

const footerLinks = {
  Navigate: [
    { label: "Home",     href: "#hero" },
    { label: "About",    href: "#about" },
    { label: "Journey",  href: "#journey" },
    { label: "Projects", href: "#projects" },
    { label: "Contact",  href: "#contact" },
  ],
  Socials: [
    { label: "GitHub",    href: "https://github.com/Abhishekyaddv" },
    { label: "LinkedIn",  href: "https://www.linkedin.com/in/abhishekyaaddv/" },
    { label: "Twitter",   href: "https://twitter.com" },
    { label: "Instagram", href: "#" },
  ],
  Connect: [
    { label: "abhishekyaaddv@gmail.com", href: "mailto:abhishekyaaddv@gmail.com" },
    { label: "Book a Call",              href: "#" },
    { label: "Resume / CV",             href: "/Abhishek%20CV.pdf" },
  ],
};

// Logo mark — triangular "A" shape matching the screenshot
const LogoMark = () => (
  <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7" aria-hidden="true">
    <path d="M14 3L25 24H3L14 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
    <path d="M8.5 17.5H19.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden bg-white dark:bg-[#111113] border-t border-gray-100 dark:border-white/5">

      {/* ── top content ── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-14 pb-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[1fr_auto_auto_auto]">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3 text-gray-900 dark:text-white">
              <LogoMark />
              <span className="text-base font-semibold tracking-tight">Abhishek Yadav</span>
            </div>
            <p className="text-sm text-gray-400 dark:text-neutral-500 leading-relaxed max-w-[220px]">
              © copyright Abhishek Yadav {year}.<br />All rights reserved.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="mb-4 text-sm font-semibold text-gray-700 dark:text-neutral-200">
                {heading}
              </p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-gray-500 dark:text-neutral-500 transition-colors hover:text-gray-900 dark:hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── large watermark name ── */}
      <div
        className="pointer-events-none select-none"
        aria-hidden="true"
      >
        <p
          className="
            whitespace-nowrap text-center font-black leading-none tracking-tighter
            text-gray-100 dark:text-white/[0.04]
          "
          style={{ fontSize: "clamp(72px, 16vw, 180px)" }}
        >
          Abhishek Yadav
        </p>
      </div>

    </footer>
  );
}
