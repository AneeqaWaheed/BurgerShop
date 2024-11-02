import React, { useEffect, useState } from "react";
import UserMenu from "../../Components/Layout/UserMenu";
import GeneralLayout from "../../Components/Layout/GeneralLayout";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Number of products per page
  const [auth] = useAuth();
  const userId = auth?.userId;
  console.log("asdasdnas", auth);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.React_App_API}/api/v1/orders/user/${userId}`
        );
        console.log(response);
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Calculate the index of the last product on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  // Calculate the index of the first product on the current page
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // Get the current products
  const currentProducts = orders.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle pagination
  const totalPages = Math.ceil(orders.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <GeneralLayout title={"My Orders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row mx-3">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 ">
            <h1 className="text-center">Your Orders</h1>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Product Name</th>
                  <th scope="col">Product Price</th>
                  <th scope="col">Product Category</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total Amount</th>
                </tr>
              </thead>

              <tbody>
                {currentProducts.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  currentProducts.map((order) =>
                    order.items.map((item) => (
                      <tr key={item._id}>
                        <td>{item.productId.name}</td>
                        <td>{item.productId.price}</td>
                        <td>{item.productId.category?.name}</td>
                        <td>{item.quantity}</td>
                        <td>{order.totalAmount}</td>
                      </tr>
                    ))
                  )
                )}
              </tbody>
            </table>
            {/* Pagination Controls */}
            <div className="pagination-controls d-flex align-items-baseline justify-content-end">
              <button
                className="btn btn-danger"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span className="mx-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn-danger"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default Orders;
