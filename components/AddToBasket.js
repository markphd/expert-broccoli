import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { BasketContext } from "./BasketContext";

const AddToBasket = (props) => {
  const { price, name, plant } = props;
  const initialBasket = () => localStorage.getItem("basket") || "";
  const [basket, setBasket] = useState(initialBasket);

  const { orderBasket, setOrderBasket } = useContext(BasketContext);

  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("basket", basket);
    setOrderBasket(basket);
  }, [basket]);

  const handleClick = (e, name, plant, price) => {
    const addon = plant || "noplant";
    const orderItem = {
      order: {
        name: `${name}`,
        addon: `${addon}`,
        itemPrice: `${price}`,
      },
    };

    setBasket(basket + `${JSON.stringify(orderItem)}^`);
    e.target.innerText = "Added successfully!";
    e.target.setAttribute("disabled", "disabled");
    // router.reload()
    router.push("/cart").then(() => window.scrollTo(0, 0));
  };

  return (
    <BasketContext.Consumer>
      {(orderBasket) => (
        <>
          <button
            className="cover-button"
            onClick={(e) => handleClick(e, name, plant, price)}
          >
            Add to Basket — {price}AED
          </button>
        </>
      )}
    </BasketContext.Consumer>
  );
};

export default AddToBasket;
