import { RouterProvider, createMemoryRouter} from "react-router-dom";
import { vi } from "vitest"
import { render, screen} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import products from "./data/products";
import App from "../src/App";
import Shop from "../src/components/shop/shop";
import ProductCard from "../src/components/product-card/product-card";

const productId = products[0].id;
const setProducts = vi.fn();

vi.mock("../src/hooks/useProduct", () => {
    return {
        default: () => {
            return {
                products: products,
                setProducts: setProducts,
                error: null,
                loading: false,
        }
        }
    }
});

const setup = (router) => {
    return {
        user: userEvent.setup(),
        ...render(<RouterProvider router={router} />)
    }
};

describe("ProductCard component", () => {
    const routes = [
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "shop",
                    element: <Shop />,
                    children: [
                        {
                            path: ":productId",
                            element: <ProductCard />
                        }
                    ],
                    
                }
               
            ],
        }
    ];

    it("renders the product images", () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ["/",  "/shop", `/shop/${productId}`],
            initialIndex: 3,
        });

        render(<RouterProvider router={router} />);

        for (let i = 0; i < products[0].images.length; i += 1) {
            
            expect(screen.getByRole("img", { name: `foo${i}`})).toBeInTheDocument();
        }
    });

    it("select the correct quantity", async () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ["/",  "/shop", `/shop/${productId}`],
            initialIndex: 3,
        });
        const { user } = setup(router);

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
        const router = createMemoryRouter(routes, {
            initialEntries: ["/",  "/shop", `/shop/${productId}`],
            initialIndex: 3,
        });
        const { user } = setup(router);

        const button = screen.getByRole("button", { name: "Add to cart"});

        await act( async() => {
            for (let i = 0; i < 5; i += 1) {
                await user.click(button)
            }
        });
        
        expect(setProducts).toHaveBeenCalledTimes(5);
    });
});