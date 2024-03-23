import { Outlet } from "react-router-dom"
import useProductUrl from "./hooks/useProduct";
import Navigation from "./components/navigation/navigation"


function App() {
  const {products, error, loading, setProducts} = useProductUrl();
  const cartList = products?.filter?.((product) => product?.bought === true);
  
  
  if(error) return <p>error: {error}</p>
  if(loading) {
    
    return <p>loading.....</p>
  }
  
  
  return (
    <>
        <Navigation cartList={cartList?.length}/>

        <Outlet context={{
                products: products,
                setProducts: setProducts,
                cartList: cartList,
            }}
        />    
    </>
);
    
}




export default App
