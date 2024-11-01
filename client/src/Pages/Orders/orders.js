// CartPage.js
import React from "react";

import { toast } from "react-toastify";
import { useCart } from "../../context/cart";
import Layout from "../../Components/Layout/Layout";
import "./orderStyle.css";
import GeneralLayout from "../../Components/Layout/GeneralLayout";
import { useAuth } from "../../context/auth";
const CartPage = () => {
  const { cart, setCart } = useCart();
  const [auth] = useAuth();
  console.log("asdnbasndbsandad", cart);
  // delete booking
  const removecart = async (pid) => {
    try {
      let mycart = [...cart];
      let index = mycart.findIndex((item) => item._id === pid);
      mycart.splice(index, 1);
      setCart(mycart);
      localStorage.setItem("cart", JSON.stringify(mycart));
    } catch (error) {
      console.log(error);
    }
  };
  const totalPrice = () => {
    try {
      let total = 0;
      // Iterate over the cart items
      cart?.forEach((item) => {
        // Multiply item price by its quantity and add to total
        if (item.price && item.quantity) {
          // Check if price and quantity exist
          total += item.price * item.quantity; // Calculate total price for the item
        }
      });
      // Return the total formatted as currency
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
      return "$0.00"; // Return a default value in case of an error
    }
  };

  // Payment integration
  // Updated makePayment function in CartPage.js
  const makePayment = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`, // Set the token in the header
      };
      const userId = auth.userId;
      console.log("userId", auth, userId);
      // Prepare the order data
      const order = cart.map((item) => ({
        _id: item.id, // Make sure to use the correct property for the ID
        name: item.name,
        description: item.description,
        price: item.price, // Assuming `price` is the total price for that item
        images: [item.image],
        quantity: item.quantity,
      }));

      // Send the order data to the backend
      const response = await fetch(
        `${process.env.React_App_API}/api/v1/payment/checkout`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ order, userId }), // Send the order as part of the request body
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message + " Please try again");
      }
      if (data.session.url) {
        window.location.href = data.session.url; // Redirect to the Stripe checkout
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <GeneralLayout title="Cart - BurgerShop">
      {/* <div className="container mt-5">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="list-group">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item">
                <h5>{item.name}</h5>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
                <img src={item.image} alt={item.name} className="img-fluid" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout> */}
      <div className="row justify-content-center m-0">
        <div className="col-md-8 mt-5 mb-5 cardsdetails">
          <div className="card">
            <div
              className="card-header p-3"
              style={{ backgroundColor: "rgb(126, 34, 206)" }}
            >
              <div className="card-header-flex">
                <h5 className="text-white m-0">
                  Cart Calculation
                  {cart.length > 0 ? `(${cart.length})` : ""}
                </h5>
              </div>
            </div>
            <div className="card-body p-0">
              {cart.length === 0 ? (
                <table className="table cart-table mb-0">
                  <tbody>
                    <tr>
                      <td colSpan={6}>
                        <div className="cart-empty">
                          <i className="fa fa-shopping-cart"></i>
                          <p>Your cart Is Empty</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="table cart-table mb-0 table-responsive-sm">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart?.map((p, index) => {
                      return (
                        <>
                          <tr>
                            <td>
                              <button
                                className="prdct-delete"
                                onClick={() => removecart(p._id)}
                              >
                                <i className="fa fa-trash-alt"></i>
                              </button>
                            </td>
                            <td>
                              <div className="product-img">
                                <img src={p.image} alt="" />
                              </div>
                            </td>
                            <td>
                              <div className="product-name">
                                <p>{p.name}</p>
                              </div>
                            </td>
                            <td>{p.description}</td>
                            <td>{p.quantity}</td>
                            <td>{p.price}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>&nbsp;</th>
                      <th colSpan={3}>&nbsp;</th>
                      <th className="text-right">
                        Total Price<span className="ml-2 mr-2">:</span>
                        <span className="text-danger">{totalPrice()}</span>
                      </th>
                      <th className="text-right">
                        <button
                          className="btn btn-success"
                          onClick={makePayment}
                          type="button"
                        >
                          Checkout
                        </button>
                      </th>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default CartPage;
