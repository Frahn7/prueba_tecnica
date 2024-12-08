"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useContext } from "react";
import { ProductsProps } from "../services/GetProducts";

type ProductContextType = {
  cart: ProductsProps[];
  addToCart: (product: ProductsProps, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  reduceQuantityCart: (productId: number) => void;
};

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useState<ProductsProps[]>([]);

  const addToCart = (product: ProductsProps, quantity: number) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevCart.map((item) => {
          if (item.id === product.id) {
            const newQuantity =
              (item.quantity || 0) + (quantity > 0 ? quantity : 1);
            if (newQuantity > product.stock) {
              return { ...item, quantity: product.stock };
            }
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
      } else {
        const initialQuantity = quantity > 0 ? quantity : 1;
        if (initialQuantity > product.stock) {
          return [...prevCart, { ...product, quantity: product.stock }];
        }
        return [...prevCart, { ...product, quantity: initialQuantity }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      return prevCart.filter((item) => item.id !== productId);
    });
  };

  const reduceQuantityCart = (productId: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === productId && item.quantity > 0) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  return (
    <ProductContext.Provider
      value={{ cart, addToCart, removeFromCart, reduceQuantityCart }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("");
  }
  return context;
};
