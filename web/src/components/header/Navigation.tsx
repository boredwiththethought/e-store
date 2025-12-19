import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact Us" },
  { to: "/blog", label: "Blog" }
];

function Navigation() {
  return (
    <nav className="flex items-center gap-13">
      {navItems.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `text-[16px] font-medium transition-colors ${isActive ? "text-black" : "text-[#656565] hover:text-black"}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navigation;
