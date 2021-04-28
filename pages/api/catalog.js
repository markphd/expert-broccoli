import next from "next";
import { connectToDatabase } from "../../utils/database";

import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API);

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const { name, mobile, basket, total, deliveryFee } = req.body;
  const basketItems = basket.split("^").filter((item) => item);
  const formattedData = basketItems.map((order) => JSON.parse(order));

  if (req.method === "POST") {
    const oid = [...Array(6)]
      .map((i) => (~~(Math.random() * 36)).toString(36))
      .join("")
      .toUpperCase();

    const plantCover = [
      "ball-cactus----parodia--parodia-magnifica.jpg",
      "chihuahua-flower----leatherpetal--graptopetalum-bellum_a.jpg",
      "chihuahua-flower----leatherpetal--graptopetalum-bellum_b.jpg",
      "chocolate-soldier----pussy-ears--kalanchoe-tomentosa.jpg",
      "echeveria-pollux----hen-and-chicks--echeveria.jpg",
      "elephant-bush----portulacaria--rainbow-bush.jpg",
      "ghost-plant----stonecrop--sedum-weinbergii.jpg",
      "golden-barrel-cactus----clustered-barrel-cacti--echinocactus.jpg",
      "jade-plant----pigmyweeds--crassula.jpg",
      "mexican-snowball----sonecrop--crassulaceae.jpg",
      "molded-wax-agave----lipstick-echeveria--echeveria-agavoides.jpg",
      "old-man-cactus----cephalocereus--bunny-cactus.jpg",
      "paddle-plant----desert-cabbage--kalanchoe-tetraphylla_a.jpg",
      "paddle-plant----desert-cabbage--kalanchoe-tetraphylla_b.jpg",
      "pincushion-peperomia----radiator-plant--peperomia-ferreyrae.jpg",
      "plover-eggs----adromischus--adromischus-cooperi.jpg",
      "pulidos-echeveria----stone-rose--echeveria-pulidonis_a.jpg",
      "pulidos-echeveria----stone-rose--echeveria-pulidonis_b.jpg",
      "spiny-pincushion-cactus----globe-cactus--mammillaria_b.jpg",
      "springtime-crassula----pigmyweeds--crassula.jpg",
      "string-of-buttons----pigmyweeds--crassula.jpg",
      "urbinia-purpusii----hen-and-chicks--echeveria-perle-von-nurnberg.jpg",
      "urbinia-purpusii----hen-and-chicks--echeveria-purpusorum.jpg",
      "vertical-leaf-senecio----ragworts--senecio-crassissimus.jpg",
      "zebra-plant----haworthias-haworthia-fasciata.jpg",
      "zebra-wart----haworthias--wart-plant.jpg",
      "noplant.jpg",
    ];

    const order = await db.collection("orders").insertOne({
      oid: oid,
      name: name,
      mobile: mobile,
      basket: {
        order: formattedData,
      },
      total: total,
      deliveryFee: deliveryFee,
    });

    const orderItems = formattedData
      .map((i) => {
        const addon = i.order.addon.split(":")[1] || "none";
        const thumbUrl = `https://mariamarie.garden/static/plants/thumbs/`;
        const potThumbUrl = `https://mariamarie.garden/static/pots/thumbs/`;
        const thumbFileName =
          plantCover.find((f) => f.includes(i.order.addon.split(":")[0])) ||
          "noplant.jpg";

        return `<h3>${
          i.order.name
        }</h3> <br/> <img src="${potThumbUrl}${i.order.name.toLowerCase().split(' ').join('-')}-1.jpg"/> <img src="${thumbUrl}${thumbFileName}"/> <br/> 
        ${ i.order.addon.split(":")[0] } + ${addon} <br/> Item Price: ${i.order.itemPrice}AED <br/> <hr/>`;
      })
      .toString()
      .replace(/,/g, "");
    const orderCreated = new Date().toLocaleString();

    console.log({ orderItems });

    const msg = {
      to: "hello@mariamarie.garden", // Change to your recipient
      from: "hello@mariamarie.garden", // Change to your verified sender
      subject: `${oid} - Online Order from ${name}`,
      html: `
      <!doctype html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Simple Transactional Email</title>
            <style>
              /* -------------------------------------
                  GLOBAL RESETS
              ------------------------------------- */
              
              /*All the styling goes here*/
              
              img {
                border: none;
                -ms-interpolation-mode: bicubic;
                max-width: 50%; 
                max-height: 50%; 
              }

              body {
                background-color: #f6f6f6;
                font-family: sans-serif;
                -webkit-font-smoothing: antialiased;
                font-size: 14px;
                line-height: 1.4;
                margin: 0;
                padding: 0;
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%; 
              }

              table {
                border-collapse: separate;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                width: 100%; }
                table td {
                  font-family: sans-serif;
                  font-size: 14px;
                  vertical-align: top; 
              }

              /* -------------------------------------
                  BODY & CONTAINER
              ------------------------------------- */

              .body {
                background-color: #f6f6f6;
                width: 100%; 
              }

              /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
              .container {
                display: block;
                margin: 0 auto !important;
                /* makes it centered */
                max-width: 580px;
                padding: 10px;
                width: 580px; 
              }

              /* This should also be a block element, so that it will fill 100% of the .container */
              .content {
                box-sizing: border-box;
                display: block;
                margin: 0 auto;
                max-width: 580px;
                padding: 10px; 
              }

              /* -------------------------------------
                  HEADER, FOOTER, MAIN
              ------------------------------------- */
              .main {
                background: #ffffff;
                border-radius: 3px;
                width: 100%; 
              }

              .wrapper {
                box-sizing: border-box;
                padding: 20px; 
              }

              .content-block {
                padding-bottom: 10px;
                padding-top: 10px;
              }

              .footer {
                clear: both;
                margin-top: 10px;
                text-align: center;
                width: 100%; 
              }
                .footer td,
                .footer p,
                .footer span,
                .footer a {
                  color: #999999;
                  font-size: 12px;
                  text-align: center; 
              }

              /* -------------------------------------
                  TYPOGRAPHY
              ------------------------------------- */
              h1,
              h2,
              h3,
              h4 {
                color: #000000;
                font-family: sans-serif;
                font-weight: 400;
                line-height: 1.4;
                margin: 0;
                margin-bottom: 30px; 
              }

              h1 {
                font-size: 35px;
                font-weight: 300;
                text-align: center;
                text-transform: capitalize; 
              }

              p,
              ul,
              ol {
                font-family: sans-serif;
                font-size: 14px;
                font-weight: normal;
                margin: 0;
                margin-bottom: 15px; 
              }
                p li,
                ul li,
                ol li {
                  list-style-position: inside;
                  margin-left: 5px; 
              }

              a {
                color: #3498db;
                text-decoration: underline; 
              }

              /* -------------------------------------
                  BUTTONS
              ------------------------------------- */
              .btn {
                box-sizing: border-box;
                width: 100%; }
                .btn > tbody > tr > td {
                  padding-bottom: 15px; }
                .btn table {
                  width: auto; 
              }
                .btn table td {
                  background-color: #ffffff;
                  border-radius: 5px;
                  text-align: center; 
              }
                .btn a {
                  background-color: #ffffff;
                  border: solid 1px #3498db;
                  border-radius: 5px;
                  box-sizing: border-box;
                  color: #3498db;
                  cursor: pointer;
                  display: inline-block;
                  font-size: 14px;
                  font-weight: bold;
                  margin: 0;
                  padding: 12px 25px;
                  text-decoration: none;
                  text-transform: capitalize; 
              }

              .btn-primary table td {
                background-color: #3498db; 
              }

              .btn-primary a {
                background-color: #3498db;
                border-color: #3498db;
                color: #ffffff; 
              }

              /* -------------------------------------
                  OTHER STYLES THAT MIGHT BE USEFUL
              ------------------------------------- */
              .last {
                margin-bottom: 0; 
              }

              .first {
                margin-top: 0; 
              }

              .align-center {
                text-align: center; 
              }

              .align-right {
                text-align: right; 
              }

              .align-left {
                text-align: left; 
              }

              .clear {
                clear: both; 
              }

              .mt0 {
                margin-top: 0; 
              }

              .mb0 {
                margin-bottom: 0; 
              }

              .preheader {
                color: transparent;
                display: none;
                height: 0;
                max-height: 0;
                max-width: 0;
                opacity: 0;
                overflow: hidden;
                mso-hide: all;
                visibility: hidden;
                width: 0; 
              }

              .powered-by a {
                text-decoration: none; 
              }

              hr {
                border: 0;
                border-bottom: 1px solid #f6f6f6;
                margin: 20px 0; 
              }

              /* -------------------------------------
                  RESPONSIVE AND MOBILE FRIENDLY STYLES
              ------------------------------------- */
              @media only screen and (max-width: 620px) {
                table[class=body] h1 {
                  font-size: 28px !important;
                  margin-bottom: 10px !important; 
                }
                table[class=body] p,
                table[class=body] ul,
                table[class=body] ol,
                table[class=body] td,
                table[class=body] span,
                table[class=body] a {
                  font-size: 16px !important; 
                }
                table[class=body] .wrapper,
                table[class=body] .article {
                  padding: 10px !important; 
                }
                table[class=body] .content {
                  padding: 0 !important; 
                }
                table[class=body] .container {
                  padding: 0 !important;
                  width: 100% !important; 
                }
                table[class=body] .main {
                  border-left-width: 0 !important;
                  border-radius: 0 !important;
                  border-right-width: 0 !important; 
                }
                table[class=body] .btn table {
                  width: 100% !important; 
                }
                table[class=body] .btn a {
                  width: 100% !important; 
                }
                table[class=body] .img-responsive {
                  height: auto !important;
                  max-width: 100% !important;
                  width: auto !important; 
                }
              }

              /* -------------------------------------
                  PRESERVE THESE STYLES IN THE HEAD
              ------------------------------------- */
              @media all {
                .ExternalClass {
                  width: 100%; 
                }
                .ExternalClass,
                .ExternalClass p,
                .ExternalClass span,
                .ExternalClass font,
                .ExternalClass td,
                .ExternalClass div {
                  line-height: 100%; 
                }
                .apple-link a {
                  color: inherit !important;
                  font-family: inherit !important;
                  font-size: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
                  text-decoration: none !important; 
                }
                #MessageViewBody a {
                  color: inherit;
                  text-decoration: none;
                  font-size: inherit;
                  font-family: inherit;
                  font-weight: inherit;
                  line-height: inherit;
                }
                .btn-primary table td:hover {
                  background-color: #34495e !important; 
                }
                .btn-primary a:hover {
                  background-color: #34495e !important;
                  border-color: #34495e !important; 
                } 
              }

            </style>
          </head>
          <body class="">
            <span class="preheader">You received a new order from ${name} - ${mobile}</span>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
              <tr>
                <td>&nbsp;</td>
                <td class="container">
                  <div class="content">

                    <!-- START CENTERED WHITE CONTAINER -->
                    <table role="presentation" class="main">

                      <!-- START MAIN CONTENT AREA -->
                      <tr>
                        <td class="wrapper">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td>
                                <p>Order Created: ${orderCreated}</p>
                                <p>Name: ${name}</p>
                                <p>Mobile Number: ${mobile}</p>
                                <p>Basket:</p>
                                <p>${orderItems}</p>
                                <p>Delivery Fee: ${deliveryFee}</p>
                                <p><strong>Total Price: ${total}</strong></p>
                              </td>
                            </tr>
                            <tr>
                              <td class="btn"> <a href="https://mariamarie.garden/order/${oid}" target="_blank">Complete Order</a> </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                    <!-- END MAIN CONTENT AREA -->
                    </table>
                    <!-- END CENTERED WHITE CONTAINER -->

                    <!-- START FOOTER -->
                    <div class="footer">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td class="content-block">
                            <span class="apple-link">Maria Marie Garden, Dubai Marina, Dubai, UAE</span>
                            <br> Don't like these emails? <a href="http://i.imgur.com/CScmqnj.gif">Unsubscribe</a>.
                          </td>
                        </tr>
                      </table>
                    </div>
                    <!-- END FOOTER -->

                  </div>
                </td>
                <td>&nbsp;</td>
              </tr>
            </table>
          </body>
        </html>
      `,
    };

    await sgMail
      .send(msg)
      .then((err) => {
        console.log("Email sent", err);
      })
      .catch((error) => {
        console.error(error.toString());
      });

    res.send(JSON.stringify(order));
    // console.log(order.ops[0].oid, "WITHIN IFELSE")
  }

  // const orders = await db
  //   .collection("orders")
  //   .find({})
  //   .toArray();

  // res.json(orders, "RESPONSE BODY");
  // res.redirect(200, '/catalog')
};
