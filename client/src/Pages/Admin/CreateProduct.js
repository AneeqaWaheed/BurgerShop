import React, { useState, useEffect } from "react";
import GeneralLayout from "../../Components/Layout/GeneralLayout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import bgImage from "../../assets/bg-boxed.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
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
  const [loading, setLoading] = useState(false); // Add loading state

  // Get all categories
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

  // Create product function
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
      // Set loading state to true when the request starts
      setLoading(true);

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
        navigate("/dashboard/admin/product");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error("Something went wrong");
    } finally {
      // Set loading state to false when the request ends
      setLoading(false);
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
          backgroundAttachment: "fixed",
          height: "100vh",
          width: "100%",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="row"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            flex: "1",
            display: "flex",
            flexDirection: "row",
            padding: "50px",
          }}
        >
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div
            className="col-md-9"
            style={{
              maxHeight: "80vh", // Restrict the height for the form area
              overflowY: "auto",
            }}
          >
            <h1 className="text-white">Create Product</h1>
            <div className="m-1">
              <Select
                placeholder="select a category"
                showSearch
                autoClearSearchValue
                onBlur={(e) => {
                  e.target.blur();
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
                    onChange={(e) => setImageUpload(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              <div className="mb-3">
                {imageUpload && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(imageUpload)}
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
                  disabled={loading} // Disable button while loading
                >
                  {loading ? "Creating..." : "Create Product"}
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
