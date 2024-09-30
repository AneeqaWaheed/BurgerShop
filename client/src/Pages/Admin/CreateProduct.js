import React, { useState, useEffect } from "react";
import GeneralLayout from "../../Components/Layout/GeneralLayout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import bgImage from "../../assets/bg-boxed.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { getDownloadURL } from "firebase/storage";
import { Button, Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [imageUpload, setImageUpload] = useState(null);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.React_App_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  // create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (!imageUpload) {
        toast.error("Please upload an image before submitting!");
        return; // Stop the function if no image is uploaded
      }

      const productData = new FormData();
      productData.append("name", name);
      productData.append("category", category);
      productData.append("description", description);
      productData.append("price", price);

      const imageRef = ref(storage, `/${imageUpload.name + v4()}`);
      // Upload image to Firebase storage
      const snapshot = await uploadBytes(imageRef, imageUpload);
      // Get the image URL from Firebase
      const downloadURL = await getDownloadURL(imageRef);

      // Update the formData with the image URL
      productData.append("image", downloadURL);

      // Send the formData to the server
      const { data } = await axios.post(
        `${process.env.React_App_API}/api/v1/product/create-product`,
        productData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data?.success) {
        toast.success("Product created successfully!");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error("Something went wrong");
    }
  };

  return (
    <GeneralLayout title={"DashBoard - Products"}>
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
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-white">Create Product</h1>
            <div className="m-1">
              <Select
                placeholder="select a category"
                showSearch
                autoClearSearchValue
                onBlur={(e) => {
                  e.target.blur(); // Manually blur the input after selection
                }}
                className="form-select p-0 mb-3"
                size="large"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12 bg-white color-black">
                  {imageUpload ? imageUpload.name : "Upload Image"}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImageUpload(e.target.files[0])} // Use setImageUpload here
                    hidden
                  />
                </label>
              </div>

              <div className="mb-3">
                {imageUpload && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(imageUpload)} // Use imageUpload for preview
                      alt="Product Image"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write name of Product"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={description}
                  placeholder="Write Description of Product"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Write Price of Product"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-danger form-control"
                  onClick={handleCreate}
                >
                  Create Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default CreateProduct;
