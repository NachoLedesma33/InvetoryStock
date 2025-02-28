"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/config/api";
import Image from "next/image";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main className="container p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Productos</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="p-4 border rounded-lg">
            <Image
              src={product.image}
              alt={product.title}
              width={48}
              height={48}
              className="object-contain mx-auto"
            />
            <h2 className="mt-2 text-xl font-semibold">{product.title}</h2>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
