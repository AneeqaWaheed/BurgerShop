// routes/orderRoutes.js
import express from "express";
import { getAllOrders, getUserOrders } from "../controllers/orderController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/all-orders", requireSignIn, isAdmin, getAllOrders); // Route to get all orders
router.get("/user/:userId", requireSignIn, getUserOrders);
export default router;
