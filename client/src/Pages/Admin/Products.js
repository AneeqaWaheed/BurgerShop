import React, { useEffect, useState } from "react";
import AdminMenu from "../../Components/Layout/AdminMenu";
import GeneralLayout from "../../Components/Layout/GeneralLayout";
import bgImage from "../../assets/bg-boxed.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); // Number of products per page

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.React_App_API}/api/v1/product/get-product`
      );
      setProducts(data?.products);
      console.log("asnbansm", data);
    } catch (e) {
      console.log("nmasbd", e);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.React_App_API}/api/v1/product/delete-product/${id}`
      );

      // Check the response data to ensure the deletion was successful
      if (response.data.success) {
        toast.success("Product Deleted Successfully");
        // Optionally, re-fetch the products to update the UI
        getAllProducts(); // Ensure this function is defined and retrieves products again
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      toast.error("Error deleting Product");
      console.log("Error deleting Product", error);
    }
  };

  // Calculate the index of the last product on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  // Calculate the index of the first product on the current page
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // Get the current products
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle pagination
  const totalPages = Math.ceil(products.length / productsPerPage);

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
    <GeneralLayout>
      <div
        className="container-fluid"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed", // Keeps the background fixed during scrolling
          height: "100vh", // Sets the height to cover the full viewport height
          width: "100%", // Sets the width to cover the full viewport width
          margin: 0, // Removes default margins
          padding: 0,
        }}
      >
        <div
          className="row"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            height: "100vh",
            width: "100%",
            padding: "50px",
            margin: "0px",
            overflowY: "auto",
          }}
        >
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1 className="text-center text-white">All Products</h1>

              {/* Responsive Table Wrapper */}
              <div className="table-responsive">
                <table className="table table-striped table-bordered text-center">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">Name</th>
                      <th scope="col">Category</th>
                      <th scope="col">Description</th>
                      <th scope="col">Price</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentProducts.map((p) => (
                      <tr key={p._id}>
                        <td>
                          <img
                            src={p.image}
                            alt={p.name}
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                            className="img-fluid rounded"
                          />
                        </td>
                        <td>{p.name}</td>
                        <td>{p.category ? p.category.name : "No Category"}</td>
                        <td>
                          {p.description.split(" ").slice(0, 10).join(" ")}
                          {p.description.split(" ").length > 10 ? " . . ." : ""}
                        </td>
                        <td>${p.price}</td>
                        <td>
                          <div className="d-flex flex-wrap justify-content-center">
                            <Link to={`/dashboard/admin/product/${p._id}`}>
                              <button className="btn btn-success mb-1">
                                Update
                              </button>
                            </Link>

                            <button
                              className="btn btn-danger ms-2 mb-1"
                              onClick={() => handleDelete(p._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="pagination-controls d-flex align-items-center justify-content-center mt-3">
                <button
                  className="btn btn-danger me-2"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <span className="text-white">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="btn btn-danger ms-2"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default Products;
