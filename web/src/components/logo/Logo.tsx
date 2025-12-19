import { Link } from "react-router-dom";
import LogoBlack from "./black.svg?react";
import LogoWhite from "./white.svg?react";

interface LogoProps {
  theme?: "dark" | "light";
  className?: string;
  linkTo?: string;
}

export function Logo({ theme = "dark", className = "h-24 w-auto", linkTo = "/" }: LogoProps) {
  const LogoComponent = theme === "dark" ? LogoBlack : LogoWhite;

  return (
    <Link to={linkTo} className="block">
      <LogoComponent className={className} />
    </Link>
  );
}

export default Logo;
