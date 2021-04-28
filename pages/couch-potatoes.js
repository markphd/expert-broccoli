import { Fade } from "react-awesome-reveal";
import { Layout } from "../components/Layout";
import { PotLink } from "../components/PotLink";
import styles from "../styles/Home.module.css";
import ProductHeader from "../components/ProductHeader";
import { connectToDatabase } from "../utils/database";

export default function Catalog({ catalog }) {
  const live = catalog;
  return (
    <Layout>
      <ProductHeader catalog={live} />
      <Fade>
        <ul className="gallery">
          {live.map((l) => (
            <li
              key={Math.random()}
              className={l.available === false ? "outofstock" : ""}
            >
              {/* <img  src={`/static/cover-${l.name.toLowerCase()}.jpg`} /> */}
              <PotLink potData={l} />
            </li>
          ))}
        </ul>
      </Fade>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const catalog = await db
    .collection("pots")
    .find({ collection: "Couch potatoes" })
    .toArray();

  return {
    props: {
      catalog: JSON.parse(JSON.stringify(catalog)),
    },
  };
}
