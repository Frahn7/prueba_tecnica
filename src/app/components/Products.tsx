"use client";

import React from "react";
import GetProducts from "../services/GetProducts";
import { CardProducts } from "./CardProducts";
import { Cart } from "./Cart";
import { useProductContext } from "../context/ProductContext";
import useScreenProperties from "../hooks/useScreenProperties";

export const Products = () => {
  const { products } = GetProducts();
  const { cart } = useProductContext();
  const { width } = useScreenProperties();

  const sm =
    width && width <= 768
      ? "flex flex-col w-full justify-between"
      : "flex flex-row w-full justify-between";

  return (
    <div className="flex flex-row w-full justify-between">
      <div className={sm}>
        <div className="min-w-max px-10">
          {products.map((product, i) => (
            <CardProducts key={i} product={product} />
          ))}
        </div>
        <div className="max-w-[500px] lg:fixed lg:top-0 lg:right-0 sm:self-center mt-10">
          {cart.length >= 1 && <Cart />}
        </div>
      </div>
    </div>
  );
};
