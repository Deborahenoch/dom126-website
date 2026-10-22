import type { Metadata } from "next";
import FormulaVault from "@/components/atlas/FormulaVault";
import styles from "../atlas.module.css";

export const metadata: Metadata = {
  title: "Formula Vault",
  description:
    "Store, retrieve, scale and reproduce perfume formulas. Batch weights, layer balance, allergen declarations, compliance flags, formula comparison and printable sheets — saved privately in your own browser.",
};

export default function VaultPage() {
  return (
    <>
      <header className={styles.head}>
        <div className={`container-wide ${styles.headInner}`}>
          <span className={`eyebrow eyebrow--rule ${styles.headEyebrow}`}>Formula vault</span>
          <h1 className={styles.headTitle}>Store it. Retrieve it. Weigh it out again.</h1>
          <p className={styles.headLead}>
            A formula is only useful if you can compound from it six months later, at a different
            batch size, in a different concentration, and still get the same perfume. The vault
            stores compositions on your own device and converts them into everything the bench
            actually needs: gram weights per material, dilution advice for the ones too small to
            weigh, the layer balance, the EU allergen declaration, compliance flags, and a
            comparison against another formula when you are matching a target.
          </p>
        </div>
      </header>

      <FormulaVault />

      <div className={`container-wide`} style={{ paddingBottom: "3rem" }}>
        <div className={styles.footerNote}>
          <strong>Where your formulas live.</strong> Everything in the vault is stored in this
          browser&apos;s local storage and nowhere else — there is no account, no server, and
          nothing leaves your device. That is deliberate: a formula is the most commercially
          sensitive document a fragrance house owns. The trade-off is that formulas do not follow
          you between devices or browsers, and browser storage can be cleared without warning.
          Use <em>Back up all</em> regularly and keep the JSON somewhere safe. Importing that file
          on another device restores everything.
          <br />
          <br />
          <strong>Moving to shared storage later.</strong> The data shapes are already API-ready.
          Adding <code>src/app/api/formulas/route.ts</code> and swapping the persistence functions
          in <code>VaultProvider.tsx</code> is the whole change — no calculation code moves, because
          the maths in <code>src/lib/perfumery/formula.ts</code> is pure and storage-agnostic.
        </div>
      </div>
    </>
  );
}
