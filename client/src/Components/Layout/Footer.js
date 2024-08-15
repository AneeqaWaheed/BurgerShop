import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="bg-dark text-light p-3 m-0 card-footer  ">
      <h4 className="text-center fs-6">All Rights &copy; Aneeqa Waheed</h4>
      <p className="text-center mt-3 ftr">
        <Link to="/about" className="m-2 text-decoration-none text-white hvr">
          About
        </Link>
        |
        <Link to="/contact" className="m-2 text-decoration-none text-white hvr">
          Contact
        </Link>
        |
        <Link to="/menu" className="m-2 text-decoration-none text-white hvr">
          Menu
        </Link>
      </p>
    </div>
  );
};

export default Footer;
