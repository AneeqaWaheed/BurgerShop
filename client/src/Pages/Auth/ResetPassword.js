import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import GeneralLayout from "../../Components/Layout/GeneralLayout";
import "../../styles/register.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`/api/auth/reset-password/${token}`, {
        password,
      });
      setMessage(response.data.message);
      if (response.data.success) {
        navigate("/login");
      }
    } catch (err) {
      setMessage("Error resetting password");
    }
  };

  return (
    <GeneralLayout title={"Login - BurgerShop"}>
      <div className="register-container">
        <div className="register-form">
          <h1 className="text-center my-4 text-danger">Reset Password</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="form-label text-danger fw-semibold my-0 ms-1 fs-5"
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="password"
                placeholder="Enter Your Password"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label text-danger fw-semibold my-0 ms-1 fs-5"
              >
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control"
                id="password"
                placeholder="Confirm new password"
                required
              />
            </div>
            <div className="container mt-3">
              <p className="text-danger fw-normal">
                {message && <p>{message}</p>}
              </p>
            </div>
            <button type="submit" className="btn btn-danger">
              Reset Password
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

export default ResetPassword;
