import Link from "next/link";
import type { ReactNode, MouseEventHandler } from "react";
import { ArrowRightIcon } from "./icons";

type Variant = "primary" | "outline-light" | "outline-dark";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  full?: boolean;
}

function classes(variant: Variant, className: string, full?: boolean) {
  return `btn btn--${variant}${full ? " btn--full" : ""}${className ? ` ${className}` : ""}`;
}

function Inner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      {children}
      {arrow ? <ArrowRightIcon size={16} className="btn-arrow" /> : null}
    </>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  arrow,
  onClick,
  ...rest
}: BaseProps & {
  href: string;
  prefetch?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <Link
      href={href}
      className={classes(variant, className)}
      onClick={onClick}
      {...rest}
    >
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  );
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  arrow,
  full,
  type = "button",
  onClick,
  disabled,
  ariaLabel,
}: BaseProps & {
  type?: "button" | "submit";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes(variant, className, full)}
    >
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}
