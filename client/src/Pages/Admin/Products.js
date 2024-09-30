import React, { useEffect, useState } from "react";
import AdminMenu from "../../Components/Layout/AdminMenu";
import GeneralLayout from "../../Components/Layout/GeneralLayout";
import bgImage from "../../assets/bg-boxed.jpg";
import axios from "axios";
import { toast } from "react-toastify";
const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.React_App_API}/api/v1/product/get-product`
      );
      setProducts(data?.products);
      console.log("nmsd", data);
    } catch (e) {
      console.log("nmasbd", e);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
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
          }}
        >
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1 className="text-center text-white">All Products</h1>
              <table className="table w-100 ">
                <thead>
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((p) => (
                    <tr key={p._id}>
                      <td>
                        <img
                          src={p.image}
                          alt={p.name}
                          style={{ width: "100px", height: "100px" }}
                        />
                      </td>
                      <td>{p.name}</td>
                      <td>
                        {p.category ? p.category.name : "No Category"}
                      </td>{" "}
                      {/* Render category name */}
                      <td>{p.description}</td>
                      <td>{p.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default Products;
