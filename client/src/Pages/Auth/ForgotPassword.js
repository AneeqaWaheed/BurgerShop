import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import GeneralLayout from "../../Components/Layout/GeneralLayout";
import "../../styles/register.css";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  //form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.React_App_API}/api/v1/auth/forgot-password`,
        { email }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };
  return (
    <GeneralLayout title={"ForgotPassword - BurgerShop"}>
      <div className="register-container">
        <div className="register-form">
          <h1 className="text-center my-4 text-danger">Forgot Password</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="form-label text-danger fw-semibold my-0 ms-1 fs-5"
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="email"
                placeholder="Enter Your Email"
                required
              />
              <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>

            <button type="submit" className="btn btn-danger">
              Send Email
            </button>
          </form>
        </div>
        <div className="register-image">
          <img src="/Images/login.jpg" alt="Registration Illustration" />
        </div>
      </div>
    </GeneralLayout>
  );
};

export default ForgotPassword;
