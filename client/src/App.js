import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import PageNotFound from "./Pages/PageNotFound";
import Menu from "./Pages/Menu";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Cart from "./Pages/Cart";
import Dashboard from "./Pages/User/Dashboard";
import PrivateRoute from "./Components/Routes/Private";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import ResetPassword from "./Pages/Auth/ResetPassword";
import AdminRoute from "./Components/Routes/AdminRoute";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import CreateCategory from "./Pages/Admin/CreateCategory";
import CreateProduct from "./Pages/Admin/CreateProduct";
import Users from "./Pages/Admin/Users";
import Orders from "./Pages/User/Orders";
import Profile from "./Pages/User/Profile";
import ContactPage from "./Pages/ContactPage";
import Products from "./Pages/Admin/Products";
import UpdateProducts from "./Pages/Admin/UpdateProduct";
import ProductPage from "./Pages/productPage";
import CartPage from "./Pages/Orders/orders";
import Checkout from "./Pages/Checkout";
import AdminOrders from "./Pages/Admin/Orders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/cart" element={<CartPage />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product" element={<Products />} />
          <Route path="admin/product/:id" element={<UpdateProducts />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>

        <Route path="/Productpage/:id" element={<ProductPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/checkout-success/success" element={<Checkout />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
