import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/AdminMenu.css";
const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div class="list-group">
          <h4 className="text-white">Admin Panel</h4>
          <div>
            <NavLink
              to="/dashboard/admin/create-category"
              aria-current="page"
              className="list-group-item list-group-item-action "
              activeClassName="active-link"
            >
              Create Category
            </NavLink>
            <NavLink
              to="/dashboard/admin/create-product"
              className="list-group-item list-group-item-action "
            >
              Create Product
            </NavLink>
            <NavLink
              to="/dashboard/admin/product"
              className="list-group-item list-group-item-action "
            >
              Products
            </NavLink>
            <NavLink
              to="/dashboard/admin/users"
              className="list-group-item list-group-item-action "
            >
              Users
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
