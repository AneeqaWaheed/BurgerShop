import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaBurger } from "react-icons/fa6";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import "../../styles/navbar.css";
import { useCart } from "../../context/cart";
const Navbar = ({ backgroundColor, textColor, linkColor, position }) => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const handleLogout = () => {
    toast.success("Logout Successfully");
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");

    navigate("/login");
  };
  return (
    <>
      <nav
        className="navbar navbar-expand-lg "
        style={{ backgroundColor: backgroundColor, position: position }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand text-white fw-bold" to="/">
              <FaBurger className="faburger" />
              Burger Shop
            </Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link  text-white"
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link  text-white"
                  aria-current="page"
                  to="/menu"
                >
                  Menu
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link  text-white">
                  Contact
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link text-white" to="/login">
                      Sign Up / Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <div class="dropdown">
                    <button
                      class="btn dropdown-toggle text-white"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.firstName + " " + auth?.user?.lastName}
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="nav-link text-dark"
                        >
                          DashBoard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="nav-link text-dark"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </>
              )}
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/cart">
                  Cart {cart.length > 0 ? `(${cart.length})` : "(0)"}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
