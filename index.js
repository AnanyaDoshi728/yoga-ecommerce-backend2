const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const Order = require('./models/Order')

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
]);

const productRoutes = require("./routes/Product");
const orderRoutes = require("./routes/Order");
const bookingRoutes = require("./routes/Booking");
const venueRoutes = require("./routes/Venues");

const app = express();

// const cors = require("cors")
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(morgan("dev"));
app.use(bodyParser.json());

// routes
// router.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
//   next();
// });

app.use("/api/admin", productRoutes);
app.use("/api/admin", orderRoutes);
app.use("/api/admin", bookingRoutes);
app.use("/api/admin", venueRoutes);

app.post("/api/admin/test-checkout", async (req, res) => {
  // console.log("gibberish")
  try {
    console.log('body: ',req.body.bookingData)
    // Create a checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      // For each item use the id to get it's information
      // Take that information and convert it to Stripe's format

      // format for reference
      // line_items: req.body.items.map(({ id, quantity }) => {
      //   const storeItem = storeItems.get(id);
      //   return {
      //     price_data: {
      //       currency: "inr",
      //       product_data: {
      //         name: storeItem.name,
      //       },
      //       unit_amount: storeItem.priceInCents,
      //     },
      //     quantity: quantity,
      //   };
      // }),
      line_items: [
        {
          price_data: {
            currency: 'inr',
            unit_amount: req.body.item.price,
            product_data: {
              name: req.body.item.name,
            },
          },
          quantity: 1,
        },
      ],

      mode: "payment",
      // Set a success and cancel URL we will send customers to
      // These must be full URLs
      // In the next section we will setup CLIENT_URL
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (e) {
    // If there is an error send it to the client
    res.status(500).json({ error: e.message });
  }
});


app.post("/api/admin/place-order", async (req, res) => {

  const order = await Order.create(req.body)

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      
      line_items: req.body.orderedItems.map((item) => {
          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.name,
                // image: item.productImage
              },
              unit_amount: item.price,
            },
            quantity: item.quantity,
          };
        }),
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/successOrder/?id=${order._id}`,
      cancel_url: `${process.env.CLIENT_URL}/cancelOrder/id=${order._id}`,
    });

   

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});



const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(port);
  })
  .catch((err) => console.log(err));
