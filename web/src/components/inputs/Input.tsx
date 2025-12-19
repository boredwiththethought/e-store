import { forwardRef, type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, leftIcon, rightIcon, className = "", id, ...props }, ref) => {
    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">{leftIcon}</div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={id}
            className={`w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black transition-colors placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 ${leftIcon ? "pl-12" : ""} ${rightIcon ? "pr-12" : ""} ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} ${className} `}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && <div className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400">{rightIcon}</div>}
        </div>

        {/* Hint */}
        {hint && !error && <p className="mt-1.5 text-xs text-gray-500">{hint}</p>}

        {/* Error */}
        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
