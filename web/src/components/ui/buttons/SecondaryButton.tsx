interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

function SecondaryButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = ""
}: SecondaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`font-inter cursor-pointer rounded-lg border bg-black text-white px-16 py-3 text-[14px] leading-6 font-medium ${className}`}
    > 
      {children}
    </button>
  );
}

export default SecondaryButton;