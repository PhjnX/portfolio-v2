import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

// Internal page to check tokens + Vietnamese rendering. Not linked from the site.
export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const swatches = [
  { name: "bg", className: "bg-bg" },
  { name: "surface", className: "bg-surface" },
  { name: "surface-2", className: "bg-surface-2" },
  { name: "line", className: "bg-line" },
  { name: "ink", className: "bg-ink" },
  { name: "ink-muted", className: "bg-ink-muted" },
  { name: "gold", className: "bg-gold" },
  { name: "ember", className: "bg-ember" },
  { name: "violet", className: "bg-violet" },
];

export default function StyleguidePage() {
  return (
    <main className="py-24">
      <Container className="space-y-24">
        <section className="space-y-6">
          <SectionLabel index="00" label="Design tokens" />
          <h1 className="font-heading text-display-xl">
            Bùi Hoàng
            <br />
            <span className="text-gold">Phi</span>
          </h1>
          <p className="max-w-xl text-lg text-ink-muted">
            Kiểm tra hiển thị tiếng Việt: Ồ, Ấ, Ữ, Ỳ, Ặ — chữ hoa có dấu không được bị cắt.
          </p>
        </section>

        <section className="space-y-6">
          <SectionLabel index="01" label="Type scale" />
          <p className="font-heading text-display-lg">
            Thoughtfully built,
            <br />
            <span className="text-ink-faint">robust by design.</span>
          </p>
          <p className="font-heading text-display-md">Thiết kế vững chắc</p>
        </section>

        <section className="space-y-6">
          <SectionLabel index="02" label="Colors" />
          <ul className="grid grid-cols-3 gap-4 md:grid-cols-9">
            {swatches.map((s) => (
              <li key={s.name} className="space-y-2">
                <div className={`${s.className} aspect-square rounded-md border border-line`} />
                <p className="font-mono text-xs text-ink-muted">{s.name}</p>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </main>
  );
}
