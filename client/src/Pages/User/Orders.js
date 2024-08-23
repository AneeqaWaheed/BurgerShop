import React from "react";
import UserMenu from "../../Components/Layout/UserMenu";
import GeneralLayout from "../../Components/Layout/GeneralLayout";

const Orders = () => {
  return (
    <GeneralLayout title={"My Orders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">All Orders</div>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default Orders;
