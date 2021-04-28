import { useState, useEffect, useContext } from "react";
import { BasketContext } from "../components/BasketContext";
import "../styles/globals.css";
import dynamic from "next/dynamic";

const FacebookPixel = dynamic(() => import("../components/FacebookPixel"), {
    ssr: false,
});

function MyApp({ Component, pageProps }) {
    const [orderBasket, setOrderBasket] = useState("0");
    const addItemToBasket = (pot) => setOrderBasket;

    // passed value to context provider
    const value = {
        orderBasket,
        setOrderBasket,
        addItemToBasket,
    };

    return (
        <FacebookPixel>
            <BasketContext.Provider value={value}>
                <Component {...pageProps} />
            </BasketContext.Provider>
        </FacebookPixel>
    );
}

export default MyApp;
