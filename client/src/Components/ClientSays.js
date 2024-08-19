import React from "react";
import "../styles/clientsays.css";
import Clients from "../data/ClientSays";
const ClientSays = () => {
  return (
    <div className="bg-client">
      <h1 className="clientsSays text-center">What Our Clients says</h1>
      <div>
        {Clients.map((reviews) => (
          <div key={reviews.id} className="burger-category">
            <img
              src={reviews.imgURL}
              alt={reviews.name}
              className="client-image"
            />
            <p className="text-center w-50 my-4">{reviews.desc}</p>
            <h3 className="burger-title text-danger">{reviews.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientSays;
