import { useState, useEffect } from "react";

function useProductUrl() {
    const [products, setProducts] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        const dataFetch = async () => {
            try {
                const url ="https://dummyjson.com/products?limit=100"
                const response = await fetch(url, {
                    mode: "cors",
                });
                const result = await response.json();

                const products = result.products.map((product) => {
                    return {...product, quantity: 0, bought: false};
                });

                if(active) {
                    setProducts(products)
                }
                
                if(response.status >= 400) {
                    throw new Error("server error");
                  }
                
                
            } catch (error) {
                setError(error)
            }
            finally {
                setLoading(false)
            }
        };

        dataFetch();

        return () => {
            active = false;
        };
    }, []);

    
    return {products, setProducts, error, loading}
}

export default useProductUrl;