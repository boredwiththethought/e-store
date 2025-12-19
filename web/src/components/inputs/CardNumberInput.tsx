import { useState, forwardRef, type InputHTMLAttributes } from "react";

export type CardType = "visa" | "mastercard" | "amex" | "discover" | "unknown";

export interface CardNumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  onCardTypeChange?: (cardType: CardType) => void;
}

// Detect card type from number
function detectCardType(number: string): CardType {
  const cleaned = number.replace(/\s/g, "");

  // Visa: starts with 4
  if (/^4/.test(cleaned)) return "visa";

  // Mastercard: starts with 51-55 or 2221-2720
  if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) return "mastercard";

  // Amex: starts with 34 or 37
  if (/^3[47]/.test(cleaned)) return "amex";

  // Discover: starts with 6011, 644-649, or 65
  if (/^6(?:011|5|4[4-9])/.test(cleaned)) return "discover";

  return "unknown";
}

// Format card number with spaces
function formatCardNumber(value: string, cardType: CardType): string {
  const cleaned = value.replace(/\D/g, "");

  // Amex: 4-6-5 format (15 digits)
  if (cardType === "amex") {
    const limited = cleaned.slice(0, 15);
    const parts = [limited.slice(0, 4), limited.slice(4, 10), limited.slice(10, 15)];
    return parts.filter(Boolean).join(" ");
  }

  // Others: 4-4-4-4 format (16 digits)
  const limited = cleaned.slice(0, 16);
  const parts = [limited.slice(0, 4), limited.slice(4, 8), limited.slice(8, 12), limited.slice(12, 16)];
  return parts.filter(Boolean).join(" ");
}

// Card type icons (inline SVG for simplicity)
const CardIcons: Record<CardType, React.ReactNode> = {
  visa: (
    <svg className="h-6 w-8" viewBox="0 0 32 24" fill="none">
      <rect width="32" height="24" rx="4" fill="#1434CB" />
      <path d="M13.5 16H11L12.5 8H15L13.5 16Z" fill="white" />
      <path d="M21 8L19.5 14L19 11.5C18.5 10 17 8.5 15.5 8L17.5 16H20L24 8H21Z" fill="white" />
      <path d="M8 8L5 16H7.5L8 14H10.5L9 8H8ZM8.5 12L9.5 9.5L10 12H8.5Z" fill="white" />
    </svg>
  ),
  mastercard: (
    <svg className="h-6 w-8" viewBox="0 0 32 24" fill="none">
      <rect width="32" height="24" rx="4" fill="#F5F5F5" />
      <circle cx="12" cy="12" r="7" fill="#EB001B" />
      <circle cx="20" cy="12" r="7" fill="#F79E1B" />
      <path
        d="M16 6.5C17.5 7.5 18.5 9.5 18.5 12C18.5 14.5 17.5 16.5 16 17.5C14.5 16.5 13.5 14.5 13.5 12C13.5 9.5 14.5 7.5 16 6.5Z"
        fill="#FF5F00"
      />
    </svg>
  ),
  amex: (
    <svg className="h-6 w-8" viewBox="0 0 32 24" fill="none">
      <rect width="32" height="24" rx="4" fill="#006FCF" />
      <text x="16" y="14" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
        AMEX
      </text>
    </svg>
  ),
  discover: (
    <svg className="h-6 w-8" viewBox="0 0 32 24" fill="none">
      <rect width="32" height="24" rx="4" fill="#FF6000" />
      <circle cx="20" cy="12" r="6" fill="white" />
    </svg>
  ),
  unknown: (
    <svg className="h-6 w-8" viewBox="0 0 32 24" fill="none">
      <rect width="32" height="24" rx="4" fill="#E5E7EB" />
      <rect x="4" y="8" width="24" height="2" rx="1" fill="#9CA3AF" />
      <rect x="4" y="12" width="16" height="2" rx="1" fill="#9CA3AF" />
    </svg>
  )
};

export const CardNumberInput = forwardRef<HTMLInputElement, CardNumberInputProps>(
  ({ label = "Card number", error, onCardTypeChange, className = "", id, onChange, value, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState("");
    const displayValue = value !== undefined ? String(value) : internalValue;
    const cardType = detectCardType(displayValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatCardNumber(e.target.value, detectCardType(e.target.value));
      setInternalValue(formatted);

      // Update the input value
      e.target.value = formatted;
      onChange?.(e);

      // Notify parent of card type change
      onCardTypeChange?.(detectCardType(formatted));
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
          {/* Card Type Icon */}
          <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">{CardIcons[cardType]}</div>

          <input
            ref={ref}
            id={id}
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="1234 5678 9012 3456"
            value={displayValue}
            onChange={handleChange}
            className={`w-full rounded-lg border border-gray-300 bg-white py-3 pr-4 pl-14 text-black transition-colors placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} ${className} `}
            {...props}
          />
        </div>

        {/* Error */}
        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

CardNumberInput.displayName = "CardNumberInput";

export default CardNumberInput;
