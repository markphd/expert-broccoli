import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import styles from "../styles/Home.module.css";

// support for localstorage
const Basket = dynamic(import("./Basket"), { ssr: false });

const FB_PIXEL_ID = "1101216403714622";

export const Layout = ({ propsHeader, children }) => {
  return (
    <>
      <Head>
        <title>
          maria marie garden － 🌵♥️☘🌿 🌸🍂 Flourishing in Dubai, UAE
        </title>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/cjo7sog.css"
        ></link>
        <link rel="icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', ${FB_PIXEL_ID});
              `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      </Head>
      <nav>
        <a
          className="logo"
          style={{
            width: "300px",
            height: "150px",
            margin: "0 auto",
          }}
          href="/"
          rel="noopener noreferrer"
        ></a>
        <Basket />
      </nav>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p className={"textSize-0"}>🌵♥️☘🌿 🌸🍂 Flourishing in Dubai, UAE.</p>
      </footer>
    </>
  );
};
