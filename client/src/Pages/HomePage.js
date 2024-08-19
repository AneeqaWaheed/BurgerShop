import React from "react";
import Layout from "../Components/Layout/Layout";
import HomeSection1 from "../Components/HomeSection1.js";
import BurgerCategories from "../Components/BurgerCategories.js";
import Contact from "../Components/Contact.js";
import ClientSays from "../Components/ClientSays.js";
const HomePage = () => {
  return (
    <Layout title="Home">
      <HomeSection1 />
      <BurgerCategories />
      <ClientSays />
      <Contact />
    </Layout>
  );
};

export default HomePage;
