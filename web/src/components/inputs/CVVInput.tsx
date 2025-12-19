import { useState, forwardRef, type InputHTMLAttributes } from "react";
import { EyeIcon, EyeOffIcon } from "@/components/icons";

export interface CVVInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "maxLength"> {
  label?: string;
  error?: string;
  /** Max CVV length (3 for Visa/MC, 4 for Amex) */
  maxLength?: 3 | 4;
}

export const CVVInput = forwardRef<HTMLInputElement, CVVInputProps>(
  ({ label = "CVV", error, maxLength = 3, className = "", id, onChange, ...props }, ref) => {
    const [showCVV, setShowCVV] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Only allow digits
      const value = e.target.value.replace(/\D/g, "").slice(0, maxLength);
      e.target.value = value;
      onChange?.(e);
    };

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
          <input
            ref={ref}
            id={id}
            type={showCVV ? "text" : "password"}
            inputMode="numeric"
            autoComplete="cc-csc"
            maxLength={maxLength}
            placeholder={maxLength === 4 ? "••••" : "•••"}
            onChange={handleChange}
            className={`w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 text-black transition-colors placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} ${className} `}
            {...props}
          />

          {/* Toggle Visibility */}
          <button
            type="button"
            onClick={() => setShowCVV(!showCVV)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
            tabIndex={-1}
            aria-label={showCVV ? "Hide CVV" : "Show CVV"}
          >
            {showCVV ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>

        {/* Error */}
        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

CVVInput.displayName = "CVVInput";

export default CVVInput;
