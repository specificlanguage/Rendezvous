import AllTripView from "../components/TripViews/AllTripView/AllTripView.tsx";
import { AuthProtectedRoute } from "../layouts/ProtectedRoute.tsx";

export default function HomePage() {
    return (
        <AuthProtectedRoute>
            <AllTripView />
        </AuthProtectedRoute>
    );
}
