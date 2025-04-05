import { NavLink } from "react-router";
import { Home, PlusCircle, PawPrint, User } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-full md:w-64 bg-white shadow-lg p-4 flex md:flex-col flex-row items-center gap-4 md:gap-0 md:min-h-screen">
      <h2 className="text-lg md:text-2xl font-bold text-center md:mb-6">
        Adopta 🐶
      </h2>

      <nav className="flex md:flex-col flex-row gap-4 w-full justify-center md:justify-start">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 ${
              isActive ? "bg-gray-200 font-bold" : ""
            }`
          }
        >
          <Home size={20} />
          <span className="hidden md:inline">Inicio</span>
        </NavLink>

        <NavLink
          to="/post"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 ${
              isActive ? "bg-gray-200 font-bold" : ""
            }`
          }
        >
          <PlusCircle size={20} />
          <span className="hidden md:inline">Publicar</span>
        </NavLink>

        <NavLink
          to="/adopt"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 ${
              isActive ? "bg-gray-200 font-bold" : ""
            }`
          }
        >
          <PawPrint size={20} />
          <span className="hidden md:inline">Adoptar</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 ${
              isActive ? "bg-gray-200 font-bold" : ""
            }`
          }
        >
          <User size={20} />
          <span className="hidden md:inline">Perfil</span>
        </NavLink>
      </nav>
    </div>
  );
}
