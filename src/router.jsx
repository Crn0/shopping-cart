import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./components/home/home";
import Shop from "./components/shop/shop";
import ProductCard from "./components/product-card/product-card";
import Cart from "./components/cart/cart";
import ErrorPage from "./components/error-page/error-page";

const Router = () => {
    const router = createBrowserRouter([
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
                    path: "shop",
                    element: <Shop />,
                    children: [
                        {
                            path: ":productId",
                            element: <ProductCard />
                        }
                    ],
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