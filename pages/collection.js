import { Fade } from "react-awesome-reveal";
import { Layout } from "../components/Layout";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const collections = [
  // "christmas-collection",
  // "santas-helper",
  "phenomenal-mates",
  "barn-bunnies",
  // "limited-edition",
  "patterned-gypsies",
  "couch-potatoes",
  "daisy-the-squeeky-duck",
  "bryan-the-bear",
  // "celebrity-elites",
  "upside-down-fun",
  "toddler-staples",
  "dream-chasers",
  "whimsical-mermaids",
  "farm-mates",
  "nordic-maidens",
  "bohemian-hippies",
  "game-of-throws",
  "woof-crew",
  "prehistoric-stunner",
  "african-charm",
  // "smitten-kittens",
  "purrfect-trio",
  "whale-sweethearts",
];

export default function Catalog({ catalog }) {
  const live = catalog;
  return (
    <Layout>
      <h1 className="collection-headline">Our Collection</h1>
      {/* <section className="highlight">
        <img src="/static/highlight.jpg"/>
      </section> */}
      <Fade>
        <ul className="collection-gallery">
          {collections.map((l) => (
            <li key={Math.random()}>
              <Link href={`/${l}`}>
                <a className="collection-cover-container">
                  <img
                    className="collection-cover"
                    src={`/static/cover-${l}.jpg`}
                  />
                  <span className="collection-title">
                    {l.split("-").join(" ").toUpperCase()}
                  </span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </Fade>
    </Layout>
  );
}
