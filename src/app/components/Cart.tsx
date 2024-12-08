"use client";

import Image from "next/image";
import { useProductContext } from "../context/ProductContext";
import { Button } from "./ui/Button";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { RiSubtractLine } from "react-icons/ri";

export const Cart = () => {
  const { cart, addToCart, removeFromCart, reduceQuantityCart } =
    useProductContext();

  return (
    <div className="text-center shadow-lg bg-gray-300 rounded-br-[40px] lg:mx-2  max-w-full flex flex-col gap-2 rounded-lg max-h-[450px] overflow-y-scroll">
      <h1 className="text-[17px] font-bold mt-2">Carrito</h1>
      <div className="mt-[20px] p-2">
        {cart.map((product, i) => (
          <div
            key={i}
            className="flex flex-col border border-black rounded-[10px] p-3 mb-7 text-right"
          >
            <div className="flex flex-row max-w-[350px] min-w-[350px]">
              <Image
                alt="."
                src={product.image}
                width={60}
                height={60}
                className="max-h-[60px] "
              />
              <p className="text-[16px] ml-2 mr-4">{product.title}</p>
            </div>
            <div className="text-center ">
              Precio:{" "}
              <span className="font-bold mr-4">
                {product.price.toLocaleString("es-ES")}
              </span>
              Cantidad: <span className="font-bold">{product.quantity}</span>
            </div>
            <span className="flex justify-center flex-row gap-5 text-[25px] mt-2">
              <IoMdAdd
                className=" cursor-pointer hover:text-gray-600"
                onClick={() => addToCart(product, 1)}
              />
              <RiSubtractLine
                className=" cursor-pointer hover:text-gray-600"
                onClick={() => reduceQuantityCart(product.id)}
              />
              <MdDelete
                className="text-red-500 cursor-pointer hover:text-gray-600"
                onClick={() => removeFromCart(product.id)}
              />
            </span>
          </div>
        ))}
        <div>
          <p className="font-bold text-[19px]">
            Total: $
            {cart
              .reduce(
                (total, product) => total + product.price * product.quantity,
                0
              )
              .toLocaleString("es-ES")}
          </p>
        </div>
      </div>
      {cart.length <= 0 ? null : (
        <Button
          title="Comprar"
          variant="Default"
          className="px-2"
          style={{ width: "50%", alignSelf: "center" }}
        />
      )}
    </div>
  );
};
