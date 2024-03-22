import { RouterProvider, createMemoryRouter, useOutletContext, useRouteError } from "react-router-dom";
import { expect, vi } from "vitest"
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import * as hooks from "../src/hooks/useProduct";
import products from "./data/products";
import App from "../src/App";

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

const Home = () => {
    const {products} = useOutletContext();

    return (
        <img src={`${products[0].images[0]}`} alt={`${products[0].title}`} />
    )
};

const Shop = () => {

    return (
        <label>
            <span>Category*</span>
            <select></select>
        </label>
    )
};

const Cart = () => {
    return <p data-testid="cart">Cart</p>
};

const ErrorPage = () => {
    const error = useRouteError();
    
    return <p data-testid="error">{error.statusText}</p>
};

function setup(route) {
    return {
        user: userEvent.setup(),
        ...render(<RouterProvider router={route}/>)
    };
}

describe("App component", () => {
    const routes = [
        {
            path: "/",
            element: <App />,
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true,
                    element: <Home />
                },
                {
                    path: "home",
                    element: <Home />
                },
                {
                    path: "shop/:productId?",
                    element: <Shop />
                },
                {
                    path: "cart",
                    element: <Cart />
                },
            ],
           
        }
    ];            
    
    it("renders the loading page while fetching the data", () => {
        vi.spyOn(hooks, "default").mockImplementation(() => 
        ({
            products: null,
            setProducts: vi.fn,
            error: null,
            loading: true,
        }));

        render(<App />);

        const loadingScreen = screen.getByText("loading.....");

        expect(loadingScreen).toBeInTheDocument();
        
        vi.restoreAllMocks()
    });

    it("renders the error page when the error state is not null", () => {
        vi.spyOn(hooks, "default").mockImplementation(() => 
                                ({
                                    products: null,
                                    setProducts: vi.fn,
                                    error: "mocked error",
                                    loading: false,
                                }));
        
        render(<App />);

        const error = screen.getByText("error: mocked error");

        expect(error).toBeInTheDocument();

        vi.restoreAllMocks();
    });

    it("renders the navigation and home component in initial load", () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ["/",],
            initialIndex: 1,
        });
        
        render(<RouterProvider router={router}/>);

        expect(screen.getByRole("navigation")).toBeInTheDocument();
        expect(screen.getByAltText("foo")).toBeInTheDocument();
    });

    it("redirect to shop when user click the link", async () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ["/",],
            initialIndex: 0,
        });
        const { user } = setup(router);

        const link = screen.getByRole("link", { name: "Shop"});

        await act(async () => {
            
            await user.click(link);
        });

        await waitFor(() => expect(screen.getByLabelText("Category*")).toBeInTheDocument());

        screen.debug();
    });

    it("redirect to cart when user click the link", async () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ["/",],
            initialIndex: 0,
        });
        const { user } = setup(router);

        const link = screen.getByRole("link", { name: "Cart 0"});

        await act(async () => {
            await user.click(link)
        });

        await waitFor(() => expect(screen.getByTestId("cart")).toBeInTheDocument());
    });

    it("show an error page when user give a bad url", () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ["/", "bad url"],
            initialIndex: 1,
        });

        render(<RouterProvider router={router} />);

        expect(screen.getByTestId("error")).toBeInTheDocument();
        screen.debug();
    });
});