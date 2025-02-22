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
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;
const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [id, setId] = useState("");
  console.log("nsabdmans", params);
  // get Single Product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.React_App_API}/api/v1/product/single-product/${params.id}`
      );
      console.log("asdjashdjas", data);
      setName(data?.product?.name);
      setId(data?.product?._id);
      setDescription(data?.product?.description);
      setPrice(data?.product?.price);
      setCategory(data?.product?.category);
      setImage(data?.product?.image);
    } catch (error) {
      console.log("error ", error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
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
  console.log(category);
  // create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!imageUpload && !image) {
        toast.error("Please upload an image before submitting!");
        return; // Stop the function if no image is uploaded and no default image exists
      }

      const productData = new FormData();
      productData.append("name", name);
      productData.append("category", category._id);
      productData.append("description", description);
      productData.append("price", price);

      if (imageUpload) {
        const imageRef = ref(storage, `/${imageUpload.name + v4()}`);
        // Upload image to Firebase storage
        await uploadBytes(imageRef, imageUpload);
        // Get the image URL from Firebase
        const downloadURL = await getDownloadURL(imageRef);
        // Append the image URL to productData
        productData.append("image", downloadURL);
      } else {
        // If no new image is uploaded, append the existing image
        productData.append("image", image); // Existing image
      }
      // Send the formData to the server
      const { data } = await axios.put(
        `${process.env.React_App_API}/api/v1/product/update-product/${id}`,
        productData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data?.success) {
        toast.success("Product updated successfully!");
        navigate("/dashboard/admin/product");
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
          backgroundAttachment: "fixed",
          height: "100vh",
          width: "100%",
          margin: 0,
          padding: 0,
          display: "flex", // Use flexbox for layout
          flexDirection: "column", // Stack children vertically
        }}
      >
        <div
          className="row"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            flex: "1", // Allow this to grow
            display: "flex", // Use flexbox
            flexDirection: "row", // Arrange children in a row
            padding: "50px",
          }}
        >
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div
            className="col-lg-9 col-md-8 col-sm-12"
            style={{
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            {" "}
            {/* Enable scrolling here */}
            <h1 className="text-white text-center">Update Product</h1>
            <div
              className="m-1 bg-body-secondary p-4 rounded shadow"
              // style={{ backgroundColor: "rgb(176, 98, 98)" }}
            >
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
                value={category.name}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12 bg-white color-black">
                  {imageUpload
                    ? imageUpload.name
                    : image
                    ? "Change Image"
                    : "Upload Image"}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImageUpload(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              {/* <div className="mb-3 text-center"> */}
              {imageUpload ? (
                <div className="text-center mb-3">
                  <img
                    src={URL.createObjectURL(imageUpload)}
                    alt="Product Image"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              ) : (
                image && (
                  <div className="text-center mb-3">
                    <img
                      src={image} // Use the existing image URL
                      alt="Product Image"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )
              )}
              {/* </div> */}

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
                  onClick={handleUpdate}
                >
                  Update Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default UpdateProduct;
