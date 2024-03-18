import { Outlet } from "react-router-dom"
import Navigation from "./components/navigation/navigation"

function App() {
  
    return (
        <>
            <Navigation />

            <Outlet />
        </>
    );
}

export default App
