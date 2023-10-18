import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="mb-8">Oops!</h1>
            <h6>Something wrong happened!</h6>
            <i>{error.status || error.statusText || error.message}</i>
        </div>
    );
}
