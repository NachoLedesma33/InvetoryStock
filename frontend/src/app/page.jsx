"use client";

import Layout from "@/components/layout/Layout";
import ProductList from "@/components/products/ProductList";

export default function Home() {
  return (
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-center " >Productos</h1>
       <Layout>
        <ProductList />
      </Layout>
      </div>
  );
}