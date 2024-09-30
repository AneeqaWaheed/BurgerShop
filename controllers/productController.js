import Product from "../models/productModel.js";
import fs from "fs";
//create product
export const createProductController = async (req, res) => {
  try {
    console.log("bamns", req.body);
    const { name, description, price, category, image } = req.body;

    // Check if the fields are provided
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!description) {
      return res.send({ message: "Description is Required" });
    }
    if (!price) {
      return res.send({ message: "Price is Required" });
    }
    if (!category) {
      return res.send({ message: "Category is Required" });
    }
    if (!image) {
      return res.send({ message: "Image is Required" });
    }

    // Check if product already exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(200).send({
        success: false,
        message: "Product already exists, please add another one",
      });
    }

    // Save the product
    const product = await new Product({
      name,
      description,
      price,
      category,
      image, // Make sure you're storing the image URL here
    }).save();

    res.status(201).send({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while adding Product",
    });
  }
};

//get Products
export const getProductController = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "All Products",
      products,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error getting all products",
        error,
      });
  }
};
//get single product
export const singleProductController = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.body.id })
      .select("-images")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Category Successfully",
      product,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error while getting Single Category",
        error,
      });
  }
};
//get Product Image
export const productImageController = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).select("image");
    // console.log(product)
    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }
    console.log("Image");
    const image = product.image.data;
    //res.set('Content-type', product.images.contentType);
    return res.status(200).send({
      image,
      message: "Image",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting image",
      error,
    });
  }
};
//delete product
export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting Product",
      error,
    });
  }
};

//update Product
export const updateProductController = async (req, res) => {
  try {
    const { prId } = req.params;
    const ProductId = await Product.findById(prId);
    console.log(ProductId);
    if (!ProductId) {
      return res
        .status(404)
        .send({ status: "failed", message: "Product not found" });
    }

    // Modify updateData to include tripId
    const updateData = { ...req.body, _id: prId };
    delete updateData._id; // Remove _id if it exists in req.body

    const updatedProduct = await Product.findByIdAndUpdate(prId, updateData, {
      new: true,
    });

    res.status(200).send({
      status: "success",
      message: "Product updated successfully",
      data: updatedProduct,
    });
    console.log(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in updating products ",
      success: false,
      error,
    });
  }
};
//product filter
export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.categories = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await Product.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while filtering Products",
    });
  }
};
//product count
export const productCountController = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Product Count",
    });
  }
};
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await Product.find({})
      .select("-images")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};

//search Controller

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await Product.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-images");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while searching Products",
    });
  }
};
