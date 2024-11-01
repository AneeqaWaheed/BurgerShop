// controllers/orderController.js
import Orders from "../models/Order.js";

export const createOrder = async (req, res) => {
  const { items, totalAmount } = req.body;
  const { userId } = req;

  try {
    const newOrder = new Orders({ userId, items, totalAmount });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
