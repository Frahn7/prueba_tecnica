"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useContext } from "react";
import { ProductsProps } from "../components/GetProducts";

type ProductContextType = {
  cart: ProductsProps[];
  addToCart: (product: ProductsProps, quantity: number) => void;
  removeFromCart: (productId: number) => void;
};

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useState<ProductsProps[]>([]);

  const addToCart = (product: any, quantity: number) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: (item.quantity || 0) + (quantity > 0 ? quantity : 1),
              }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: any) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === productId) {
            const quantity = item.quantity ?? 0;

            if (quantity > 1) {
              return { ...item, quantity: quantity - 1 };
            }

            return null;
          }
          return item;
        })
        .filter((item) => item !== null);
    });
  };

  return (
    <ProductContext.Provider value={{ cart, addToCart, removeFromCart }}>
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
