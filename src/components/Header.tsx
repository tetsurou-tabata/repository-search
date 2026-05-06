import Link from "next/link";

const Header = () => {
    return (
        <header className="border-b border-zinc-700">
            <Link href="/" className="p-5 inline-block">
                <span className="font-bold text-2xl">Repository Search</span>
            </Link>
        </header>
    );
};

export default Header;
