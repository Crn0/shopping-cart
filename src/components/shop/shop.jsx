import { useOutletContext, Link, useLocation} from "react-router-dom";
import ProductCard from "../product-card/product-card";
import styles from "./css/shop.module.css"



function Shop() {
    const {products, setProducts} = useOutletContext();
    const locationId = Number(useLocation().pathname?.replace(/\/[A-Za-z]{1,10}\//g, ""));

    return (
        <main>
            {locationId ? <ProductCard 
                                products={products}
                                setProducts={setProducts}
                          /> 
                        : (
                            <div>
                                <p>hello</p>
                                {products?.map?.((product) => {
                                    return (
                                        <div key={product.id}>
                                          <img src={product.images[0]} alt={product.title}/>
                                          <span>{product.title}</span>
                                          <span>{product.price}</span>
                                          <Link to={`${product.id}`}>details</Link>
                                        </div>
                                    )
                                })}
                            </div>
                        )
            }
                         
        </main>
    );
}

export default Shop;