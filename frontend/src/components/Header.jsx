import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-indigo-600 text-white p-4 shadow">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wide">🏠 MonAppart</h1>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Accueil</Link>
          <Link to="/ajouter" className="hover:underline">Ajouter un appartement</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
