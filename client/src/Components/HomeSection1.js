import React from "react";
import "../styles/HomeSection1.css";
const HomeSection1 = () => {
  return (
    <>
      <div className="overflow-x-hidden shadow-lg p-3 mb-5 bg-body-tertiary rounded story-container">
        <div className="story-img">
          <img src="Images/about.jpg" alt="" />
        </div>
        <div className="story-para py-4">
          <h1 className="text-danger story-heading ">Our Story</h1>
          <p className="text-body-secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit in
            quia at? Quae dicta, ad officiis recusandae quidem rem modi! Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Laudantium, quos
            eos praesentium atque a repellendus omnis, debitis eius, unde illum
            similique. Odio recusandae dolorum reprehenderit quo tenetur non
            consequuntur quam?
          </p>
          <button type="button" class="btn btn-danger">
            View More
          </button>
        </div>
      </div>
    </>
  );
};

export default HomeSection1;
