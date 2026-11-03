"use client";

import { useTextReveal, type TextRevealOptions } from "@/hooks/use-text-reveal";

type RevealTextProps = React.ComponentProps<"h2"> &
  TextRevealOptions & {
    as?: "h1" | "h2" | "h3" | "p";
  };

/** Drop-in heading/paragraph with the scroll reveal, usable from Server Components. */
export function RevealText({ as: Tag = "p", split, trigger, delay, ...props }: RevealTextProps) {
  const ref = useTextReveal<HTMLHeadingElement>({ split, trigger, delay });

  return <Tag ref={ref} data-reveal="" {...props} />;
}
