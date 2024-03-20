import { useOutletContext } from "react-router-dom";
import styles from "./css/cart.module.css"

function Cart() {
    const {cartList, products, setProducts} = useOutletContext()
    const total = cartList?.reduce?.((prev, next) => (prev + next.price) * next.quantity,0)
    
    const subTotal = (id) => {
        const currentProduct = cartList?.filter?.((product) => product.id === id);
        console.log(total)

        return currentProduct[0].price * currentProduct[0].quantity;
    };

    const handleRemoveFromCart = (id) => {
        const currentId = Number(id);
        const removeProduct = products.map((product) => {
            if(product.id === currentId) {
                return {...product, quantity: 0,bought: false};
            }

            return product;
        });

        console.log(removeProduct)
        setProducts(removeProduct)
    }

    return (
        <main>
            
            <section className={`${styles.grid} ${styles.templateColumn}`}>
                {/* product info */}
                {cartList?.map?.((product) => {
                    return (
                        <div 
                            key={product.id} 
                            className={`${styles.grid} ${styles.gridCenter} ${styles.g10Px}`}
                        >
                            {/* product image and button */}
                            <div className={`${styles.flex}`}>
                                <div>
                                    <img src={product.images[0]} alt={product.title} />
                                </div>

                                <div>
                                    <button onClick={() => handleRemoveFromCart(product.id)}>X</button>
                                </div>
                            </div>
                            {/* product details */}
                            <div className={`${styles.flex}`}>
                                <div className={`${styles.flex} ${styles.g10Px}`}>
                                    <p>
                                        <span>
                                            Product:
                                        </span> 
                                        <span>
                                            {product.title}
                                        </span>
                                    </p>
                                    <p>
                                        <span>
                                            Price:
                                        </span> 
                                        <span>   
                                        {product.price}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            {/* product total and quantity */}
                            <div className={`${styles.flex} ${styles.g10Px}`}>
                                {/* select div */}
                                <div>
                                    <label>
                                        <span>Quantity*</span>
                                        <select
                                            name={product.title}
                                            defaultValue={1}
                                            onChange={(e) => console.log(e.target, product.title)}
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
                                </div>
                                {/* sub total div */}
                                <div>
                                    <p>{`Subtotal: ${subTotal(product.id)}`}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}

                {/* total */}
                <div>
                    {/* total details */}
                    <div>
                        <p>{`Order Summary: ${cartList.length}`}</p>
                        <p>{`Order Total: ${total}`}</p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Cart;