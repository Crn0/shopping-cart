import { RouterProvider, createMemoryRouter} from "react-router-dom";
import { vi } from "vitest"
import { render, screen} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import products from "./data/products";
import * as reactDom from "react-router-dom";
import App from "../src/App";
import Cart from "../src/components/cart/cart";

const cartList = structuredClone(products[0]);
cartList.quantity = 42;
cartList.bought = true;
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
    };
});

vi.mock("react-router-dom", async (importOriginal) => {
    const mod = await importOriginal();
    return {
       ...mod,
       useOutletContext: () => ({
        products: products,
        cartList: [cartList],
        setProducts: setProducts,
       }),
    };
});

const setup = (router) => {
    return {
        user: userEvent.setup(),
        ...render(<RouterProvider router={router}/>)
    };
};

describe("Cart component", () => {
    const routes = [
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "cart",
                    element: <Cart />,
                    
                },
            ],
        }
    ];
    it("not rendering the product if nothing is bought", () => {
        vi.spyOn(reactDom, "useOutletContext").mockImplementation(() => 
        ({
            products: null,
            setProducts: vi.fn,
            cartList: null,
        }));
        const router = createMemoryRouter(routes, {
            initialEntries: ["/", "/cart"],
            initialIndex: 1,
        });

        render(<RouterProvider router={router} />);

        expect(screen.getByText("Order Summary: undefined item(s)")).toBeInTheDocument();

        vi.restoreAllMocks();
    });

    it("render bought product", () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ["/", "/cart"],
            initialIndex: 1,
        });

        render(<RouterProvider router={router} />);

        expect(screen.getByRole("img", { name: "foo" })).toBeInTheDocument();
        expect(screen.getByLabelText("Increase*")).toBeInTheDocument();
        expect(screen.getByLabelText("Decrease*")).toBeInTheDocument();
    });

    it("user increase the quantity", async () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ["/", "/cart"],
            initialIndex: 1,
        });

        const { user } = setup(router);
        const select = screen.getByLabelText("Increase*");
        const option = screen.getAllByRole("option", { name: "10"})[0];

        
        await act( async () => {
            await user.selectOptions(
                select,
                option,
            );
        });
        
        expect(option.selected).toBeTruthy();
    });

    it("user increase the quantity", async () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ["/", "/cart"],
            initialIndex: 1,
        });

        const { user } = setup(router);
        const select = screen.getByLabelText("Decrease*");
        const option = screen.getAllByRole("option", { name: "10"})[1];

        
        await act( async () => {
            await user.selectOptions(
                select,
                option,
            );
        });
        
        expect(option.selected).toBeTruthy();
    });

    it("remove product", async () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ["/", "/cart"],
            initialIndex: 1,
        });

        const { user } = setup(router);
        const button = screen.getByRole("button", { name: "X"});

        await act( async () => {
            await user.click(button);
        });

        expect(setProducts).toHaveBeenCalled();
    });
});