import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import cors from "cors";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import orderRoute from "./routes/orderRoute.js";
//congigure env
dotenv.config();

//database config
connectDB();

//rest objects
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

// //routes
app.use(cors());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
// app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/product", productRoute);
app.use("/api/v1/payment", paymentRoute);

app.use("/api/v1/orders", orderRoute);
// //rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Burger Shop</h1>");
});
//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`Server running  mode on ${PORT}`);
});
