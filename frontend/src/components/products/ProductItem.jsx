import PropTypes from "prop-types";
import { ProductItemPropTypes } from "@/props/productProps";

export default function ProductItem({ product }) {
    return (
        <div className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg">
            <img src={product.image} alt={product.title} className="object-cover w-full h-48" />
            <div className="p-4">
                <h2 className="mb-2 text-xl font-semibold">{product.title}</h2>
                <p className="text-gray-600">{product.price}</p>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-600">{product.category}</p>
            </div>
        </div>
    )
}

ProductItem.propTypes = {ProductItemPropTypes}