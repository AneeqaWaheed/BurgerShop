import React from "react";
import Navbar from "./Navbar";
const Header = () => {
  return (
    <>
      <Navbar />
      <section className="header-section">
        <img
          src="/Images/header1.jpg"
          alt="My Image"
          className="header-image"
        />
        <div className="header-text">
          <h1>Burger Shop</h1>
          <p>Where Every Bite is a Flavor Explosion.</p>
          <button type="button" class="btn btn-danger">
            Order Now
          </button>
        </div>
      </section>
      <section></section>
    </>
  );
};

export default Header;
