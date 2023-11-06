import Navbar from "../components/Navbar/Navbar.tsx";
import { useMatch } from "react-router-dom";
import TripNavbar from "../components/Navbar/TripNavbar.tsx";

interface Props {
    children: React.ReactNode;
}

export default function Layout(props: Props) {
    const { children } = props;
    const match = useMatch("/trip/:id/*");

    return (
        <div>
            <header className="w-screen">
                <Navbar />
                {match && match.params.id ? <TripNavbar /> : null}
            </header>
            <main className="md:max-w-4xl lg:mx-auto mx-8 mt-8">
                {children}
            </main>
        </div>
    );
}
