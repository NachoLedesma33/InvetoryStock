"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export const CartIcon = ({ className = "" }) => {
  const { cart } = useCart();

  const itemCount = cart.products.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  return (
    <Link
      href="/cart"
      className={`
        relative inline-flex items-center justify-center p-2 
        text-gray-500 dark:text-gray-400 
        hover:bg-gray-100 dark:hover:bg-gray-800 
        rounded-full
        ${className}
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
