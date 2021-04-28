import React from "react";
import { Fade } from "react-awesome-reveal";
import Link from "next/link";

export default function ProductHeader(props) {
  const collectionLink =
    props.catalog[0] !== undefined
      ? props.catalog[0].collection
          .toLowerCase()
          .replace(/’/g, "")
          .split(" ")
          .join("-")
      : props.catalog.collection
          .toLowerCase()
          .replace(/’/g, "")
          .split(" ")
          .join("-");
  const collectionName =
    props.catalog[0] !== undefined
      ? props.catalog[0].collection
      : props.catalog.collection;

  return (
    <header className="pot-header">
      <Fade triggerOnce={true}>
        <p className="pot-header-link">
          <Link href="/collection">All Collection</Link>
        </p>
        <p className="pot-header-link">
          <a href={`/${collectionLink}`}>﹂{collectionName}</a>
        </p>
      </Fade>
    </header>
  );
}
