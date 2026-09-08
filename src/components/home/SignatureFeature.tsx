import Price from "@/components/ui/Price";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import Ornament from "@/components/ui/Ornament";
import styles from "./SignatureFeature.module.css";

const MEANS = [
  "Created for one person only — you",
  "Made to order, by request",
  "Shaped by your personality and your moments",
  "A scent no one else will ever own",
];

export default function SignatureFeature() {
  return (
    <section className={`section section--navy grain ${styles.section}`}>
      <div className={styles.bg} aria-hidden="true" />
      <div className="container">
        <div className={styles.grid}>
          <Reveal>
            <div>
              <p className={`eyebrow eyebrow--rule ${styles.eyebrow}`}>Custom Signature</p>
              <h2 className={`h2 ${styles.title}`}>
                Your scent.
                <br />
                <span className={styles.titleAccent}>Your identity.</span>
              </h2>
              <p className={styles.copy}>
                DOM126 offers a custom-made signature perfume created specifically
                for an individual, on request. It is not chosen from a shelf — it
                is composed around you: your character, your presence, the
                moments you live in.
              </p>
              <ul className={styles.means}>
                {MEANS.map((m) => (
                  <li key={m}>
                    <Ornament className={styles.meansOrnament} />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.actions}>
                <ButtonLink href="/custom-signature#request" variant="primary" arrow>
                  Request Your Signature Perfume
                </ButtonLink>
                <ButtonLink href="/custom-signature#process" variant="outline-light">
                  How It Works
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <aside className={styles.invitation} aria-label="Custom signature perfume details">
              <span className={styles.invitationFrame} aria-hidden="true" />
              <p className={styles.invitationEyebrow}>By Request Only</p>
              <p className={styles.invitationLine}>One fragrance. One person.</p>
              <div className={styles.invitationDivider} aria-hidden="true" />
              <Price value={98000} className={styles.invitationPrice} />
              <div className={styles.invitationChips}>
                <span className={styles.chip}>100ml</span>
                <span className={styles.chip}>Made to Order</span>
              </div>
              <p className={styles.invitationNote}>
                The Custom-Made Signature Perfume — an experience, not a product.
              </p>
              <a href="/custom-signature#request" className={`link-arrow ${styles.invitationLink}`}>
                Begin your request <ArrowRightIcon size={15} />
              </a>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
