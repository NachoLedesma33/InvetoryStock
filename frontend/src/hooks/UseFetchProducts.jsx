import {useState, useEffect} from "react";


export default function useFetchProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () =>{
            try{
                const response = await fetch("http://localhost:4000/products");
                const data = await response.json();
                setProducts(data);
            }
            catch(error){
                setError(error.message, error)
            }
            finally{
                setLoading(false)
            f}
        }
    }, [])
    return {
        products,
        loading,
        error
    }
}