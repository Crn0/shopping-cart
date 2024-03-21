import { useRouteError , Link } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
    
    return (
        <div>
            <h2>Oops</h2>
            <p>Sorry, an unexpected error has occurred</p>
            <Link to={"/"}>Home</Link>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}

export default ErrorPage;