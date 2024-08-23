import React from "react";
import GeneralLayout from "../../Components/Layout/GeneralLayout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <GeneralLayout title={"Admin DashBoard"}>
      <div className="container-fluid m-3 p-3 ">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card">
              <h3>
                Admin Name: {auth?.user?.firstName + " " + auth?.user?.lastName}
              </h3>
              <h3>Admin Email: {auth?.user?.email}</h3>
              <h3>Admin Gender: {auth?.user?.gender}</h3>
            </div>
          </div>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default AdminDashboard;
