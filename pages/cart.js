import { Fade } from "react-awesome-reveal";
import { useContext, useState } from "react";
import fetch from "unfetch";
import { Layout } from "../components/Layout";
import OrderComplete from "../components/OrderComplete";
import { BasketContext } from "../components/BasketContext";

const sendToDatabase = async (
  e,
  orderBasket,
  setOrderBasket,
  setStatus,
  totalPrice,
  delivery
) => {
  e.preventDefault();
  e.target.lastChild.setAttribute("disabled", "true");
  e.target.lastChild.value = "Hang tight";
  e.target.lastChild.style.backgroundColor = "#357474";

  await fetch("/api/catalog", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: e.target.name.value,
      mobile: e.target.mobile.value,
      basket: orderBasket,
      subTotal: totalPrice,
      deliveryFee: Math.abs(totalPrice - delivery),
      total: delivery,
    }),
  }).then(async (r) => {
    const data = await r.json();

    localStorage.removeItem("basket");
    setOrderBasket("0");
    setStatus(data);
  });
};

const clearAllItems = (e) => {
  e.preventDefault();
  localStorage.removeItem("basket");
};

const clearItem = (e, item) => {
  // console.log(item, "CURRENT ITEM");
  // console.log(localStorage.getItem("basket").split("^"), "CLEAN");
  localStorage.setItem(
    "basket",
    localStorage.getItem("basket").replace(`${item}\^`, "")
  );
};

const Cart = (props) => {
  const DELIVERY_FEE = 5;
  const { orderBasket, setOrderBasket } = useContext(BasketContext);
  const [status, setStatus] = useState();
  const basketItems =
    orderBasket !== "0" && orderBasket !== ""
      ? orderBasket.split("^").filter((item) => item)
      : null;
  const totalPrice =
    basketItems !== null && basketItems !== ""
      ? basketItems
          .map((item) => JSON.parse(item))
          .reduce(
            (initialValue, itemValue) =>
              initialValue + Number(itemValue.order.itemPrice),
            0
          )
      : 0;

  const totalPriceIncludingDelivery =
    totalPrice <= 100 ? totalPrice + DELIVERY_FEE : totalPrice;

  return (
    <Layout>
      <div className="grid">
        <header className="pot-header">
          <p className="pot-header-link">
            <a href="/collection">All Collection</a>
          </p>
        </header>
        <section className="basket-summary">
          {basketItems !== null && (
            <h2 className="cart-summary">Order Summary</h2>
          )}
          {basketItems !== null && (
            <span
              onClick={(e) => {
                clearAllItems(e);
                setOrderBasket("0");
              }}
              className="cart-clear-button"
            >
              Clear Basket X
            </span>
          )}
          {!status && basketItems === null && (
            <>
              <h2>Basket is empty</h2>
              <p className="link">
                <a href="/collection">
                  <p className="inline-link">Browse our collection</p>
                </a>
              </p>
            </>
          )}
          <Fade>
            <div className="basket-list">
              {basketItems !== null &&
                basketItems.map((item) => {
                  const { order } = JSON.parse(item);
                  return (
                    <>
                      <div className="basket-item">
                        <div className="basket-thumb">
                          <img
                            className="basket-thumbnail"
                            src={`/static/pots/cover/${order.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}.jpg`}
                          />
                          <a className="cart-link" href={`/pots/${order.name}`}>
                            <span className="basket-item-list">
                              {order.name}
                            </span>
                          </a>
                        </div>
                        <span className="basket-addon-plant">
                          {order.addon == "noplant"
                            ? "without plant"
                            : `${order.addon.replace(/[: \d -]/g, " ")}`}
                        </span>
                        <span className="basket-item-list">
                          {order.itemPrice}AED
                        </span>
                        <div className="basket-item-clear">
                          <span
                            onClick={(e, order) => {
                              clearItem(e, item);
                              setOrderBasket(
                                localStorage
                                  .getItem("basket")
                                  .split(`${item}^`)
                                  .join("")
                              );
                              console.log(
                                localStorage.getItem("basket"),
                                "LOCALSTORAGE"
                              );
                              // localStorage.removeItem('basket')
                            }}
                            className=""
                          >
                            Delete X
                          </span>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </Fade>
          {basketItems !== null && (
            <>
              <p className="sub-total">
                Delivery fee
                <span className="delivery-fee">
                  {totalPrice <= 100 ? (
                    <span className="currency">5AED</span>
                  ) : (
                    <span className="currency">FREE</span>
                  )}
                </span>
              </p>
              <p className="total">
                Total
                <span>
                  {totalPriceIncludingDelivery}
                  <span className="currency">AED</span>
                </span>
              </p>
            </>
          )}
        </section>

        <section className="basket-form">
          {basketItems !== null && (
            <h2 className="cart-summary">Customer Details</h2>
          )}
          {basketItems !== null && (
            <form
              className="form-contact"
              onSubmit={(e) =>
                sendToDatabase(
                  e,
                  orderBasket,
                  setOrderBasket,
                  setStatus,
                  totalPrice,
                  totalPriceIncludingDelivery
                )
              }
            >
              <label htmlFor="name">Name</label>
              <input name="name" type="text" required />
              <label htmlFor="mobile">Please enter your mobile number:</label>
              <input name="mobile" type="text" required />
              <input
                className="cover-button"
                type="submit"
                value="Submit Order"
              />
            </form>
          )}
        </section>
      </div>

      {status && <OrderComplete order={status} />}
    </Layout>
  );
};

export default Cart;
