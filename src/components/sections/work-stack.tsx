"use client";

import Image from "next/image";
import { useRef } from "react";

import { projects } from "@/config/projects";
import type { Dictionary } from "@/i18n/get-dictionary";
import { gsap, useGSAP } from "@/lib/gsap";

type WorkStackProps = {
  copy: Dictionary["work"];
};

/** Where a card sits when it is `depth` cards behind the front one. */
function slot(depth: number) {
  return {
    y: depth * -28,
    scale: 1 - depth * 0.07,
    rotation: depth === 0 ? 0 : (depth % 2 ? 1 : -1) * (2 + depth),
    filter: `brightness(${1 - depth * 0.18})`,
    autoAlpha: depth > 3 ? 0 : 1,
    zIndex: projects.length - depth,
  };
}

/**
 * Selected work as a pile of record-sleeve cards. On desktop the section pins
 * and each scroll step throws the front card off the pile while the next one
 * moves up and its details fade in.
 *
 * The list is the default layout. JS adds `data-stacked` only when the pinned
 * version runs (md+, motion allowed), and the overlap is pure CSS keyed off
 * that attribute — so no JS, mobile and reduced motion all get a plain list.
 */
export function WorkStack({ copy }: WorkStackProps) {
  const root = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const list = root.current;
      if (!list) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        list.dataset.stacked = "";
        const covers = gsap.utils.toArray<HTMLElement>("[data-cover]");
        const details = gsap.utils.toArray<HTMLElement>("[data-details]");
        const steps = projects.length - 1;

        covers.forEach((cover, i) => gsap.set(cover, slot(i)));
        gsap.set(details.slice(1), { autoAlpha: 0, y: 40 });

        // No ScrollTrigger snap: it fights Lenis for the scroll position.
        // Instead each step is 1 unit of scroll with a short hold on both
        // sides, so stopping anywhere usually lands on a settled project.
        const HOLD = 0.15;
        const MOVE = 1 - HOLD * 2;

        const tl = gsap.timeline({
          defaults: { duration: MOVE, ease: "power2.inOut" },
          scrollTrigger: {
            trigger: list,
            start: "center center",
            end: `+=${steps * 100}%`,
            pin: true,
            scrub: 0.8,
          },
        });

        for (let step = 0; step < steps; step++) {
          const at = step + HOLD;
          // Front card flies up and off the pile
          tl.to(covers[step], { yPercent: -140, rotation: -14, autoAlpha: 0 }, at);
          // Everything behind it moves one place forward
          covers.slice(step + 1).forEach((cover, depth) => tl.to(cover, slot(depth), at));
          tl.to(details[step], { autoAlpha: 0, y: -40, duration: MOVE / 2 }, at).to(
            details[step + 1],
            { autoAlpha: 1, y: 0, duration: MOVE / 2 },
            at + MOVE / 2,
          );
        }
        // Trailing hold so the last project rests before the pin releases
        tl.to({}, { duration: HOLD });

        return () => delete list.dataset.stacked;
      });
    },
    { scope: root },
  );

  return (
    <ol
      ref={root}
      className="group space-y-20 pt-8 data-stacked:grid data-stacked:h-[calc(100svh-10rem)] data-stacked:items-center data-stacked:space-y-0 md:pt-16"
    >
      {projects.map((project, i) => {
        const text = copy.projects[project.slug];
        const number = `${String(i + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;

        return (
          <li
            key={project.slug}
            className="grid items-center gap-8 group-data-stacked:[grid-area:1/1] md:grid-cols-[7fr_5fr] md:gap-16"
          >
            {/* Cover: decorative, the details column carries the same info */}
            <div
              data-cover
              // Phones: opens from the bottom as it scrolls in (SectionFx); desktop has the stack
              data-fx="cover"
              aria-hidden
              className="relative flex aspect-16/10 w-full flex-col justify-between overflow-hidden rounded-2xl p-5 shadow-2xl ring-1 shadow-black/60 ring-white/10 md:p-7"
              style={{ backgroundColor: project.accent }}
            >
              {project.image ? (
                // Full-bleed screenshot with nothing on top: the cover is the product itself
                <Image
                  src={project.image}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 55vw, 100vw"
                  className="object-cover object-top"
                />
              ) : (
                // No screenshot yet: colour and monogram, like a printed sleeve
                <>
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_0%,rgb(255_255_255/0.18),transparent_60%)]" />
                  <p className="relative font-mono text-xs tracking-[0.2em] text-ink/80 uppercase">
                    {project.title}
                  </p>
                  <p className="relative font-heading text-[clamp(4rem,9vw,8rem)] leading-none text-ink">
                    {project.monogram}
                  </p>
                </>
              )}
            </div>

            <article data-details className="space-y-6">
              <p className="font-mono text-xs tracking-[0.2em] text-ink-muted uppercase">
                <span className="text-ink-muted">{number}</span>
                <span className="mx-2 text-ink-faint">·</span>
                <span className="text-gold">{copy.kinds[project.kind]}</span>
                <span className="mx-2 text-ink-faint">/</span>
                {text.period}
              </p>
              <h3 className="font-heading text-display-md">{project.title}</h3>
              <p className="max-w-lg text-ink-muted md:text-lg">{text.summary}</p>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-line px-3 py-1 font-mono text-xs text-ink-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              {project.links.length > 0 && (
                <ul className="flex flex-wrap gap-6">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs tracking-[0.2em] text-ink uppercase underline decoration-gold underline-offset-8 transition-colors hover:text-gold"
                      >
                        {copy.links[link.kind]} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </li>
        );
      })}
    </ol>
  );
}
