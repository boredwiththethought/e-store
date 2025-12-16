import LogoBlack from "./black.svg?react";
import LogoWhite from "./white.svg?react";

interface LogoProps {
  theme?: "dark" | "light";
  className?: string;
}

export function Logo({ theme = "dark", className = "h-24 w-auto" }: LogoProps) {
  return theme === "dark" ? <LogoBlack className={className} /> : <LogoWhite className={className} />;
}

export default Logo;
