"use client";

import React, { useEffect, useState } from "react";
import { ProductsProps } from "./GetProducts";
import Image from "next/image";
import { Button } from "./ui/Button";
import { useProductContext } from "../context/ProductContext";

interface PropsProduct {
  product: ProductsProps;
}

export const CardProducts = ({ product }: PropsProduct) => {
  const { cart, removeFromCart, addToCart } = useProductContext();
  const [quantity, setQuantity] = useState(1);

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
    <div className="mt-10 flex flex-row gap-2 justify-center text-left text-nowrap ">
      <div className="w-[250px] h-[250px]">
        <Image
          width={250}
          alt="."
          src={product.image}
          height={250}
          className="p-2 rounded-3xl bg-zinc-200"
        />
      </div>
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
              min={1}
              type="number"
              placeholder={product.quantity?.toString()}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
        ) : product.salesUnit === "area" ? (
          <div className="flex flex-row gap-3">
            Cantidad de cajas:
            <input
              min={1}
              type="number"
              placeholder={product.quantity?.toString()}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
        ) : (
          <div className="flex flex-row gap-3">
            Cantidad:
            <input
              min={1}
              type="number"
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
          <Button
            title="Eliminar del carrito"
            variant=""
            onClick={() => handleRemoveItem(product.id)}
          />
        </div>
      </div>
    </div>
  );
};
