import { useState, useCallback } from "react";
import { PlusIcon } from "@/components/icons";

interface QuantityInputProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string;
  error?: string;
  className?: string;
}

export function QuantityInput({
  value: controlledValue,
  defaultValue = 1,
  onChange,
  min = 1,
  max = 99,
  step = 1,
  disabled = false,
  size = "md",
  label,
  error,
  className = ""
}: QuantityInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const updateValue = useCallback(
    (newValue: number) => {
      const clampedValue = Math.min(Math.max(newValue, min), max);
      if (controlledValue === undefined) {
        setInternalValue(clampedValue);
      }
      onChange?.(clampedValue);
    },
    [controlledValue, min, max, onChange]
  );

  const increment = () => updateValue(value + step);
  const decrement = () => updateValue(value - step);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      updateValue(min);
      return;
    }
    const parsed = parseInt(inputValue, 10);
    if (!isNaN(parsed)) {
      updateValue(parsed);
    }
  };

  const sizeClasses = {
    sm: {
      container: "h-8",
      button: "w-8 h-8",
      input: "w-10 text-sm",
      icon: "w-3 h-3"
    },
    md: {
      container: "h-10",
      button: "w-10 h-10",
      input: "w-12 text-base",
      icon: "w-4 h-4"
    },
    lg: {
      container: "h-12",
      button: "w-12 h-12",
      input: "w-14 text-lg",
      icon: "w-5 h-5"
    }
  };

  const sizes = sizeClasses[size];

  return (
    <div className={className}>
      {label && <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{label}</label>}

      <div
        className={`inline-flex items-center rounded-xl border bg-[var(--color-background-secondary)] ${error ? "border-red-500" : "border-transparent"} ${disabled ? "opacity-50" : ""} `}
      >
        {/* Decrement Button */}
        <button
          type="button"
          onClick={decrement}
          disabled={disabled || value <= min}
          className={` ${sizes.button} flex items-center justify-center rounded-l-xl text-[var(--color-text-primary)] transition-colors duration-200 ${
            disabled || value <= min
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:bg-[var(--color-background-tertiary)]"
          } `}
          aria-label="Decrease quantity"
        >
          <MinusIcon className={sizes.icon} />
        </button>

        {/* Input */}
        <input
          type="text"
          inputMode="numeric"
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
          className={` ${sizes.input} ${sizes.container} bg-transparent text-center font-medium text-[var(--color-text-primary)] outline-none ${disabled ? "cursor-not-allowed" : ""} `}
          aria-label="Quantity"
        />

        {/* Increment Button */}
        <button
          type="button"
          onClick={increment}
          disabled={disabled || value >= max}
          className={` ${sizes.button} flex items-center justify-center rounded-r-xl text-[var(--color-text-primary)] transition-colors duration-200 ${
            disabled || value >= max
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:bg-[var(--color-background-tertiary)]"
          } `}
          aria-label="Increase quantity"
        >
          <PlusIcon className={sizes.icon} />
        </button>
      </div>

      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );
}

// Simple Minus Icon component
function MinusIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export default QuantityInput;
