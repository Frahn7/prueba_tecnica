import React from "react";
import GetProducts from "./GetProducts";
import { CardProducts } from "./CardProducts";

export const Products = () => {
  const { products } = GetProducts();
  return (
    <div className="w-full mb-10">
      {products.map((product, i) => (
        <CardProducts key={i} product={product} />
      ))}
    </div>
  );
};
