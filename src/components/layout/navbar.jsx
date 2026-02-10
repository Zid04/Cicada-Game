import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass =
    "px-4 py-2 rounded-lg transition-colors duration-200";

  return (
    <nav className="bg-[#121212] text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Title */}
          <div className="text-xl font-bold text-pink-500">
            CICADA GAME
          </div>

          {/* Links */}
          <div className="flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkClass} ${
                  isActive
                    ? "bg-pink-500 text-black"
                    : "hover:bg-pink-700"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/glossary"
              className={({ isActive }) =>
                `${linkClass} ${
                  isActive
                    ? "bg-pink-500 text-black"
                    : "hover:bg-pink-700"
                }`
              }
            >
              Glossary
            </NavLink>

            <NavLink
              to="/rules"
              className={({ isActive }) =>
                `${linkClass} ${
                  isActive
                    ? "bg-pink-500 text-black"
                    : "hover:bg-pink-700"
                }`
              }
            >
              Rules
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
