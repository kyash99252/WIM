const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/create-payment-intent", async (req, res) => {
  const { amount, currency } = req.body;

  if (!amount || !Number.isInteger(amount) || amount <= 0) {
    console.error("Invalid amount received:", amount);
    return res
      .status(400)
      .json({ error: "Amount must be a positive integer in cents." });
  }

  if (!currency || typeof currency !== "string") {
    console.error("Invalid currency received:", currency);
    return res
      .status(400)
      .json({ error: "Currency is required and must be a string." });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});