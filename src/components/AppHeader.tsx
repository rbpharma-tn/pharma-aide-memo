
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/generateur", label: "Mémofiches" },
  { to: "/auth", label: "Connexion" },
];

export default function AppHeader() {
  const { pathname } = useLocation();
  return (
    <header className="w-full bg-white border-b flex items-center justify-between px-6 py-4 font-inter">
      <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight">
        PharmIA
      </Link>
      <nav className="flex gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={
              "text-base transition-colors hover:text-black font-medium" +
              (pathname === link.to
                ? " text-gray-900 font-bold"
                : " text-gray-500")
            }
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
