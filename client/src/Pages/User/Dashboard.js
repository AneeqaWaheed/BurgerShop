import React from "react";
import GeneralLayout from "../../Components/Layout/GeneralLayout";
import UserMenu from "../../Components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <GeneralLayout title={"Dashboard"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-3">
            <div className="card p-3">
              <h3>{auth?.user?.firstName + " " + auth?.user?.lastName}</h3>
              <h3>{auth?.user?.email}</h3>
              <h3>{auth?.user?.gender}</h3>
            </div>
          </div>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default Dashboard;
