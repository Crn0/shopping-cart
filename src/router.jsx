import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./components/home/home";
import Shop from "./components/shop/shop";
import Cart from "./components/cart/cart";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
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

        },
    ]);

    return <RouterProvider router={router}/>
}

export default Router;