import ProductItem from "./ProductItem";
import { useFetchProducts } from "./hooks/useFetchProducts";

export default function ProductList(){
    const {products, loading, error} = useFetchProducts();

    if(loading)return <p>Loading...</p>
    if(error)return <p>Error al cargar los productos {error.message}</p>

    return(
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {products.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    )
}