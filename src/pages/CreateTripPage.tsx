import CreateTripView from "../components/TripViews/CreateTripForm/CreateTripView.tsx";
import { AuthProtectedRoute } from "../layouts/ProtectedRoute.tsx";

export default function CreateTripPage() {
    return (
        <AuthProtectedRoute>
            <CreateTripView />
        </AuthProtectedRoute>
    );
}
