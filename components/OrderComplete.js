import React from "react";
import { Fade } from "react-awesome-reveal";

export default function OrderComplete(props) {
  const { ops } = props.order;

  return (
    <section className="order-summary">
      <h2>Awesome! Thanks!</h2>
      <h1 className="order-code">{ops[0].oid}</h1>
      <p>Please do not forget to send us the unique order code on Instagram.</p>
      <a href="instagram://user?username=mariamarie.garden">
        <button className="cover-button">Go to Instagram</button>
      </a>
    </section>
  );
}
