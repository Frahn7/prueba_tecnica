"use client";

import React from "react";

import { render, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { ProductProvider, useProductContext } from "../context/ProductContext";
import { ProductsProps } from "@/app/services/GetProducts";

const sampleProduct: ProductsProps = {
  id: 1,
  title: "Sample Product",
  stock: 10,
  quantity: 0,
  description: "",
  price: 0,
  salesUnit: "group",
  image: "",
};

describe("ProductProvider", () => {
  let context: ReturnType<typeof useProductContext>;

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ProductProvider>{children}</ProductProvider>
  );

  const setup = () => {
    const result = render(
      <Wrapper>
        <TestComponent />
      </Wrapper>
    );
    return result;
  };

  const TestComponent = () => {
    context = useProductContext();
    return null;
  };

  beforeEach(() => {
    setup();
  });

  it("should initialize with an empty cart", () => {
    expect(context.cart).toEqual([]);
  });

  it("should add a product to the cart", () => {
    act(() => {
      context.addToCart(sampleProduct, 1);
    });

    expect(context.cart).toHaveLength(1);
    expect(context.cart[0]).toEqual({ ...sampleProduct, quantity: 1 });
  });

  it("should not exceed product stock when adding", () => {
    act(() => {
      context.addToCart(sampleProduct, 15);
    });

    expect(context.cart[0].quantity).toBe(sampleProduct.stock);
  });

  it("should remove a product from the cart", () => {
    act(() => {
      context.addToCart(sampleProduct, 1);
      context.removeFromCart(sampleProduct.id);
    });

    expect(context.cart).toEqual([]);
  });

  it("should reduce the quantity of a product in the cart", () => {
    act(() => {
      context.addToCart(sampleProduct, 3);
      context.reduceQuantityCart(sampleProduct.id);
    });

    expect(context.cart[0].quantity).toBe(2);
  });

  it("should remove a product if its quantity is reduced to zero", () => {
    act(() => {
      context.addToCart(sampleProduct, 1);
      context.reduceQuantityCart(sampleProduct.id);
    });

    expect(context.cart).toEqual([]);
  });
});
