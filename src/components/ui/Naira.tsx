/**
 * Naira sign as an inline SVG glyph.
 * The brand fonts do not ship the ₦ (U+20A6) character, so we draw it —
 * guaranteeing a crisp, consistent naira sign on every device.
 * The glyph scales with the surrounding font size.
 */
export default function Naira({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`naira ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" strokeWidth="11" strokeLinecap="butt" fill="none">
        <path d="M27 14v72" />
        <path d="M73 14v72" />
        <path d="M27 18l46 68" />
        <path d="M14 36h72" />
        <path d="M14 64h72" />
      </g>
    </svg>
  );
}
