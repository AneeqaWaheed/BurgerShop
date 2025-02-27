// ProductCard.js
import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { image, name, price, description } = product;
  console.log("asbndasdnasm", product);
  // const shortDesc = description.split(" ").slice(0, 10).join(" ");
  return (
    <Link
      to={`/Productpage/${product._id}`}
      style={{
        textDecoration: "none",
      }}
    >
      <Card className="m-3" style={{ width: "18rem", marginRight: "3px" }}>
        <Card.Img
          variant="top"
          src={image}
          alt={name}
          style={{ objectFit: "cover", height: "200px" }}
        />
        <Card.Body className="text-start">
          <Card.Title>{name}</Card.Title>
          {/* <Card.Text>{shortDesc}</Card.Text> */}
          <Card.Text>${price}</Card.Text>
          <Button variant="danger">Order Now</Button>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ProductCard;
