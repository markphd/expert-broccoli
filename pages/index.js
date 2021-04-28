import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { Fade } from "react-awesome-reveal";

import { Layout } from "../components/Layout";
import { PotLink } from "../components/PotLink";

import * as fbq from "../components/lib/fpixel";

const Home = () => {
  return (
    <Layout propsHeader={"Test message"}>
      <div className={styles.grid}>
        <Fade duration="1200">
          <section className="cover">
            <img className="cover-img" src={"/static/cover.png"} />
            <div className="cover-menu">
              <h1 className={"textSize-3 cover-headline"}>
                We bring delight to your spaces with our appealing collection of
                succulents, cacti and plant pots.
              </h1>
              <h2 className="textSize-0 subheading">How can we help you?</h2>
              <a href="/collection">
                <button className="cover-button">
                  I want to check the catalogue
                </button>
              </a>
              <a href="mailto:hello@mariamarie.garden">
                <button className="cover-button">
                  I want to speak to someone
                </button>
              </a>
            </div>
          </section>
        </Fade>
        <section className="main-section">
          <Fade duration="1200">
            <div className="main-content">
              <div className="main-section-headings">
                <h1 className={"textSize-2"}>
                  These pots are versatile. Perfect as gifts for family and
                  friends who want to spice up their homes with a bit of fun,
                  humor and overload of cuteness.
                </h1>
                <h2 className={"textSize-1 subheading"}>
                  Check out our{" "}
                  <a className="inline-link" href="/collection">
                    latest collection
                  </a>{" "}
                  and start placing your orders today!
                </h2>
              </div>
              <img
                className="main-section-img"
                src={"/static/home-section-1.png"}
              />
            </div>
          </Fade>
        </section>

        <div className="divider-2"></div>
        <Fade duration="1200">
          <div className="marketing">
            <h1>Over 80 designs available! We offer home delivery!*</h1>
            <a href="/collection">
              <button className="cover-button">View Our Collection</button>
            </a>
            <p className="textSize-0">*Delivery fees apply</p>
            {/* <h2 className={"textSize-1 subheading"}>Free delivery every week!</h2> */}
          </div>
          <div className="divider-3"></div>
        </Fade>

        <section className="instructions">
          <h2 className="instructions-heading">HOW TO PLACE AN ORDER</h2>
          <p className="steps">
            1. SELECT YOUR POT{" "}
            <span className="steps-info">
              Head to Our Collection page and build your cart
            </span>
          </p>
          <p className="steps">
            2. SELECT A RECOMMENDED PLANT{" "}
            <span className="steps-info">
              Choose a plant we have recommended for the pot (optional)
            </span>
          </p>
          <p className="steps">
            3. SUBMIT YOUR ORDER{" "}
            <span className="steps-info">
              Add your details and submit your order
            </span>
          </p>
          <p className="steps">
            4. SEND US YOUR ORDER NUMBER{" "}
            <span className="steps-info">
              Take a screenshot or copy the order number and send us via IG
            </span>
          </p>
        </section>

        <section className="pre-footer">
          {/* <img
            className="pre-footer-img"
            src={'/static/footer.png'}
          /> */}
          <h1 className="pre-footer-headline">
            Give us some love on Insta{" "}
            <a
              className="inline-link"
              href="https://www.instagram.com/mariamarie.garden/"
            >
              @mariamarie.garden
            </a>
          </h1>
        </section>

        {/* <p className={"center"}>Order now! 👉 📪  via Instagram <a href="https://www.instagram.com/mariamarie.garden/">@mariamarie.garden</a> </p> */}
      </div>
    </Layout>
  );
};

// Home.defaultProps = {
//   live: [],
// }

// Home.getInitialProps = async () => {
//   console.log("Fetching data...");
//   // let pots = [];
//   let live = [];

//   try {
//     // const res = await fetch('http://localhost:3050/pots');
//     const livePots = await fetch('http://localhost:3000/api/live');

//     // if (res.status < 400) {
//     //   pots = await res.json();
//     // }

//     if (livePots.status < 400) {
//       live = await livePots.json();
//     }

//   } catch (error) {
//     console.log(error)
//   }

//   finally {
//     return { live }
//   }
// }

export default Home;
