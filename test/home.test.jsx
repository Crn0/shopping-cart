import { RouterProvider, createMemoryRouter} from "react-router-dom";
import { vi } from "vitest"
import { render, screen} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import products from "./data/products";
import App from "../src/App";
import Home from "../src/components/home/home";

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

function setup(routes) {
    const router = createMemoryRouter(routes, {
        initialEntries: ["/", "/home"],
        initialIndex: 1,
    });
    return {
        user: userEvent.setup(),
        ...render(<RouterProvider router={router}/>)
    };
}

describe("Home component", () => {
    const routes = [
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "home",
                    element: <Home />
                },
            ],
        }
    ];

    it("user click the next button it will show the next image", async () => {
        const {user} = setup(routes);
 
        const imageFoo = screen.getByAltText("foo");
        const next = screen.getAllByRole("button", { name: "next"})[0];
       
        await act(async () => {
            await user.click(next);
        });
      
        expect(imageFoo.className).not.toBe("_active_594ebc");
    });

    it("user click the prev button it will show the last image", async () => {
        const {user} = setup(routes);
 
        const imageFoo = screen.getByAltText("baz");
        const prev = screen.getAllByRole("button", { name: "prev"})[0];
       
        await act(async () => {
            await user.click(prev);
        });
        
        expect(imageFoo.className).toBe("_active_594ebc");
    });

    it("should show a different image", () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ["/", "/home"],
            initialIndex: 1,
        });

        vi.useFakeTimers();
        act(() => {
            render(<RouterProvider router={router}/>);
        });

        expect(screen.getByAltText("foo").className).toBe("_active_594ebc");

        act(() => {
            vi.runOnlyPendingTimers();
        });

        expect(screen.getByAltText("foo").className).not.toBe("_active_594ebc");
        expect(screen.getByAltText("baz").className).toBe("_active_594ebc");
    });
});