import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import GeneralLayout from "../../Components/Layout/GeneralLayout";
import "../../styles/register.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.React_App_API}/api/v1/auth/register`,
        { firstName, lastName, email, password, gender }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <GeneralLayout>
      <div className="register-container">
        <div className="register-form">
          <h1 className="text-center my-4 text-danger">Registration Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="firstName"
                className="form-label text-danger fw-semibold my-0 ms-1 fs-5"
              >
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="form-control px-3"
                id="firstName"
                placeholder="Enter Your Name"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="lastName"
                className="form-label text-danger fw-semibold my-0 ms-1 fs-5"
              >
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="form-control"
                id="lastName"
                placeholder="Enter Your Last Name"
                required
              />
            </div>
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
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
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
            <div className="mb-3 gender-container">
              <label
                htmlFor="gender"
                className="form-label text-danger fw-semibold my-0 ms-1 fs-5 mb-3"
              >
                Gender
              </label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    className="mx-2"
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={(e) => setGender(e.target.value)}
                    id="genderMale"
                    required
                  />
                  <label
                    className="form-check-label radio-label"
                    htmlFor="genderMale"
                  >
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="mx-2"
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={(e) => setGender(e.target.value)}
                    id="genderFemale"
                    required
                  />
                  <label
                    className="form-check-label radio-label"
                    htmlFor="genderFemale"
                  >
                    Female
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="mx-2"
                    type="radio"
                    name="gender"
                    value="other"
                    onChange={(e) => setGender(e.target.value)}
                    id="genderOther"
                    required
                  />
                  <label
                    className="form-check-label radio-label"
                    htmlFor="genderOther"
                  >
                    Other
                  </label>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-danger">
              Submit
            </button>
            <div className="container mt-3">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-danger fw-semibold">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div className="register-image">
          <img src="/Images/register.png" alt="Registration Illustration" />
        </div>
      </div>
    </GeneralLayout>
  );
};

export default Register;
