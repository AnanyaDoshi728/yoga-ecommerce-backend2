const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const Order = require("./models/Order");
const Booking = require("./models/Booking");

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
    origin: "*",
  })
);
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );

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
  const booking = await Booking.create(req.body.item.bookingData);
  try {
    console.log("body: ", req.body.bookingData);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: req.body.item.price,
            product_data: {
              name: req.body.item.name,
            },
          },
          quantity: 1,
        },
      ],

      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success/?id=${booking._id}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/admin/place-order", async (req, res) => {
  const order = await Order.create(req.body);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: req.body.orderedItems.map((item) => {
        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price,
          },
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/successOrder/?id=${order._id}`,
      cancel_url: `${process.env.CLIENT_URL}/cancelOrder`,
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const port = 8080;

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(port);
  })
  .catch((err) => console.log(err));
