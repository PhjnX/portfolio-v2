/**
 * The gold line a `data-fx="rows"` row draws across its top as it enters (SectionFx).
 * Invisible at rest, so without JS the row's own border is all there is.
 * The row must be `relative`.
 */
export function FxLine() {
  return (
    <span
      data-fx-line
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left bg-gold opacity-0"
    />
  );
}
