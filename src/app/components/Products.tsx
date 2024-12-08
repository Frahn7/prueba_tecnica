"use client";

import React, { useState } from "react";
import GetProducts from "../services/GetProducts";
import { CardProducts } from "./CardProducts";
import { Cart } from "./Cart";
import useScreenProperties from "../hooks/useScreenProperties";
import { IoCartOutline } from "react-icons/io5";
import { useProductContext } from "../context/ProductContext";
import { InputSearch } from "./ui/InputSearch";

export const Products = () => {
  const { cart } = useProductContext();
  const { products } = GetProducts();
  const { width } = useScreenProperties();
  const [handleCart, setHandleCart] = useState(false);
  const [filterProducts, setFilterProducts] = useState("");

  const sm =
    width && width <= 768
      ? "flex flex-col w-full justify-between"
      : "flex flex-row w-full justify-between";

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(filterProducts.toLowerCase())
  );

  return (
    <div className="flex flex-row lg:w-[95%] shadow-2xl rounded-2xl w-full justify-between bg-white ">
      <div className={sm}>
        <div className="min-w-max px-10 self-center">
          <div className="flex justify-start">
            <InputSearch onChange={(e) => setFilterProducts(e.target.value)} />
          </div>
          {filteredProducts.map((product, i) => (
            <CardProducts key={i} product={product} />
          ))}
        </div>
        {cart.length >= 1 && (
          <div className="self-center lg:fixed lg:bottom-0 lg:right-0  mt-10 p-1 z-10">
            <div className="border border-black rounded-full flex-row flex p-1 bg-black text-white text-center">
              <IoCartOutline
                className="text-[30px] p-1 mr-1 cursor-pointer "
                onClick={() => setHandleCart(!handleCart)}
              />
              {cart.length}
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
