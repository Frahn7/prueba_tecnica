"use client";

import React, { useState } from "react";
import GetProducts from "../services/GetProducts";
import { CardProducts } from "./CardProducts";
import { Cart } from "./Cart";
import useScreenProperties from "../hooks/useScreenProperties";
import { IoCartOutline } from "react-icons/io5";
import { useProductContext } from "../context/ProductContext";

export const Products = () => {
  const { cart } = useProductContext();
  const { products } = GetProducts();
  const { width } = useScreenProperties();
  const [handleCart, setHandleCart] = useState(false);

  const sm =
    width && width <= 768
      ? "flex flex-col w-full justify-between"
      : "flex flex-row w-full justify-between";

  return (
    <div className="flex flex-row lg:w-[95%] shadow-2xl rounded-2xl w-full justify-between bg-white ">
      <div className={sm}>
        <div className="min-w-max px-10 self-center">
          {products.map((product, i) => (
            <CardProducts key={i} product={product} />
          ))}
        </div>
        {cart.length >= 1 && (
          <div className="self-center lg:fixed lg:bottom-0 lg:right-0  mt-10 p-1">
            <div className="border border-black rounded-full bg-black text-white text-center">
              <IoCartOutline
                className="text-[30px] p-1 mr-1 cursor-pointer "
                onClick={() => setHandleCart(!handleCart)}
              />
            </div>
          </div>
        )}

        {handleCart ||
          (cart.length >= 1 && (
            <div className="lg:bottom-0 lg:fixed lg:right-0 lg:mb-10">
              <Cart />
            </div>
          ))}
      </div>
    </div>
  );
};
