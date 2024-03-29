import { useState } from "react";
import { useOutletContext, Link, useParams, Outlet} from "react-router-dom";
import ProductCard from "../product-card/product-card";
import styles from "./css/shop.module.css"

function Shop() {
    const {products, setProducts} = useOutletContext();
    const [selectedCategory, setSelectedCategory] = useState("");
    const {productId} = useParams() 
    const currentProduct = selectedCategory ? products.filter((product) => 
                                            product.category === selectedCategory)
                                            : products;
    const categories = new Set(products?.map?.((products) => products.category));
    console.log(productId)
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value)
    };

    return (
        <main>
            {productId ? <Outlet 
                               
                                context={{
                                    products: products,
                                    setProducts: setProducts,
                                    productId: productId,
                                }}
                          /> 
                        : (
                            <>
                                <div>
                                    <label>
                                        <span>Category*</span>
                                        <select 
                                            name="selectedCategory"
                                            defaultValue={selectedCategory} 
                                            onChange={handleCategoryChange}
                                        >   
                                            <option value={""}>All</option>
                                            {/* convert Set of categories to array */}
                                            {/* loop through it give the category as the 
                                                options value and text
                                             */}
                                            {[...categories].map((category) => {
                                                return (
                                                    <option 
                                                        key={category} 
                                                        value={category}
                                                    >
                                                        {category}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </label>
                                </div>
                                <div>
                                    {/* loop through the current products */}
                                    {currentProduct?.map?.((product) => {
                                        return (
                                            <div key={product.id}>
                                              <img src={product.images[0]} alt={product.title}/>
                                              <span>{product.title}</span>
                                              <Link to={`${product.id}`}>details</Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        )
            }
                         
        </main>
    );
}

export default Shop;