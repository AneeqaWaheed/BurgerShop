import React from "react";
import GeneralLayout from "../../Components/Layout/GeneralLayout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import bgImage from "../../assets/bg-boxed.jpg";
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <GeneralLayout title={"Admin DashBoard"} minHeight={"100%"}>
      <div
        className="container-fluid "
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
            <h3 className="text-white m-3 mt-5">
              WELLCOME "{auth?.user?.firstName + " " + auth?.user?.lastName}" TO
              ADMIN DASHBOARD
            </h3>
            <p className="text-white mx-4">
              We really appreciate your contribution to the Application{" "}
            </p>
          </div>
          {/* <div className="col-md-9">
            <div className="card">
              <h3>
                Admin Name: {auth?.user?.firstName + " " + auth?.user?.lastName}
              </h3>
              <h3>Admin Email: {auth?.user?.email}</h3>
              <h3>Admin Gender: {auth?.user?.gender}</h3>
            </div>
          </div> */}
        </div>
      </div>
    </GeneralLayout>
  );
};

export default AdminDashboard;
