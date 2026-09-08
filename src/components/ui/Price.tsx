import Naira from "./Naira";
import { formatPrice } from "@/lib/format";

interface PriceProps {
  /** Whole Naira amount, e.g. 54000 */
  value: number;
  className?: string;
}

/** Renders a DOM126 price, e.g. ₦54,000 (with a consistent naira glyph). */
export default function Price({ value, className = "" }: PriceProps) {
  return (
    <span className={`price ${className}`}>
      <Naira />
      <span>{formatPrice(value).slice(1)}</span>
    </span>
  );
}
