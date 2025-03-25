"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { Card } from "@/components/ui/Card";

export const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, loading } = useCart();

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  if (!product) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Producto no encontrado
        </h3>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        <div className="relative h-80 md:h-96 bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "contain" }}
            className="p-4"
          />
        </div>

        <div className="flex flex-col">
          <div className="mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full mb-2">
              {product.category}
            </span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {product.title}
            </h1>
          </div>

          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            ${product.price.toFixed(2)}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Descripción
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {product.description}
            </p>
          </div>

          <div className="mt-auto">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-20">
                <label htmlFor="quantity" className="sr-only">
                  cantidad
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <Button
                onClick={handleAddToCart}
                variant="primary"
                size="large"
                disabled={loading}
                className="flex-1"
              >
                {loading ? "Adding..." : "Add to Cart"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductDetail;
