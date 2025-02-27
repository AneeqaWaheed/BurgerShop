import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import { Button } from "react-bootstrap"; // Import Button from react-bootstrap
import { toast } from "react-toastify";
import ProductsList from "./ProductList";
import { Link } from "react-router-dom";
import "../styles/menu.css";

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
        console.log("Categories:", data?.category);
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
        console.log("Products:", data);
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
      <div className="container-fluid">
        <div className="d-flex flex-column">
          {/* Category filter buttons on the left */}
          <div className="d-flex flex-wrap justify-content-center category-filter">
            <ul className="d-flex flex-wrap justify-content-center p-0 m-0">
              <li className="list-unstyled mx-3 w-auto">
                <Link
                  onClick={() => handleCategoryChange("All")}
                  style={{
                    margin: "5px",
                    padding: "10px 15px",
                    color: selectedCategory === "All" ? "red" : "black",
                    fontSize: "18px",
                    textDecoration: "none",
                    display: "block",
                    borderRadius: "5px",
                    whiteSpace: "nowrap",
                    letterSpacing: "2px",
                    transition: "all 0.3s ease",
                  }}
                >
                  All
                </Link>
              </li>

              {categories.map((category) => (
                <li key={category.id} className="list-unstyled mx-3 w-auto">
                  <Link
                    onClick={() => handleCategoryChange(category.name)}
                    style={{
                      margin: "5px",
                      padding: "10px 15px",
                      color:
                        selectedCategory === category.name ? "red" : "black",
                      fontSize: "18px",
                      textDecoration: "none",
                      display: "block",
                      borderRadius: "5px",
                      whiteSpace: "nowrap",
                      letterSpacing: "2px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products list on the right */}
          <div className=" my-4 w-100">
            {/* <h1 className="text-center text-danger">Our Menu</h1> */}
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
      </div>
    </Layout>
  );
};

export default Menu;
