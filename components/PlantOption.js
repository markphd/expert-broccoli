import React from "react";

export default function Plant(props) {
  const { name, price, img, count, select } = props;
  // console.log(props, "PLANT OPTION")
  return count === null || count === "" ? (
    <>
      <input
        type="radio"
        name="plants"
        id={name}
        price={price}
        value={name}
        checked={false}
        onChange={(e) =>
          select(`${e.target.value}:${price.length == 0 ? 0 : price}:`)
        }
      />
      <label htmlFor={name} className="plants-pick">
        <span className="plant-price">
          {price.length != 0 ? `${price}AED` : "price may vary"}
        </span>
        <span className="plant-name">{name.split("-").join(" ")}</span>
        <img
          className="plants-image"
          src={`/static/plants/${img}`}
          alt={name}
        />
      </label>
      <br />
    </>
  ) : (
    <>
      <input
        type="radio"
        name="plants"
        id={name}
        price={price}
        value={name}
        onChange={(e) => select(`${e.target.value}:${price}:`)}
      />
      <label htmlFor={name} className="plants-pick">
        <span className="plant-price">
          {price.length != 0 ? `${price}AED` : "price may vary"}
        </span>
        <span className="plant-name">{name.split("-").join(" ")}</span>
        <img
          className="plants-image"
          src={`/static/plants/${img}`}
          alt={name}
        />
      </label>
      <br />
    </>
  );
}
