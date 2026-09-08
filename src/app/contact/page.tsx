import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import InquiryForm from "@/components/forms/InquiryForm";
import { siteConfig, isWhatsAppOrderingEnabled } from "@/lib/site-config";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/icons";
import { ArrowRightIcon } from "@/components/ui/icons";
import Link from "next/link";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact DOM126",
  description:
    "Questions about an order, a fragrance or the Custom Signature Perfume? Send DOM126 a message — every enquiry is answered personally.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const waLink = buildWhatsAppLink("Hello DOM126! I have a question.");

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to the house."
        description="Questions about a fragrance, an order or the Custom Signature experience? Send a message — every enquiry is answered personally by the DOM126 team."
      />

      <section className="section">
        <div className={`container ${styles.grid}`}>
          <Reveal>
            <div className={styles.formWrap}>
              <h2 className={styles.formTitle}>Send a message</h2>
              <InquiryForm type="contact" />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <aside className={styles.aside}>
              <h2 className={styles.asideTitle}>Other ways to reach us</h2>

              <div className={styles.channel}>
                <p className={styles.channelName}>WhatsApp</p>
                {isWhatsAppOrderingEnabled && waLink ? (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn btn--outline-dark ${styles.waButton}`}
                  >
                    <WhatsAppIcon size={17} /> Message DOM126
                  </a>
                ) : (
                  <p className={styles.channelNote}>
                    Our official WhatsApp line is coming soon — send a message
                    here and we will reach you.
                  </p>
                )}
              </div>

              <div className={styles.channel}>
                <p className={styles.channelName}>Email</p>
                {siteConfig.contactEmail ? (
                  <a className={styles.channelLink} href={`mailto:${siteConfig.contactEmail}`}>
                    {siteConfig.contactEmail}
                  </a>
                ) : (
                  <p className={styles.channelNote}>
                    A direct email address will be published once confirmed.
                  </p>
                )}
              </div>

              <div className={styles.channel}>
                <p className={styles.channelName}>Social</p>
                <p className={styles.channelNote}>
                  Official DOM126 channels (Instagram, Facebook, TikTok) are on
                  the way.
                </p>
              </div>

              <div className={styles.quickLinks}>
                <p className={styles.channelName}>Quick answers</p>
                <ul>
                  <li>
                    <Link href="/faq">
                      Frequently asked questions <ArrowRightIcon size={14} />
                    </Link>
                  </li>
                  <li>
                    <Link href="/shipping">
                      Shipping &amp; delivery <ArrowRightIcon size={14} />
                    </Link>
                  </li>
                  <li>
                    <Link href="/custom-signature">
                      The Custom Signature experience <ArrowRightIcon size={14} />
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
