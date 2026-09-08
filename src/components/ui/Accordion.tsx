"use client";

import { useState } from "react";
import { ChevronDownIcon } from "./icons";
import type { FaqItem } from "@/lib/faq";
import styles from "./Accordion.module.css";

interface AccordionProps {
  items: FaqItem[];
  /** Unique id prefix (needed when several accordions exist on one page). */
  idPrefix: string;
}

/** Accessible animated accordion (button + region pattern). */
export default function Accordion({ items, idPrefix }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className={styles.accordion}>
      {items.map((item, i) => {
        const expanded = open === i;
        const btnId = `${idPrefix}-btn-${i}`;
        const panelId = `${idPrefix}-panel-${i}`;
        return (
          <div key={item.question} className={styles.item} data-open={expanded}>
            <h3 className={styles.heading}>
              <button
                type="button"
                id={btnId}
                className={styles.trigger}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
              >
                <span>{item.question}</span>
                <ChevronDownIcon size={18} className={styles.chevron} />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={styles.panel}
            >
              <div className={styles.panelInner}>
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
