import { Fade } from 'react-awesome-reveal';
import { Layout } from '../components/Layout';
import { PotLink } from '../components/PotLink';
import styles from '../styles/Home.module.css';

import { connectToDatabase } from '../utils/database';

export default function Catalog({ catalog }) {
  const live = catalog;
  return (
    <Layout>
      <h1>Available Plants</h1>
      <Fade>
        <ul className="plants-gallery">
          {live.map((l) => (
            <li className="plants-item" key={Math.random()}>
              <img
                className="plants-thumb"
                src={`/static/plants/${l.image.toLowerCase()}`}
              />
              <div className="plants-info">
                <span>Name: {l.name}</span>
                <span>Alias: {l.alias}</span>
                <span>Family: {l.family}</span>
                <span>Price: {l.price}</span>
              </div>
            </li>
          ))}
        </ul>
      </Fade>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const catalog = await db.collection('plants').find({}).toArray();

  return {
    props: {
      catalog: JSON.parse(JSON.stringify(catalog)),
    },
  };
}
