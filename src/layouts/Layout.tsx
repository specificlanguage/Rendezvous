import Navbar from "../components/Navbar/Navbar.tsx";

interface Props {
    children: React.ReactNode;
}

export default function Layout(props: Props) {
    const { children } = props;

    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main className="max-w-3xl mx-auto">{children}</main>
        </div>
    );
}
