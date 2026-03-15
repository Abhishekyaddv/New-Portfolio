"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type CursorState = "default" | "hover" | "click" | "hover-click" | "hidden";
type QuickToFn = (value: number) => gsap.core.Tween;

export default function CustomCursor() {
const dotRef = useRef<HTMLDivElement | null>(null);
const ringRef = useRef<HTMLDivElement | null>(null);

const dotXTo = useRef<QuickToFn | null>(null);
const dotYTo = useRef<QuickToFn | null>(null);
const ringXTo = useRef<QuickToFn | null>(null);
const ringYTo = useRef<QuickToFn | null>(null);

const mouse = useRef({ x: 0, y: 0 });
const [cursorState, setCursorState] = useState<CursorState>("default");

useEffect(() => {
  const dot = dotRef.current;
  const ring = ringRef.current;
  if (!dot || !ring) return;

  const ctx = gsap.context(() => {
    // Setup optimized chase animations
    dotXTo.current = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3.out" });
    dotYTo.current = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3.out" });
    ringXTo.current = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    ringYTo.current = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const tick = () => {
      dotXTo.current?.(mouse.current.x);
      dotYTo.current?.(mouse.current.y);
      ringXTo.current?.(mouse.current.x);
      ringYTo.current?.(mouse.current.y);
    };

    const onEnter = (e: MouseEvent) => {
      const target = (e.target as Element | null)?.closest("[data-cursor]") as HTMLElement | null;
      if (target?.dataset.cursor) setCursorState(target.dataset.cursor as CursorState);
    };

    const onLeave = (e: MouseEvent) => {
      const target = (e.target as Element | null)?.closest("[data-cursor]") as HTMLElement | null;
      if (target) setCursorState("default");
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    window.addEventListener("mousedown", () => setCursorState(s => s === "hover" ? "hover-click" : "click"));
    window.addEventListener("mouseup", () => setCursorState(s => s === "hover-click" ? "hover" : "default"));
    document.addEventListener("mouseleave", () => setCursorState("hidden"));
    document.addEventListener("mouseenter", () => setCursorState("default"));
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      gsap.ticker.remove(tick);
    };
  });

  return () => ctx.revert();
}, []);

useEffect(() => {
  const dot = dotRef.current;
  const ring = ringRef.current;
  if (!dot || !ring) return;

  const states: Record<CursorState, () => void> = {
    default: () => {
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
    },
    hover: () => {
      gsap.to(dot, { scale: 0.4, opacity: 0.8, duration: 0.3 });
      gsap.to(ring, { scale: 2.2, opacity: 0.6, duration: 0.4 });
    },
    click: () => {
      gsap.to(dot, { scale: 0.6, duration: 0.1 });
      gsap.to(ring, { scale: 0.8, duration: 0.1 });
    },
    "hover-click": () => {
      gsap.to(dot, { scale: 0.2, duration: 0.1 });
      gsap.to(ring, { scale: 1.8, duration: 0.1 });
    },
    hidden: () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    },
  };

  states[cursorState]?.();
}, [cursorState]);

if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

return (
  <>
    <div ref={dotRef} className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform">
      <div className="w-3 h-3 rounded-full bg-white mix-blend-difference -translate-x-1/2 -translate-y-1/2" />
    </div>
    <div ref={ringRef} className="fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform">
      <div className="w-9 h-9 rounded-full border border-white mix-blend-difference -translate-x-1/2 -translate-y-1/2" />
    </div>
  </>
);
}