"use client";

import React, { useEffect, useState } from "react";
import { ProductsProps } from "../services/GetProducts";
import Image from "next/image";
import { Button } from "./ui/Button";
import { useProductContext } from "../context/ProductContext";
import useScreenProperties from "../hooks/useScreenProperties";

interface PropsProduct {
  product: ProductsProps;
}

export const CardProducts = ({ product }: PropsProduct) => {
  const { cart, removeFromCart, addToCart } = useProductContext();
  const [quantity, setQuantity] = useState(1);
  const { width } = useScreenProperties();

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const handleRemoveItem = (itemId: number) => {
    removeFromCart(itemId);
  };

  const handleAddToCart = (product: ProductsProps) => {
    addToCart(product, quantity);
  };

  return (
    <div className="mt-10 flex flex-row gap-2  justify-center text-left lg:text-nowrap ">
      {width ? (
        width <= 640 ? (
          ""
        ) : (
          <div className="w-[220px] h-[220px] ">
            <Image
              width={250}
              alt="."
              src={product.image}
              height={250}
              className="p-2 rounded-3xl bg-zinc-200"
            />
          </div>
        )
      ) : (
        ""
      )}
      <div className="w-[200px] font-semibold flex flex-col gap-2">
        <h1 className="text-[25px] font-bold ">{product.title}</h1>
        {product.stock >= 1
          ? `Stock Disponible: ${product.stock}`
          : "No disponible"}

        <p className="text-[20px]">${product.price.toLocaleString("es-ES")}</p>

        <p className="text-gray-600">{product.description}</p>

        {product.salesUnit === "group" ? (
          <div className="flex flex-row gap-3">
            Cantidad de palets:
            <input
              className="w-[45px] border border-black rounded-md text-center"
              min={1}
              type="number"
              max={product.stock}
              placeholder={product.quantity?.toString()}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <p>
              Unidades:
              <span className="text-[19px] font-bold">
                {Math.ceil(quantity * (product?.unitValue ?? 0))}
              </span>
            </p>
          </div>
        ) : product.salesUnit === "area" ? (
          <div className="flex flex-row gap-3">
            Cantidad de cajas:
            <input
              className="w-[45px] border border-black rounded-md text-center"
              min={1}
              max={product.stock}
              type="number"
              placeholder={product.quantity?.toString()}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <p>
              Cantidad cubierta:{" "}
              <span className="text-[19px] font-bold">
                {Math.ceil(quantity * (product?.unitValue ?? 0))}
              </span>
              m2
            </p>
          </div>
        ) : (
          <div className="flex flex-row gap-3">
            Cantidad:
            <input
              className="w-[45px] border border-black rounded-md text-center"
              min={1}
              type="number"
              max={product.stock}
              placeholder={product.quantity?.toString()}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
        )}

        <div>
          <Button
            title="Agregar al carrito"
            variant="Default"
            onClick={() => handleAddToCart(product)}
          />

          {cart.map((products, i) =>
            product.id === products.id ? (
              <Button
                key={i}
                title="Eliminar del carrito"
                variant=""
                onClick={() => handleRemoveItem(product.id)}
              />
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </div>
  );
};
