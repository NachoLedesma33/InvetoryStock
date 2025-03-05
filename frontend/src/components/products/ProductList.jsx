"use client";
import ProductItem from './ProductItem';
import useFetchProducts from '../../hooks/useFetchProducts';

export default function ProductList() {
  const { products, loading, error } = useFetchProducts();

  if (loading) return <p className="text-xl font-semibold text-center">Cargando productos...</p>;
  if (error) return <p className="text-center text-red-500">Error al cargar productos: {error}</p>;

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}
