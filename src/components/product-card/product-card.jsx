import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./css/product-card.module.css";

function ProductCard({products, setProducts, productId})  {
    const [index, setIndex] = useState(0);
    const id = Number(productId); 
    const product = products?.find?.((product) => product.id === id);
   
    const handleAddToCart = (e) => {
        e.preventDefault();
        const form = e.target
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
       
        setProducts(products.map((product) => {
            if(product.id === id) {
                
                return {...product, bought: true, quantity: +product?.quantity + +formJson.selectProduct};
            }

            return product
        }));
        
        
    };
 
    const handleImageChange = (e) => {
        const parent = e.target.parentElement;
        const newIndex = parent.dataset.index;
        
        setIndex(+newIndex);
    };

    return (
        <div>
            {/* button image and main image container */}
           
            <div>
                <div>
                    {product?.images.map?.((image, index) => {
                        return (
                            <button 
                                key={image}
                                data-index={`${index}`} 
                                onClick={(e) => handleImageChange(e)}
                            >
                                <img 
                                    src={image} 
                                    alt={`${product.title}${index}`} 
                                />
                            </button>
                        );
                    })}
                </div>
                    {/* product image */}
                <div>
                    <img 
                        src={`${product?.images[index]}`} 
                        alt={product?.title} 
                    />
                </div>
            </div>

            {/* name, price description container */}
            <div>
                <h3>{product?.title}</h3>
                <p>{`price: $${product?.price}`}</p>
                <p>{`description: ${product?.description}`}</p>
            </div>

            {/* form container */}
            <div>
                <form method="post" onSubmit={handleAddToCart}>
                    <label>
                        <span>Quantity*</span>
                        <select 
                            name="selectProduct" 
                            defaultValue={"1"}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </label>

                    <button type="submit">Add to cart</button>
                </form>
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    products: PropTypes.array.isRequired,
    setProducts: PropTypes.func.isRequired,
    productId: PropTypes.number.isRequired,
};

export default ProductCard;
