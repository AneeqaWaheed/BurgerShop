// ProductPage.js
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../Components/Layout/Layout";
import { OrderDetails } from "../Components/Routes/orderDetails";
import { useCart } from "../context/cart"; // Import Cart Context
import { toast } from "react-toastify";

const ProductPage = () => {
  const { addToCart } = useCart(); // Access the addToCart function from context
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState("");

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.React_App_API}/api/v1/product/single-product/${params.id}`
      );
      setName(data?.product?.name);
      setId(data?.product?._id);
      setDescription(data?.product?.description);
      setPrice(data?.product?.price);
      setImage(data?.product?.image);
    } catch (error) {
      console.log("error ", error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  const handleAddToCart = () => {
    const productDetails = {
      id,
      name,
      description,
      price,
      quantity,
      image,
    };
    addToCart(productDetails); // Add product details to cart context
    toast.success(`Added ${quantity} of ${name} to the cart`);
    console.log(`Added ${quantity} of ${name} to the cart`);
  };

  return (
    <Layout title="Menu - BurgerShop">
      <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={image}
              alt={name}
              className="img-fluid rounded shadow-sm w-100"
              style={{ objectFit: "cover", maxHeight: "400px" }}
            />
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold">{name}</h2>
            <p className="h4 text-success">${price}</p>
            <p className="text-muted">{description}</p>

            <div className="mb-3">
              <label htmlFor="quantity" className="form-label fw-semibold">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                className="form-control w-50"
              />
            </div>

            <button className="btn btn-success w-50" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <hr />
      <div className="container my-5">
        <OrderDetails />
      </div>
    </Layout>
  );
};

export default ProductPage;
