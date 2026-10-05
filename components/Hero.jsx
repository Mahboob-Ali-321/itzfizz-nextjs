"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Car from "./Car";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["WELCOME", "ITZFIZZ"];
const STATS = [
  { value: 58, text: "Increase in pick up point use" },
  { value: 23, text: "Decrease in customer phone calls" },
  { value: 27, text: "Increase in pick up point use" },
  { value: 40, text: "Decrease in customer phone calls" },
];

export default function Hero() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const car = q(".car")[0];
      const letters = q(".letter");
      const stats = q(".stat");
      const wheels = q(".wheel");

      gsap.set(wheels, { transformOrigin: "50% 50%" });
      gsap.set(car, { x: () => -car.offsetWidth * 1.1 }); // start just off-screen left

      /* 1. Intro: letters stagger in, then stats one by one with a count-up */
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(letters, { yPercent: 60, opacity: 0, duration: 1, stagger: 0.06 })
        .from(stats, { y: 30, opacity: 0, duration: 0.8, stagger: 0.18 }, "-=0.4");

      q("[data-num]").forEach((el, i) => {
        const o = { v: 0 };
        intro.to(
          o,
          { v: +el.dataset.num, duration: 1.4, ease: "power2.out", onUpdate: () => (el.textContent = Math.round(o.v)) },
          1 + i * 0.18
        );
      });

      /* 2. Scroll: hero is pinned and every movement is scrubbed by scroll progress */
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=250%",
            pin: true,
            scrub: 1.2, // smoothing / interpolation
            invalidateOnRefresh: true,
          },
        })
        .to(car, { x: () => window.innerWidth + 40, ease: "power1.inOut", duration: 1 }, 0)
        .to(wheels, { rotation: 1080, duration: 1 }, 0)
        .to(".lane", { x: "-50%", duration: 1 }, 0)
        .to(".headline-wrap", { y: -40, scale: 1.12, duration: 1 }, 0)
        .to(letters, { opacity: 0.15, stagger: 0.03, duration: 0.4 }, 0.35)
        .to(".stats", { y: -30, opacity: 0, duration: 0.3 }, 0.7);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) intro.progress(1);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-screen overflow-hidden bg-gradient-to-b from-[#f1f6fa] to-sky">
      {/* Headline sits behind the car so the car drives in front of it */}
      <div className="headline-wrap absolute inset-x-0 top-[14vh] text-center will-change-transform">
        <h1
          aria-label="Welcome Itzfizz"
          className="flex flex-wrap justify-center gap-x-[0.8em] font-display text-[clamp(1.4rem,5.2vw,4.6rem)] font-bold tracking-[0.3em] sm:gap-x-[1.2em] sm:tracking-[0.45em]"
        >
          {WORDS.map((word) => (
            <span key={word} className="inline-flex" aria-hidden="true">
              {[...word].map((c, i) => (
                <span key={i} className="letter inline-block will-change-transform">{c}</span>
              ))}
            </span>
          ))}
        </h1>
      </div>

      <div className="stats absolute inset-x-0 top-[32vh] flex flex-wrap justify-center gap-x-8 gap-y-5 px-[5vw] sm:top-[36vh] sm:gap-x-[clamp(1.5rem,6vw,6rem)]">
        {STATS.map((s, i) => (
          <div key={i} className="stat max-w-[15ch]">
            <b className="block font-display text-[clamp(1.8rem,4vw,3.4rem)] font-medium leading-none">
              <span data-num={s.value}>0</span>%
            </b>
            <span className="mt-2 block text-[clamp(.8rem,1.1vw,1rem)] leading-snug opacity-75">{s.text}</span>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[17vh] bg-road">
        <div className="lane absolute left-0 top-1/2 -mt-[3px] h-[6px] w-[200%] will-change-transform" />
      </div>

      <div
        className="car absolute left-0 w-[clamp(260px,34vw,520px)] will-change-transform"
        style={{ bottom: "calc(17vh - 4.2vw)" }}
        aria-hidden="true"
      >
        <Car />
      </div>
    </section>
  );
}
