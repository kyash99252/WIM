const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "marketplace",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }

        const user = results[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: "Incorrect password" });
        }

        res.status(200).json({
          message: "Login successful",
          userId: user.id,
          redirectTo: req.headers.referer || "/",
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
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

app.post("/create-order", async (req, res) => {
  const { email, serviceName, plan } = req.body;

  console.log(email, serviceName, plan);


  // if (!serviceName || !plan || !email) {
  //   return res.status(400).json({ message: "Missing required fields." });
  // }

  //   const sql = `
  //     INSERT INTO orders (service_name, plan, email)
  //     VALUES (?, ?, ?)
  //   `;

  //   db.query(sql, [serviceName, plan.name, email], (err, result) => {
  //     if (err) {
  //       console.error("Database error:", err);
  //       return res.status(500).json({ message: "Database error." });
  //     }

      return res.status(200).json({
        message:
          "Temporary success response. Please implement the logic later.",
      });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});