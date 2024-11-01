import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import { Button } from "react-bootstrap"; // Import Button from react-bootstrap
import { toast } from "react-toastify";
import ProductsList from "./ProductList";
import { Link } from "react-router-dom";
import axios from "axios";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Total pages from the backend

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.React_App_API}/api/v1/category/get-category`
        );
        const data = await response.json();
        console.log("nsbnsmf", data?.category);
        setCategories(data?.category);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${
            process.env.React_App_API
          }/api/v1/product/product-list?page=${page}&category=${
            selectedCategory === "All" ? "" : selectedCategory
          }`
        );

        const data = await response.json();
        console.log("snbdsfns", data);
        if (data?.success) {
          setProducts(data.products || []);
          setTotalPages(data.totalPages || 1); // Assuming your backend returns total pages
        } else {
          toast.error("Failed to load products.");
        }
      } catch (error) {
        console.error("API Error:", error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    fetchCategories();
  }, [page, selectedCategory]); // Fetch when page or selected category changes

  // Handle category filter
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1); // Reset to the first page when category changes
  };

  return (
    <Layout title="Menu - BurgerShop">
      <div style={{ display: "flex" }}>
        {/* Category filter buttons on the left */}
        <div
          style={{ flex: "0 0 200px", marginRight: "20px" }}
          className="mb-5"
        >
          <h5 className="mb-3 ms-3">Filters by Category</h5>
          <ul className="">
            <li className="list-group-item">
              <Link
                onClick={() => handleCategoryChange("All")}
                style={{
                  margin: "5px",
                  padding: "10px",
                  color: selectedCategory === "All" ? "red" : "black",
                  width: "100%", // Make buttons full width

                  textDecoration: "none", // Remove underline
                  display: "block", // Makes the entire button area clickable
                }}
              >
                All
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.id} className="list-group-item">
                <Link
                  onClick={() => handleCategoryChange(category.name)}
                  style={{
                    margin: "5px",
                    padding: "10px",
                    color: selectedCategory === category.name ? "red" : "black",

                    width: "100%", // Make buttons full width

                    textDecoration: "none", // Remove underline
                    display: "block", // Makes the entire button area clickable
                  }}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Products list on the right */}
        <div style={{ flex: "1" }} className="m-4">
          <h1 className="text-center text-danger">Our Menu</h1>
          {loading ? (
            <p className="text-center mt-5">Loading products...</p>
          ) : (
            <>
              <ProductsList products={products} />
              {/* Pagination Controls */}
              <div className="d-flex justify-content-center mt-4">
                <Button
                  variant="danger"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="mx-3 align-self-center">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="danger"
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Menu;
