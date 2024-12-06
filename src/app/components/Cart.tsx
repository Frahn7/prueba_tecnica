"use client";

import Image from "next/image";
import { useProductContext } from "../context/ProductContext";
import { Button } from "./ui/Button";

export const Cart = () => {
  const { cart } = useProductContext();

  return (
    <div className="text-center bg-gray-300 max-w-full flex flex-col gap-2 rounded-xl">
      <h1 className="text-[20px] font-bold mt-2">Carrito</h1>
      <div className="mt-[20px] p-3">
        {cart.map((product, i) => (
          <div
            key={i}
            className="flex flex-col border border-black rounded-[10px] p-4 mb-7 text-right"
          >
            <div className="flex flex-row ">
              <Image alt="." src={product.image} width={80} height={80} />
              <p className="text-[18px]">{product.title}</p>
            </div>
            <div className="text-center ">
              Precio:{" "}
              <span className="font-bold mr-4">
                {product.price.toLocaleString("es-ES")}
              </span>
              Cantidad: <span className="font-bold">{product.quantity}</span>
            </div>
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
      <Button
        title="Comprar"
        variant="Default"
        className="px-2"
        style={{ width: "50%", alignSelf: "center" }}
      />
    </div>
  );
};
