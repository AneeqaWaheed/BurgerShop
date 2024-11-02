import Order from "../models/ordersModel.js";

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "firstName email") // Populate user info (optional)
      .populate("items.productId", "name price"); // Populate product info (optional)

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

export const getUserOrders = async (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = await Order.find({ userId }).populate({
      path: "items.productId", // First populate the product details
      select: "name price category",
      populate: {
        path: "category", // Now populate the category details
        select: "name", // Specify the fields you want from the category
      },
    });

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
