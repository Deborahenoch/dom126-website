/** Small diamond ornament used as an elegant list/section separator. */
export default function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M5 0.6 9.4 5 5 9.4 0.6 5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
