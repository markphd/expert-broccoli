import React, { useState } from "react";
import dynamic from "next/dynamic";
import Error from "next/error";
import { useRouter } from "next/router";
import { Fade } from "react-awesome-reveal";
import { Layout } from "../../components/Layout";
import { connectToDatabase } from "../../utils/database";
import ReactImageMagnify from "react-image-magnify";
import ProductHeader from "../../components/ProductHeader";
const AddToBasket = dynamic(import("../../components/AddToBasket"), {
  ssr: false,
});

import PlantOption from "../../components/PlantOption";

const Pot = ({ catalog, plants }) => {
  const router = useRouter();
  const potName = router.query.potName;

  if (potName === null || catalog === undefined) {
    return <Error statusCode={404} />;
  }

  // get pot data from catalog props
  const data = catalog.find((p) => p.name === potName);

  // get plant selections from plants props
  const plantsSelection = plants.filter((i) =>
    i.pots.includes(potName.toLowerCase())
  );

  // console.log(plantsSelection, "header")

  // get/set plant data from onclick of selecting plant
  const [plant, selectPlant] = useState("");

  return (
    <Layout propsHeader="Hello">
      <div className="grid">
        <ProductHeader catalog={data} />
        <Fade>
          <section className="pot-item">
            <section className="pot-specs">
              <p className="pot-name">{data.name}</p>
              <p className="pot-detail-item">
                <span className="pot-details-label">Price</span> <br />
                <span className="pot-details-price">
                  {data.price}AED pot only
                </span>
              </p>
              <p className="pot-detail-item">
                <span className="pot-details-label">Measurement</span>
                {" (Length x Width x Height)"}
                <br />
                {data.dimension.split("*").join(" x ")}
              </p>
              <p className="pot-detail-item">
                <span className="pot-details-label">Stocks</span> <br />
                {data.available === false ? (
                  <span className="limited crimson">OUT OF STOCK</span>
                ) : Number(data.stock) > 1 ? (
                  <span className="available">Available</span>
                ) : (
                  <span className="limited">Only 1 stock left</span>
                )}
              </p>
            </section>
            <section className="featured-item">
              {/* <Fade>
                <div className="redirecting">Redirecting...</div>
              </Fade> */}
              {data.available === true ? (
                <section className="pot-details">
                  <section className="plants-gallery">
                    <form className="plants-selection">
                      <legend>Paired nicely with:</legend>
                      <div className="plants-picker">
                        {/* { plant && console.log(plantsSelection, "PLANT SELECTION")} */}
                        {plantsSelection.map((item) => (
                          <PlantOption
                            price={item.price}
                            img={item.image}
                            name={item.name}
                            select={selectPlant}
                            count={plant}
                          />
                        ))}
                        <PlantOption
                          price={""}
                          img={"ask-us.svg"}
                          name={"surprise me"}
                          select={selectPlant}
                          count={plant}
                        />
                      </div>
                    </form>
                  </section>
                  {(plant && (
                    <Fade>
                      <p className="addon">
                        ADDON: {plant.split(":")[0].replace(/-/g, " ")}{" "}
                        <span
                          className="clear"
                          onClick={() => selectPlant(null)}
                        >
                          Remove X
                        </span>
                      </p>
                    </Fade>
                  )) ||
                    ""}
                  {(plant && (
                    <AddToBasket
                      price={Number(data.price) + Number(plant.split(":")[1])}
                      name={data.name}
                      plant={plant}
                    />
                  )) || (
                    <AddToBasket
                      price={data.price}
                      name={data.name}
                      plant={plant}
                    />
                  )}
                </section>
              ) : (
                ""
              )}
              {
                <div className="image-showcase">
                  {/* <img
                    className="featured-image"
                    src={`/static/pots/${data.name.split(' ').join('-').toLowerCase()}-1.jpg`}
                    alt={data.name}
                  /> */}
                  <ReactImageMagnify
                    className="featured-image"
                    {...{
                      smallImage: {
                        alt: `maria marie garden — ${data.name}`,
                        isFluidWidth: true,
                        src: `/static/pots/thumbs/${data.name
                          .split(" ")
                          .join("-")
                          .toLowerCase()}-1.jpg`,
                      },
                      largeImage: {
                        src: `/static/pots/large/${data.name
                          .split(" ")
                          .join("-")
                          .toLowerCase()}-1.jpg`,
                        width: 756,
                        height: 567,
                      },
                      enlargedImagePosition: "over",
                    }}
                  />
                  <ReactImageMagnify
                    className="featured-image"
                    {...{
                      smallImage: {
                        alt: `maria marie garden — ${data.name}`,
                        isFluidWidth: true,
                        src: `/static/pots/thumbs/${data.name
                          .split(" ")
                          .join("-")
                          .toLowerCase()}-2.jpg`,
                      },
                      largeImage: {
                        src: `/static/pots/large/${data.name
                          .split(" ")
                          .join("-")
                          .toLowerCase()}-2.jpg`,
                        width: 756,
                        height: 567,
                      },
                      enlargedImagePosition: "over",
                    }}
                  />
                  <ReactImageMagnify
                    className="featured-image"
                    {...{
                      smallImage: {
                        alt: `maria marie garden — ${data.name}`,
                        isFluidWidth: true,
                        src: `/static/pots/thumbs/${data.name
                          .split(" ")
                          .join("-")
                          .toLowerCase()}-3.jpg`,
                      },
                      largeImage: {
                        src: `/static/pots/large/${data.name
                          .split(" ")
                          .join("-")
                          .toLowerCase()}-3.jpg`,
                        width: 756,
                        height: 567,
                      },
                      enlargedImagePosition: "over",
                    }}
                  />
                  <ReactImageMagnify
                    className="featured-image"
                    {...{
                      smallImage: {
                        alt: `maria marie garden — ${data.name}`,
                        isFluidWidth: true,
                        src: `/static/pots/thumbs/${data.name
                          .split(" ")
                          .join("-")
                          .toLowerCase()}-4.jpg`,
                      },
                      largeImage: {
                        src: `/static/pots/large/${data.name
                          .split(" ")
                          .join("-")
                          .toLowerCase()}-4.jpg`,
                        width: 756,
                        height: 567,
                      },
                      enlargedImagePosition: "over",
                    }}
                  />
                </div>
              }
            </section>
          </section>
        </Fade>
      </div>
    </Layout>
  );
};

export default Pot;

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  try {
    const catalog = await db.collection("pots").find({}).toArray();

    const plants = await db.collection("plants").find({}).toArray();

    return {
      props: {
        catalog: JSON.parse(JSON.stringify(catalog)),
        plants: JSON.parse(JSON.stringify(plants)),
      },
    };
  } catch (error) {
    return error;
  }
}
