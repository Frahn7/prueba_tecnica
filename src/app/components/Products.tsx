import React from "react";
import GetProducts from "./GetProducts";
import { CardProducts } from "./CardProducts";
import { Cart } from "./Cart";

export const Products = () => {
  const { products } = GetProducts();
  return (
    <div className="flex flex-row w-full px-20 justify-between">
      <div className="flex flex-row w-full justify-between">
        <div className="min-w-max">
          {products.map((product, i) => (
            <CardProducts key={i} product={product} />
          ))}
        </div>
        <div className="">
          <Cart />
        </div>
      </div>
    </div>
  );
};
