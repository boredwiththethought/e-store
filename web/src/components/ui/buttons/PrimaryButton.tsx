interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

function PrimaryButton({ children, onClick, type = "button", disabled = false, className = "" }: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`font-inter cursor-pointer rounded-[6px] border bg-transparent px-14 py-4 text-[16px] leading-6 font-medium ${className}`}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
