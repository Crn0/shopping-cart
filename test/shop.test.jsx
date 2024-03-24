import { RouterProvider, createMemoryRouter} from "react-router-dom";
import { expect, vi } from "vitest"
import { render, screen} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import products from "./data/products";
import App from "../src/App";
import Shop from "../src/components/shop/shop";

vi.mock("../src/hooks/useProduct", () => {
    return {
        default: () => {
            return {
                products: products,
                setProducts: vi.fn,
                error: null,
                loading: false,
        }
        }
    }
});


const ProductCard = () => <p data-testid="product">product page</p>

describe("Shop component", () => {
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
                            path: ":productId?",
                            element: <ProductCard />
                        }
                    ],
                    
                }
               
            ],
        }
    ];

    it("render the products", () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ["/", "/shop"],
            initialIndex: 1,
        });

        render(<RouterProvider router={router} />);

        expect(screen.getAllByRole("link", { name: "details"})).toHaveLength(3);
        expect(screen.getByRole("img", { name: "foo"})).toBeInTheDocument();
        expect(screen.getByRole("img", { name: "baz"})).toBeInTheDocument();
        expect(screen.getByRole("img", { name: "bar"})).toBeInTheDocument();
    });

    it("when user click a link render the product page", async () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ["/", "/shop"],
            initialIndex: 1,
        });
        const user = userEvent.setup();

        render(<RouterProvider router={router} />);

        const link = screen.getAllByRole("link", { name: "details"})[0]

        await act(async () => {
            await user.click(link);
        });
        
        expect(screen.getByTestId("product")).toBeInTheDocument();
    });
});