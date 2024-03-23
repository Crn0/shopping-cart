import { vi } from "vitest"
import { render, screen} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import products from "./data/products";
import ProductCard from "../src/components/product-card/product-card";

const productId = products[0].id;
const setProducts = vi.fn();

const setup = (jsx) => {
    return {
        user: userEvent.setup(),
        ...render(jsx)
    }
};

describe("ProductCard component", () => {

    it("renders the product images", () => {
        render(
            <ProductCard 
                products={products}
                productId={productId}
                setProducts={setProducts}
            />
        );

        for (let i = 0; i < products[0].images.length; i += 1) {
            
            expect(screen.getByRole("img", { name: `foo${i}`})).toBeInTheDocument();
        } 
    });

    it("select the correct quantity", async () => {
        const { user } = setup(
            <ProductCard 
                products={products}
                productId={productId}
                setProducts={setProducts}
            />
        );

        const select = screen.getByLabelText("Quantity*");
        const option = screen.getByRole("option", { name: "10"})

        await act( async () => {
            await user.selectOptions(
                select,
                option,
            );
        });
        
       expect(option.selected).toBeTruthy();

       
    });

    it("add to cart", async () => {
        const { user } = setup(
            <ProductCard 
                products={products}
                productId={productId}
                setProducts={setProducts}
            />
        );

        const button = screen.getByRole("button", { name: "Add to cart"});

        await act( async() => {
            for (let i = 0; i < 5; i += 1) {
                await user.click(button)
            }
        });
        
        expect(setProducts).toHaveBeenCalledTimes(5);
    });
});