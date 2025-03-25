"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      updateQuantity(item.id, value);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex-shrink-0 w-20 h-20 relative bg-gray-100 dark:bg-gray-800 rounded">
        <Link href={`/products/${item.id}`}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="80px"
            style={{ objectFit: "contain" }}
            className="p-2"
          />
        </Link>
      </div>

      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <Link href={`/products/${item.id}`}>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
              {item.title}
            </h3>
          </Link>

          <p className="text-sm font-medium text-gray-900 dark:text-white">
            ${(item.price * (item.quantity || 1)).toFixed(2)}
          </p>
        </div>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          ${item.price.toFixed(2)} each
        </p>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <label htmlFor={`quantity-${item.id}`} className="sr-only">
              Quantity
            </label>
            <input
              id={`quantity-${item.id}`}
              name={`quantity-${item.id}`}
              type="number"
              min="1"
              value={item.quantity || 1}
              onChange={handleQuantityChange}
              className="w-16 rounded-md border border-gray-300 dark:border-gray-600 py-1 px-2 text-center text-gray-900 dark:text-white text-sm dark:bg-gray-700"
            />
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
