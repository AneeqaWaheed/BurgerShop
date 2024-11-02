import React from "react";
import { toast } from "react-toastify";
import { useCart } from "../../context/cart";
import GeneralLayout from "../../Components/Layout/GeneralLayout";
import { useAuth } from "../../context/auth";
import "./orderStyle.css";

const CartPage = () => {
  const { cart, setCart } = useCart();
  const [auth] = useAuth();

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
      cart?.forEach((item) => {
        if (item.price && item.quantity) {
          total += item.price * item.quantity;
        }
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
      return "$0.00";
    }
  };

  const makePayment = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      };
      const userId = auth.userId;
      const order = cart.map((item) => ({
        _id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        images: [item.image],
        quantity: item.quantity,
      }));

      const response = await fetch(
        `${process.env.React_App_API}/api/v1/payment/checkout`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ order, userId }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message + " Please try again");
      }
      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <GeneralLayout title="Cart - BurgerShop">
      <div className="row justify-content-center m-0">
        <div className="col-md-8 mt-5 mb-5 cardsdetails">
          <div className="card">
            <div
              className="card-header p-3"
              style={{ backgroundColor: "rgb(140, 16, 10)" }}
            >
              <h5 className="text-white m-0">
                Cart Calculation
                {cart.length > 0 ? `(${cart.length})` : ""}
              </h5>
            </div>
            <div className="card-body p-0">
              {cart.length === 0 ? (
                <div className="cart-empty text-center">
                  <i className="fa fa-shopping-cart"></i>
                  <p>Your cart Is Empty</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table cart-table mb-0">
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
                      {cart.map((p) => (
                        <tr key={p._id}>
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
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>&nbsp;</th>
                        <th colSpan={3}>&nbsp;</th>
                        <th className="text-right">
                          Total Price:{" "}
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default CartPage;
