import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {

const navItems = [
    { name: "الرئيسية", to: "/home" },
    { name: "المقالات", to: "/about" },
    { name: "الكتب", to: "/services" },
    { name: "البودكاست", to: "/contact" },
    { name: "المدونة", to: "/blogs" },
  ];


  return (
    <nav className="">
      <ul className="flex justify-center gap-2 text-lg">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? "text-[#3A5F7D] underline font-semibold"
                  : "hover:underline hover:text-[#3A5F7D] transition-colors"
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
