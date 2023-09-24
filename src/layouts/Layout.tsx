import Navbar from "../components/Navbar/Navbar.tsx";

interface Props {
    children: React.ReactNode;
}

export default function Layout(props: Props) {
    const { children } = props;

    return (
        <div>
            <header className="w-screen">
                <Navbar />
            </header>
            <main className="md:max-w-3xl lg:mx-auto mx-8 mt-8">
                {children}
            </main>
        </div>
    );
}
