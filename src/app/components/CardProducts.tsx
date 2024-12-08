"use client";

import React, { useEffect, useState } from "react";
import { ProductsProps } from "../services/GetProducts";
import Image from "next/image";
import { Button } from "./ui/Button";
import { useProductContext } from "../context/ProductContext";
import { formatCurrency } from "../utils/format";

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
    <div className="mt-10 flex   lg:min-h-[300px] lg:max-h-[300px] items-center  lg:flex-row flex-col gap-2 text-left lg:text-nowrap ">
      <div className="w-[220px] h-[220px]  ">
        <Image
          width={220}
          alt="."
          src={product.image}
          height={220}
          className="p-2 rounded-3xl bg-zinc-200 max-h-[220px]"
        />
      </div>

      <div className="w-[200px] font-semibold flex flex-col gap-2 text-center lg:text-start">
        <h1 className="text-[25px] font-bold ">{product.title}</h1>
        {product.stock >= 1
          ? `Stock Disponible: ${product.stock}`
          : "No disponible"}

        <div className="flex flex-row gap-2 w-full">
          <p className="text-[20px]">{formatCurrency(product.price)}</p>

          {product.listingPrice ? (
            <p className="bg-blue-500 py-0.5 self-start px-2 text-sm rounded-lg text-white">
              {Math.round(
                ((product.listingPrice - product.price) /
                  product.listingPrice) *
                  100
              )}
              % OFF
            </p>
          ) : null}
        </div>

        {product.salesUnit === "group" && product.unitValue ? (
          <p>PU: {formatCurrency(product.price / product.unitValue)}</p>
        ) : null}
        {product.listingPrice ? (
          <p className="text-[19px] line-through text-gray-500">
            {formatCurrency(product?.listingPrice)}
          </p>
        ) : null}

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

        <div className="flex lg:flex-row flex-col ">
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
                variant="Delete"
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
