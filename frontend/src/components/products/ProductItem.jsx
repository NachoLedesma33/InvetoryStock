"use client";
import PropTypes from 'prop-types';
import Image from 'next/image';
import { ProductItemPropTypes } from '../../props/productProps';

export default function ProductItem({ product }) {
  return (
    <div className="overflow-hidden transition duration-300 transform bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105">
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover object-center transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h2 className="mb-2 text-xl font-semibold text-gray-800">{product.title}</h2>
        <p className="mb-2 text-lg font-bold text-green-600">${product.price}</p>
        <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
      </div>
    </div>
  );
}

ProductItem.propTypes = ProductItemPropTypes;

