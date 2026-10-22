import type { Metadata } from "next";
import Link from "next/link";
import {
  families,
  edwardsWheel,
  ellenaOdorFields,
  ellenaForms,
  tactileVocabulary,
  carlesTriangle,
  concentrations,
  ellenaDoseScale,
} from "@/lib/perfumery/families";
import { getMaterial } from "@/lib/perfumery/materials";
import styles from "../atlas.module.css";

export const metadata: Metadata = {
  title: "Families & Structure",
  description:
    "The SFP seven families, Edwards' fragrance wheel, Ellena's nine odour fields, the Carles structural triangle against the modern minimal structure, concentration classes and the perfumer's dose ladder.",
};

export default function FamiliesPage() {
  return (
    <>
      <header className={styles.head}>
        <div className={`container-wide ${styles.headInner}`}>
          <span className={`eyebrow eyebrow--rule ${styles.headEyebrow}`}>Families &amp; structure</span>
          <h1 className={styles.headTitle}>How perfumes are classified, and how they are built</h1>
          <p className={styles.headLead}>
            Three classification systems are kept side by side because they answer different
            questions and disagree usefully. The SFP seven families describe <em>structure</em> —
            which accord carries the composition. Edwards&apos; wheel describes{" "}
            <em>character</em> for a shopper. Ellena&apos;s nine odour fields describe{" "}
            <em>individual materials</em>, not finished perfumes, and each field names the molecules
            that define it, which is the genuinely useful part.
          </p>
        </div>
      </header>

      {/* ---------------- SFP families ---------------- */}
      <section className={`container-wide ${styles.section}`}>
        <div className={styles.sectionHead}>
          <span className={`eyebrow eyebrow--rule ${styles.sectionEyebrow}`}>
            Société Française des Parfumeurs · 1984, revised 1990
          </span>
          <h2 className="h3">The seven families</h2>
          <p className={styles.sectionLead}>
            The industry benchmark. The 1984 classification covered women&apos;s perfumes in five
            families — floral, chypre, fougère, amber and leather. The 1990 revision added men&apos;s
            fragrances and two new families, the Hesperides and Woods, each with sub-families.
            Families are defined through structures accepted by most perfumers, based on a standard
            association of materials.
          </p>
        </div>

        <div className={`${styles.grid} ${styles.grid2}`}>
          {families.map((f) => (
            <article key={f.id} id={f.id} className={styles.card} style={{ scrollMarginTop: "5rem" }}>
              <span className={styles.cardMeta}>
                {f.french} · anchor {f.anchor.name}, {f.anchor.house} {f.anchor.year}
              </span>
              <h3 className={styles.cardTitle}>{f.name}</h3>
              <p className={styles.cardBody}>{f.signature}</p>

              <div>
                <span className={styles.label}>Key materials</span>
                <div className={styles.pills} style={{ marginTop: "0.4rem" }}>
                  {f.keyMaterials.map((id) => {
                    const m = getMaterial(id);
                    return (
                      <Link key={id} href={`/atlas/materials`} className={`${styles.pill} ${styles.pillGold}`}>
                        {m?.name ?? id}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className={styles.label}>Sub-families</span>
                <ul className={styles.prose} style={{ marginTop: "0.4rem", paddingLeft: "1.1rem", listStyle: "disc" }}>
                  {f.subfamilies.map((s) => (
                    <li key={s.name}>
                      <strong>{s.name}</strong> — {s.character}
                    </li>
                  ))}
                </ul>
              </div>

              <p className={styles.hint}>{f.history}</p>
            </article>
          ))}
        </div>

        <div className={`${styles.callout} ${styles.calloutDark}`} style={{ marginTop: "1.4rem" }}>
          <span className={styles.calloutTitle}>A committee member&apos;s objection</span>
          <div className={styles.calloutBody}>
            <p>
              Ellena sat on the SFP classification committee and came to doubt the utility of the
              thing he helped make. His argument: few people reading a definition of this kind can
              form any idea of the odour of &ldquo;fougère,&rdquo; because they are not familiar
              with the smell of each material and cannot imagine the combination. All classification
              is subjective, perhaps entirely personal.
            </p>
            <p>
              He is right, and it is still worth using the families — but for what they actually
              give you, which is a <em>bill of materials</em>. &ldquo;Chypre&rdquo; does not
              communicate a smell to a layperson; it does tell a perfumer to reach for bergamot,
              oakmoss, labdanum and patchouli. Treat every family name on this page as a shopping
              list and an architecture, never as a description.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- Edwards ---------------- */}
      <section className={`container-wide ${styles.section}`}>
        <div className={styles.sectionHead}>
          <span className={`eyebrow eyebrow--rule ${styles.sectionEyebrow}`}>Michael Edwards · 1983, updated</span>
          <h2 className="h3">The Fragrance Wheel</h2>
          <p className={styles.sectionLead}>
            Four groups, fourteen families, arranged so that adjacent families share character and
            blend easily. A shopping and briefing tool rather than a formulation tool — but the one
            most customers and retailers will use when they talk to you.
          </p>
        </div>
        <div className={`${styles.grid} ${styles.grid4}`}>
          {edwardsWheel.groups.map((g) => (
            <div key={g.name} className={styles.card}>
              <h3 className={styles.cardTitle}>{g.name}</h3>
              <div className={styles.pills}>
                {g.families.map((f) => <span key={f} className={styles.pill}>{f}</span>)}
              </div>
              {g.note && <p className={styles.hint}>{g.note}</p>}
            </div>
          ))}
        </div>
        <p className={styles.hint} style={{ marginTop: "0.9rem" }}>
          {edwardsWheel.note} Retail taxonomies such as Fragrantica&apos;s perfume groups sit closer
          to this scheme than to the SFP&apos;s, and are organised for browsing rather than for
          building.
        </p>
      </section>

      {/* ---------------- Ellena fields ---------------- */}
      <section className={`container-wide ${styles.section}`}>
        <div className={styles.sectionHead}>
          <span className={`eyebrow eyebrow--rule ${styles.sectionEyebrow}`}>Ellena · nine odour fields</span>
          <h2 className="h3">Classifying materials, not perfumes</h2>
          <p className={styles.sectionLead}>
            This is the system to learn first, because each field names the molecule or molecules
            that <em>define</em> it. Once you know that white flowers are defined by methyl
            anthranilate plus indole, you know what to reach for — and you also know why orange
            flower, jasmine, tuberose, sweet pea, gardenia and honeysuckle all sit in one group
            despite smelling nothing alike.
          </p>
        </div>
        <div className={`${styles.grid} ${styles.grid3}`}>
          {ellenaOdorFields.map((f) => (
            <div key={f.id} className={styles.card}>
              <h3 className={styles.cardTitle}>{f.name}</h3>
              <div style={{ display: "grid", gap: "0.7rem" }}>
                {f.subgroups.map((s) => (
                  <div key={s.name}>
                    <strong style={{ fontSize: "0.9rem" }}>{s.name}</strong>
                    <p className={styles.hint} style={{ fontSize: "0.85rem" }}>
                      <em>Defined by:</em> {s.definedBy}
                      <br />
                      <em>Examples:</em> {s.examples}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`${styles.grid} ${styles.grid2}`} style={{ marginTop: "1.4rem" }}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>The touch vocabulary</h3>
            <p className={styles.cardBody}>
              A second, orthogonal system for identifying odours: describing them with words borrowed
              from another sense, particularly touch. Useful because it gives a beginner a vocabulary
              that does not depend on having smelled anything yet, and because it makes
              &ldquo;odour&rdquo; easier to hold in the mind as an object.
            </p>
            <div className={styles.pills}>
              {tactileVocabulary.map((w) => <span key={w} className={`${styles.pill} ${styles.pillGold}`}>{w}</span>)}
            </div>
            <p className={styles.hint}>
              The professional&apos;s vocabulary differs from the layperson&apos;s in one specific
              way: for a perfumer, &ldquo;jasmine&rdquo; refers to an olfactory experience that can
              be very different from the fragrance given off by jasmine flowers. A lily of the valley
              can be described as &ldquo;jasmine,&rdquo; and so can a fragrance, a washing powder and
              a soap. The word describes the odour, not the object producing it. The perfumer thus
              invents the object of his science.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Classification by form</h3>
            <p className={styles.cardBody}>
              Because material-based classification does not communicate, Ellena proposes a personal
              typology in which perfumes are defined by their <em>form</em> — the way they are
              perceived — rather than by their constituent materials. They can all be combined.
            </p>
            <div style={{ display: "grid", gap: "0.6rem" }}>
              {ellenaForms.map((f) => (
                <div key={f.name}>
                  <strong style={{ fontSize: "0.9rem" }}>{f.name}</strong>
                  <p className={styles.hint} style={{ fontSize: "0.85rem" }}>{f.character}</p>
                </div>
              ))}
            </div>
            <p className={styles.hint}>
              Note there are no &ldquo;moderns&rdquo; in this list. &ldquo;Modern&rdquo; does not
              refer to a form of perfume but to a transitory state — the baroque was modern in its
              time, and only the passage of time gives boundaries to a form of expression.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- Structure ---------------- */}
      <section className={`container-wide ${styles.section}`}>
        <div className={styles.sectionHead}>
          <span className={`eyebrow eyebrow--rule ${styles.sectionEyebrow}`}>Structure</span>
          <h2 className="h3">Two competing architectures</h2>
        </div>

        <div className={`${styles.grid} ${styles.grid2}`}>
          <div className={styles.card}>
            <span className={styles.cardMeta}>Jean Carles · the classical structure</span>
            <h3 className={styles.cardTitle}>The triangle</h3>
            <p className={styles.cardBody}>{carlesTriangle.note.split("(2)")[0]}</p>
            <div style={{ display: "grid", gap: "0.6rem" }}>
              {[carlesTriangle.top, carlesTriangle.heart, carlesTriangle.base].map((l) => (
                <div key={l.label}>
                  <strong style={{ fontSize: "0.9rem" }}>{l.label}</strong>
                  <span className={`${styles.pill} ${styles.pillGold}`} style={{ marginLeft: "0.5rem" }}>{l.share}</span>
                  <p className={styles.hint} style={{ fontSize: "0.85rem" }}>{l.role}</p>
                </div>
              ))}
            </div>
            <p className={styles.hint}>
              Carles constructed perfumes on a basis of carefully selected empirical accords within a
              structure formulated around a base note of low-volatility materials, a middle or
              modifying note of medium volatility, and a top note of the greatest volatility. Canoe,
              Ma Griffe, L&apos;Air du Temps and Cabochard all reflect this structure, and all have a
              transparency of texture — an almost three-dimensional quality that seems to lead you
              into the heart of the fragrance.
            </p>
            <p className={styles.hint}>
              <strong>The proportions are not a rule.</strong> The triangle&apos;s ratios apply to a
              compound to be diluted in alcohol at 12–18%. Because of the effect of the alcohol
              itself, the optimum dosage is not the same for every compound and must be established
              by trial and error. In men&apos;s fragrances, usually diluted lower, there is
              frequently a much higher proportion of top notes.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.cardMeta}>Sophia Grojsman · the modern structure</span>
            <h3 className={styles.cardTitle}>The monolith</h3>
            <p className={styles.cardBody}>
              Over the past few decades there has been a gradual move away from the layered style
              toward perfumes based on a quite different structure. In this, comparatively few
              materials — sometimes as few as four or five — are used in a simple accord which
              represents up to 80% of the formula. Around that simple structure are arranged other
              materials including bases and naturals, which provide the richness and complexity
              needed to complete the identity.
            </p>
            <p className={styles.cardBody}>
              Perfumes built this way may lack something of the aesthetic quality of earlier work,
              but they have the advantage of remaining more or less unchanged in odour from initial
              impact until many hours on the skin. Frequently the traditional fresh top note is
              missing entirely, replaced by trace amounts of intensely powerful materials, so the
              essential character comes through immediately on application rather than after the top
              notes evaporate. That is an important requirement for a perfume that has to be chosen
              from among many others in a busy department store or airport.
            </p>
            <div className={styles.callout}>
              <span className={styles.calloutTitle}>The textbook case</span>
              <div className={styles.calloutBody}>
                Trésor, in which roughly 80% of the formula is four ingredients: methyl ionone,
                Iso E Super, Hedione and Galaxolide — all materials that lend themselves
                particularly well to this type of formulation. Grojsman described the process as
                being like the coming together of the squares of a Rubik&apos;s cube.
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.callout} ${styles.calloutDark}`} style={{ marginTop: "1.4rem" }}>
          <span className={styles.calloutTitle}>On the accord itself</span>
          <div className={styles.calloutBody}>
            <p>
              The most useful exercise a student can do: take two materials of similar volatility and
              blend them in every proportion from 9:1 through to 1:9, then select the mixture that
              seems most pleasing — usually the one in which both are smelled at equal intensity, so
              that neither predominates. Sometimes nothing interesting happens. Occasionally
              something remarkable does: the mixture takes on a character of its own, distinct from
              its component parts.
            </p>
            <p>
              Such accords — patchouli with hydroxycitronellal, eugenol with benzyl salicylate — are
              used over and over again, and have the remarkable ability to retain their character
              inside complicated blends. The most successful accords, whether in floral bases or in
              the great perfumes, seem virtually indestructible wherever they occur.
            </p>
            <p>
              Carles recommended systematic study of important materials by combining them with a
              great variety of others in mathematical proportions — 1:1:1, 3:1:1, 3:3:1 — before
              letting inspiration select and modify the final accord. He claimed to have run over a
              thousand such experiments with oakmoss alone. But it is a mistake, when creating a
              finished perfume, to be bound too rigidly by those proportions, because adding further
              materials may require modifying the original balance. Arturo Jordi-Pey called perfumery
              &ldquo;the art of the intuitive accord,&rdquo; and the reason we cannot do better than
              that phrase is honest: nobody knows exactly what causes the synergism. Materials
              working together in a finely balanced accord produce an olfactory resonance as
              satisfying to the smell as a perfectly balanced orchestra is to the ears.
            </p>
          </div>
        </div>

        <div className={styles.card} style={{ marginTop: "1.4rem" }}>
          <h3 className={styles.cardTitle}>Placing materials by volatility</h3>
          <p className={styles.cardBody}>
            The division into top, middle and base is somewhat arbitrary, and perfumers genuinely
            disagree. Helmut Führer (1970) placed benzyl salicylate and methyl ionone among the top
            notes; Carles — rightly, in Calkin &amp; Jellinek&apos;s view — includes them among the
            base notes. Benzyl salicylate&apos;s odd placement may be explained by its apparent
            weakness of odour once trace impurities have evaporated. Methyl ionone sits near the top
            of the base notes, working in many perfumes as a bridge to the middle notes.
          </p>
          <div className={`${styles.grid} ${styles.grid3}`}>
            <div>
              <span className={styles.label}>Top notes</span>
              <p className={styles.hint}>
                Citrus oils, linalool, linalyl acetate, lavender, and the modern materials
                dihydromyrcenol, rose oxide and cis-3-hexenol.
              </p>
            </div>
            <div>
              <span className={styles.label}>Middle notes</span>
              <p className={styles.hint}>
                The majority of floral notes: terpineol, the rose alcohols, and many of the most
                important chemicals used in compounding muguet and jasmine. Eugenol sits near the
                bottom of the middle notes, as do the amyl and hexyl cinnamic aldehydes — often more
                conveniently thought of as base notes.
              </p>
            </div>
            <div>
              <span className={styles.label}>Base notes</span>
              <p className={styles.hint}>
                Undisputed: oakmoss, patchouli, most woody materials, the musks, and vanillin.
                Naturals are hard to place because their constituents vary in volatility; the
                convention is to consider only the tenacity of the most characteristic note. Ylang
                contains constituents working throughout the whole evaporation.
              </p>
            </div>
          </div>
          <p className={styles.hint}>
            Retention times on a carbowax-type polar GC column give a fair indication of relative
            volatility within a compound — but most perfumers develop their own way of thinking about
            volatility from personal experience, and too scientific an approach can mislead. In
            Carles&apos;s words, the student will soon attain unexpected proficiency by forgetting
            any technical information he may have, and by establishing his own classification for
            himself.
          </p>
        </div>
      </section>

      {/* ---------------- Concentrations ---------------- */}
      <section className={`container-wide ${styles.section}`}>
        <div className={styles.sectionHead}>
          <span className={`eyebrow eyebrow--rule ${styles.sectionEyebrow}`}>Concentration</span>
          <h2 className="h3">Dilution classes</h2>
          <p className={styles.sectionLead}>
            Concentration still determines choice, and taste varies by region: Asia and Japan
            particularly favour low concentrations so as not to mask the odour of the skin; the
            United States prefers strong concentrations that do; northern European taste resembles
            the US, southern European taste is moderate and enhances the skin&apos;s natural odour.
          </p>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Class</th>
                <th scope="col" className={styles.num}>Range</th>
                <th scope="col" className={styles.num}>Vault default</th>
                <th scope="col">Note</th>
              </tr>
            </thead>
            <tbody>
              {concentrations.map((c) => (
                <tr key={c.id}>
                  <td><strong>{c.label}</strong></td>
                  <td className={`${styles.num} ${styles.mono}`}>{c.min}–{c.max}%</td>
                  <td className={`${styles.num} ${styles.mono}`}>{c.typical}%</td>
                  <td className={styles.hint}>{c.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={styles.hint} style={{ marginTop: "0.9rem" }}>
          Note the terminology trap: &ldquo;cologne&rdquo; in the United States is equivalent to eau
          de toilette in Europe. And most perfumes exist in more than one form, frequently based on
          rather different formulas from the original — more modern and less expensive ingredients
          used to recreate the same idea in a way that is more commercial and more suitable to the
          lower concentration.
        </p>
      </section>

      {/* ---------------- Dose ladder ---------------- */}
      <section className={`container-wide ${styles.section}`}>
        <div className={styles.sectionHead}>
          <span className={`eyebrow eyebrow--rule ${styles.sectionEyebrow}`}>Method</span>
          <h2 className="h3">The dose ladder, and why it matters</h2>
        </div>
        <div className={styles.card}>
          <p className={styles.cardBody}>
            A fragrance formula is like a cooking recipe: the left-hand column lists the materials in
            no particular order, the right-hand columns give the proportions. Ellena works on a sheet
            of paper with thirty lines and six columns so he keeps a continuous overview and can add
            technical or aesthetic comments, and uses formulation software only to check price and
            compliance. He formulates on a base quantity of <strong>1,000 grams</strong> so that the
            proportions of each material stay memorable when creating a fundamental structure.
          </p>
          <div className={styles.pills}>
            {ellenaDoseScale.map((n) => <span key={n} className={`${styles.pill} ${styles.pillGold} ${styles.mono}`}>{n}</span>)}
            <span className={`${styles.pill} ${styles.mono}`}>… ×1.5 above 300</span>
          </div>
          <p className={styles.cardBody}>
            Two rules follow from that ladder, and both are worth adopting even if you use software:
          </p>
          <ul className={styles.prose} style={{ paddingLeft: "1.1rem", listStyle: "disc" }}>
            <li>
              <strong>Change a proportion by a factor of at least two.</strong> Smaller changes are
              below the threshold at which you can reliably smell the difference, so they add noise
              to your record without adding information to the perfume.
            </li>
            <li>
              <strong>Be generous with quantities.</strong> Mean quantities generate mean ideas. The
              ladder&apos;s uneven spacing — 1, 2, 3, 5, 7, 10, 15, 20, 30, 50, 70 — is deliberate:
              fine resolution at the trace end where a doubling is a large perceptual change, coarse
              resolution at the bulk end where it is not.
            </li>
          </ul>
          <p className={styles.hint}>
            The vault&apos;s ↑ / ↓ buttons step along exactly this ladder. Selection of materials
            matters more than proportion to begin with — the priority is the juxtaposition of
            substances — but proportion is what turns a list of materials into a composition.
          </p>
        </div>
      </section>

      <div className={`container-wide`} style={{ paddingBottom: "3rem" }}>
        <div className={styles.footerNote}>
          Sources: Société Française des Parfumeurs classification (1984, revised 1990) as described
          in J-C. Ellena, <em>Perfume: The Alchemy of Scent</em> (2011) chs. IV and VI; Michael
          Edwards&apos; Fragrance Wheel (1983, updated; &ldquo;Oriental&rdquo; renamed
          &ldquo;Amber&rdquo; 2021); structural and volatility discussion from R. R. Calkin &amp;
          J. S. Jellinek, <em>Perfumery: Practice and Principles</em> (Wiley, 1994) chs. 9 and 12.
          Retail taxonomies such as Fragrantica&apos;s perfume groups follow Edwards more closely
          than the SFP.
        </div>
      </div>
    </>
  );
}
