import React from "react";
import GeneralLayout from "../../Components/Layout/GeneralLayout";
import AdminMenu from "../../Components/Layout/AdminMenu";

const CreateProduct = () => {
  return (
    <GeneralLayout title={"DashBoard - Products"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
          </div>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default CreateProduct;
