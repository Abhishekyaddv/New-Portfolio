"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type CatState = "run" | "sit" | "sleep";

const SPEED = 7; // max px per frame
const STOP_DISTANCE = 46; // how close the cat sits next to the cursor
const SLEEP_AFTER = 5000; // ms of idle before it naps

// Only show the cat on devices with a real mouse
const FINE_POINTER = "(pointer: fine)";
function subscribePointer(onChange: () => void) {
  const mq = window.matchMedia(FINE_POINTER);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getPointerSnapshot = () => window.matchMedia(FINE_POINTER).matches;

export default function CatCursor() {
  const enabled = useSyncExternalStore(subscribePointer, getPointerSnapshot, () => false);
  const [state, setState] = useState<CatState>("sit");
  const [hearts, setHearts] = useState<number[]>([]);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const catRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const wrap = wrapRef.current;
    const cat = catRef.current;
    if (!wrap || !cat) return;

    const pos = { x: 40, y: window.innerHeight - 40 };
    const mouse = { x: pos.x, y: pos.y };
    let facing = 1;
    let lastActive = performance.now();
    let current: CatState = "sit";
    let raf = 0;

    const setCatState = (s: CatState) => {
      if (s !== current) {
        current = s;
        setState(s);
      }
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      lastActive = performance.now();
    };

    const onDown = () => {
      lastActive = performance.now();
      const id = Date.now() + Math.random();
      setHearts((h) => [...h, id]);
      setTimeout(() => setHearts((h) => h.filter((x) => x !== id)), 900);
      cat.classList.remove("cat-hop");
      void cat.offsetWidth; // restart animation
      cat.classList.add("cat-hop");
    };

    const tick = () => {
      // Only turn around once the pointer is clearly on the other side (prevents flip-flopping)
      const side = mouse.x - pos.x;
      if (side > 30) facing = 1;
      else if (side < -30) facing = -1;

      // Aim for a spot just below-left/right of the pointer so the cat never covers it
      const tx = mouse.x - facing * 26;
      const ty = mouse.y + 22;
      const dx = tx - pos.x;
      const dy = ty - pos.y;
      const dist = Math.hypot(dx, dy);

      if (dist > STOP_DISTANCE * 0.4) {
        const step = Math.min(SPEED, dist * 0.12);
        pos.x += (dx / dist) * step;
        pos.y += (dy / dist) * step;
        if (dist > STOP_DISTANCE * 0.6) {
          setCatState("run");
          lastActive = performance.now();
        }
      } else if (performance.now() - lastActive > SLEEP_AFTER) {
        setCatState("sleep");
      } else {
        setCatState("sit");
      }

      wrap.style.transform = `translate3d(${pos.x - 26}px, ${pos.y - 36}px, 0)`;
      cat.style.setProperty("--face", String(facing));
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <style>{catStyles}</style>
      <div
        ref={wrapRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform"
      >
        {/* Hearts on click */}
        {hearts.map((id) => (
          <span key={id} className="cat-heart">♥</span>
        ))}

        {/* Zzz while napping */}
        {state === "sleep" && (
          <div className="cat-zzz">
            <span>z</span>
            <span>z</span>
            <span>Z</span>
          </div>
        )}

        <div ref={catRef} className={`cat cat-${state}`}>
          <svg viewBox="0 0 64 48" width="52" height="39">
            {/* Tail */}
            <g className="cat-tail">
              <path d="M15 29 C 6 27, 3 17, 9 9" fill="none" stroke="#3b2414" strokeWidth="6" strokeLinecap="round" />
              <path d="M15 29 C 6 27, 3 17, 9 9" fill="none" stroke="#f4a14a" strokeWidth="3.6" strokeLinecap="round" />
            </g>

            {/* Back legs */}
            <g className="cat-leg cat-leg-a"><rect x="17" y="33" width="5" height="11" rx="2.5" fill="#f4a14a" stroke="#3b2414" strokeWidth="1.4" /></g>
            <g className="cat-leg cat-leg-b"><rect x="24" y="33" width="5" height="11" rx="2.5" fill="#e08a32" stroke="#3b2414" strokeWidth="1.4" /></g>
            {/* Front legs */}
            <g className="cat-leg cat-leg-b"><rect x="35" y="33" width="5" height="11" rx="2.5" fill="#e08a32" stroke="#3b2414" strokeWidth="1.4" /></g>
            <g className="cat-leg cat-leg-a"><rect x="41" y="33" width="5" height="11" rx="2.5" fill="#f4a14a" stroke="#3b2414" strokeWidth="1.4" /></g>

            {/* Body */}
            <g className="cat-body">
              <ellipse cx="30" cy="30" rx="17" ry="9.5" fill="#f4a14a" stroke="#3b2414" strokeWidth="1.6" />
              {/* Stripes */}
              <path d="M24 21.5 q2 4 0 7 M30 20.8 q2 4 0 7.5 M36 21.5 q2 4 0 7" fill="none" stroke="#c96f1f" strokeWidth="1.6" strokeLinecap="round" />
              {/* Belly */}
              <ellipse cx="32" cy="34" rx="9" ry="3.6" fill="#fde3c2" />

              {/* Head */}
              <g className="cat-head">
                <path d="M39 15 L40.5 3.5 L47.5 11 Z" fill="#f4a14a" stroke="#3b2414" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M49 11 L56 3.5 L57 15 Z" fill="#f4a14a" stroke="#3b2414" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M41.3 12 L41.8 7 L45 10.5 Z M51 10.5 L54.5 7 L55 12 Z" fill="#f6b8c4" />
                <circle cx="48" cy="20" r="10.5" fill="#f4a14a" stroke="#3b2414" strokeWidth="1.6" />
                <ellipse cx="50" cy="24" rx="5.5" ry="3.6" fill="#fde3c2" />

                {/* Eyes: open */}
                <g className="cat-eyes-open">
                  <ellipse cx="44.5" cy="18.5" rx="1.7" ry="2.2" fill="#1b1b1b" />
                  <ellipse cx="52.5" cy="18.5" rx="1.7" ry="2.2" fill="#1b1b1b" />
                  <circle cx="45" cy="17.8" r="0.6" fill="#fff" />
                  <circle cx="53" cy="17.8" r="0.6" fill="#fff" />
                </g>
                {/* Eyes: closed */}
                <g className="cat-eyes-closed" fill="none" stroke="#1b1b1b" strokeWidth="1.4" strokeLinecap="round">
                  <path d="M42.8 19 q1.7 1.6 3.4 0" />
                  <path d="M50.8 19 q1.7 1.6 3.4 0" />
                </g>

                {/* Nose + mouth */}
                <path d="M47.6 22.4 h2.4 l-1.2 1.4 z" fill="#e5677d" />
                <path d="M48.8 23.8 q-1 1.4 -2.2 0.6 M48.8 23.8 q1 1.4 2.2 0.6" fill="none" stroke="#3b2414" strokeWidth="0.9" strokeLinecap="round" />
                {/* Whiskers */}
                <path d="M55 23 h5 M55 25 l4.5 1.2 M42.5 23 h-4.5 M42.5 25 l-4 1.2" stroke="#3b2414" strokeWidth="0.7" strokeLinecap="round" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}

const catStyles = `
.cat {
  --face: 1;
  transform: scaleX(var(--face));
  transform-origin: 50% 100%;
  filter: drop-shadow(0 3px 3px rgba(0,0,0,.25));
}
.cat svg { overflow: visible; display: block; }

.cat .cat-leg { transform-box: fill-box; transform-origin: 50% 0%; }
.cat .cat-tail { transform-box: view-box; transform-origin: 15px 29px; }
.cat .cat-head { transform-box: view-box; transform-origin: 44px 28px; }
.cat .cat-eyes-closed { display: none; }

/* Running: legs scissor, body bobs, tail streams back */
.cat-run .cat-leg-a { animation: cat-leg .22s ease-in-out infinite alternate; }
.cat-run .cat-leg-b { animation: cat-leg .22s ease-in-out infinite alternate-reverse; }
.cat-run .cat-body { animation: cat-bob .22s ease-in-out infinite alternate; }
.cat-run .cat-tail { transform: rotate(-35deg); }

/* Sitting: tail wags, head tilts now and then */
.cat-sit .cat-tail { animation: cat-wag 1.1s ease-in-out infinite; }
.cat-sit .cat-head { animation: cat-tilt 4s ease-in-out infinite; }

/* Sleeping: eyes closed, slow breathing, tail curled down */
.cat-sleep .cat-eyes-open { display: none; }
.cat-sleep .cat-eyes-closed { display: inline; }
.cat-sleep .cat-body { animation: cat-breathe 2.4s ease-in-out infinite; transform-box: fill-box; transform-origin: 50% 100%; }
.cat-sleep .cat-head { transform: rotate(14deg) translateY(4px); }
.cat-sleep .cat-tail { transform: rotate(-70deg); }

.cat-hop { animation: cat-hop .45s cubic-bezier(.3,1.6,.5,1); }

@keyframes cat-leg  { from { transform: rotate(-28deg); } to { transform: rotate(28deg); } }
@keyframes cat-bob  { from { transform: translateY(0); } to { transform: translateY(-1.6px); } }
@keyframes cat-wag  { 0%,100% { transform: rotate(-8deg); } 50% { transform: rotate(14deg); } }
@keyframes cat-tilt { 0%,70%,100% { transform: rotate(0); } 80%,90% { transform: rotate(-9deg); } }
@keyframes cat-breathe { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(.94); } }
@keyframes cat-hop {
  0%   { transform: scaleX(var(--face)) translateY(0); }
  40%  { transform: scaleX(var(--face)) translateY(-18px) rotate(calc(var(--face) * -8deg)); }
  100% { transform: scaleX(var(--face)) translateY(0); }
}

.cat-heart {
  position: absolute; left: 24px; top: -6px;
  color: #f43f5e; font-size: 16px; line-height: 1;
  animation: cat-heart .9s ease-out forwards;
}
@keyframes cat-heart {
  0%   { opacity: 0; transform: translateY(6px) scale(.4); }
  25%  { opacity: 1; transform: translateY(-4px) scale(1.15); }
  100% { opacity: 0; transform: translateY(-30px) scale(.9); }
}

.cat-zzz { position: absolute; left: 34px; top: -14px; font-weight: 700; color: #94a3b8; font-family: ui-monospace, monospace; }
.cat-zzz span { position: absolute; opacity: 0; animation: cat-z 2.4s ease-out infinite; }
.cat-zzz span:nth-child(1) { font-size: 10px; animation-delay: 0s; }
.cat-zzz span:nth-child(2) { font-size: 12px; animation-delay: .8s; }
.cat-zzz span:nth-child(3) { font-size: 15px; animation-delay: 1.6s; }
@keyframes cat-z {
  0%   { opacity: 0; transform: translate(0, 0); }
  20%  { opacity: 1; }
  100% { opacity: 0; transform: translate(12px, -22px); }
}

@media (prefers-reduced-motion: reduce) {
  .cat *, .cat, .cat-zzz span, .cat-heart { animation: none !important; }
}
`;
