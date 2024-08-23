import React from "react";
import AdminMenu from "../../Components/Layout/AdminMenu";
import GeneralLayout from "../../Components/Layout/GeneralLayout";

const CreateCategory = () => {
  return (
    <GeneralLayout title={"DashBoard - Category"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Category</h1>
          </div>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default CreateCategory;
