import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b border-gray-300 py-4">
      <div className="container">
        <div className="flex justify-between items-center gap-4">
          <Link to="/" className="sm:text-xl font-medium">
            EraVend Image Collection
          </Link>
          <nav>
            <Link to="/dashboard" className="font-medium underline">
              Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
