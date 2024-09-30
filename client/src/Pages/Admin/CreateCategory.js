import React, { useState, useEffect } from "react";
import AdminMenu from "../../Components/Layout/AdminMenu";
import GeneralLayout from "../../Components/Layout/GeneralLayout";
import { toast } from "react-toastify";
import CategoryForm from "../../Components/Form/CategoryForm";
import axios from "axios";
import { Modal } from "antd";
import bgImage from "../../assets/bg-boxed.jpg";
import "../../styles/createCategory.css";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.React_App_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} category is created successfully`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };
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

  //hanlde update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.React_App_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  //hanlde delete
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.React_App_API}/api/v1/category/delete-category/${id}`
      );
      if (data?.success) {
        toast.success(`category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <GeneralLayout title={"DashBoard - Category"}>
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
          className="row "
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
          <div className="col-md-9 ">
            <h1 className="text-danger">Manage Category</h1>
            <div className="mb-3">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div>
              <table className="table w-100 ">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {categories.map((c) => (
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                </tbody>
              </table>
            </div>
            <Modal
              className="p-2"
              title="Update Category"
              open={visible}
              onCancel={() => setVisible(false)}
              onOk={() => setVisible(false)}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default CreateCategory;
