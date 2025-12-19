import { useState, type InputHTMLAttributes } from "react";
import { EyeIcon, EyeOffIcon } from "@/components/icons";

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  labelRight?: React.ReactNode;
  hint?: string;
  error?: string;
  showStrength?: boolean;
}

function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;

  if (password.length >= 6) score++;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return { score: 1, label: "Weak", color: "bg-red-500" };
  if (score <= 4) return { score: 2, label: "Medium", color: "bg-yellow-500" };
  return { score: 3, label: "Strong", color: "bg-green-500" };
}

export function PasswordInput({
  label,
  labelRight,
  hint,
  error,
  showStrength = false,
  className = "",
  id,
  value,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const passwordValue = typeof value === "string" ? value : "";
  const strength = showStrength && passwordValue ? getPasswordStrength(passwordValue) : null;

  return (
    <div className="w-full">
      {/* Label */}
      {(label || labelRight) && (
        <div className="mb-2 flex items-center justify-between">
          {label && (
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
              {label}
            </label>
          )}
          {labelRight}
        </div>
      )}

      {/* Input with toggle */}
      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          className={`w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-black transition-colors placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black focus:outline-none ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
          tabIndex={-1}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button>
      </div>

      {/* Password Strength Indicator */}
      {showStrength && passwordValue && strength && (
        <div className="mt-2">
          <div className="flex gap-1">
            {[1, 2, 3].map(level => (
              <div
                key={level}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  level <= strength.score ? strength.color : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <p
            className={`mt-1 text-xs ${
              strength.score === 1 ? "text-red-500" : strength.score === 2 ? "text-yellow-600" : "text-green-600"
            }`}
          >
            {strength.label} password
          </p>
        </div>
      )}

      {/* Hint */}
      {hint && !error && !showStrength && <p className="mt-1.5 text-xs text-gray-500">{hint}</p>}

      {/* Error */}
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default PasswordInput;
