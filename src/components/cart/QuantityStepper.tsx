"use client";

import { MinusIcon, PlusIcon } from "@/components/ui/icons";
import styles from "./QuantityStepper.module.css";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  min?: number;
  max?: number;
}

/** Accessible quantity control with comfortable touch targets. */
export default function QuantityStepper({
  value,
  onChange,
  label = "Quantity",
  min = 1,
  max = 99,
}: QuantityStepperProps) {
  const lower = label.charAt(0).toLowerCase() + label.slice(1);
  return (
    <div className={styles.group} role="group" aria-label={label}>
      <button
        type="button"
        className={styles.btn}
        aria-label={`Decrease ${lower}`}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <MinusIcon size={16} />
      </button>
      <span className={styles.value} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={styles.btn}
        aria-label={`Increase ${lower}`}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <PlusIcon size={16} />
      </button>
    </div>
  );
}
