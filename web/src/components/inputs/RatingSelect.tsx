import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@/components/icons";

interface RatingSelectProps {
  value?: number | null;
  onChange?: (value: number | null) => void;
  label?: string;
  placeholder?: string;
  showAllOption?: boolean;
  allOptionLabel?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export function RatingSelect({
  value: controlledValue,
  onChange,
  label,
  placeholder = "Select rating",
  showAllOption = true,
  allOptionLabel = "All ratings",
  disabled = false,
  fullWidth = false,
  className = ""
}: RatingSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (rating: number | null) => {
    if (controlledValue === undefined) {
      setInternalValue(rating);
    }
    onChange?.(rating);
    setIsOpen(false);
  };

  const ratingOptions = [5, 4, 3, 2, 1];

  return (
    <div ref={containerRef} className={`relative ${fullWidth ? "w-full" : "w-64"} ${className}`}>
      {label && <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{label}</label>}

      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex h-14 w-full items-center justify-between gap-2 rounded-xl border bg-[var(--color-background-secondary)] px-4 transition-all duration-200 ${
          isOpen ? "border-[var(--color-accent-primary)]" : "border-transparent"
        } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-[var(--color-border-primary)]"} `}
      >
        <div className="flex items-center gap-2">
          {value !== null ? (
            <>
              <StarRating rating={value} size="sm" />
              <span className="text-sm text-[var(--color-text-secondary)]">& up</span>
            </>
          ) : (
            <span className="text-[var(--color-text-tertiary)]">{placeholder}</span>
          )}
        </div>
        <ChevronDownIcon
          className={`shrink-0 text-[var(--color-text-tertiary)] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-background-secondary)] shadow-lg">
          {showAllOption && (
            <button
              type="button"
              onClick={() => handleSelect(null)}
              className={`flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-[var(--color-background-tertiary)] ${
                value === null
                  ? "bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)]"
                  : "text-[var(--color-text-primary)]"
              } `}
            >
              <span>{allOptionLabel}</span>
              {value === null && (
                <svg className="ml-auto h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          )}

          {ratingOptions.map(rating => (
            <button
              key={rating}
              type="button"
              onClick={() => handleSelect(rating)}
              className={`flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-[var(--color-background-tertiary)] ${
                value === rating ? "bg-[var(--color-accent-primary)]/10" : ""
              } `}
            >
              <StarRating rating={rating} size="sm" />
              <span className="text-sm text-[var(--color-text-secondary)]">& up</span>
              {value === rating && (
                <svg
                  className="ml-auto h-4 w-4 shrink-0 text-[var(--color-accent-primary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Star Rating display component
interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

export function StarRating({ rating, maxRating = 5, size = "md", showValue = false, className = "" }: StarRatingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  const starSize = sizeClasses[size];

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: maxRating }, (_, index) => {
        const filled = index < rating;
        return (
          <svg
            key={index}
            className={`${starSize} ${filled ? "text-yellow-400" : "text-[var(--color-text-quaternary)]"}`}
            fill={filled ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        );
      })}
      {showValue && <span className="ml-1 text-sm text-[var(--color-text-secondary)]">{rating.toFixed(1)}</span>}
    </div>
  );
}

// Interactive Star Rating component
interface InteractiveStarRatingProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  label?: string;
  className?: string;
}

export function InteractiveStarRating({
  value: controlledValue,
  defaultValue = 0,
  onChange,
  maxRating = 5,
  size = "md",
  disabled = false,
  label,
  className = ""
}: InteractiveStarRatingProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const displayValue = hoverValue !== null ? hoverValue : value;

  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  const starSize = sizeClasses[size];

  const handleClick = (rating: number) => {
    if (disabled) return;
    if (controlledValue === undefined) {
      setInternalValue(rating);
    }
    onChange?.(rating);
  };

  return (
    <div className={className}>
      {label && <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{label}</label>}

      <div className={`flex items-center gap-1 ${disabled ? "opacity-50" : ""}`}>
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1;
          const filled = starValue <= displayValue;
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => !disabled && setHoverValue(starValue)}
              onMouseLeave={() => setHoverValue(null)}
              disabled={disabled}
              className={` ${starSize} transition-transform duration-100 ${disabled ? "cursor-not-allowed" : "cursor-pointer hover:scale-110"} `}
            >
              <svg
                className={`h-full w-full ${filled ? "text-yellow-400" : "text-[var(--color-text-quaternary)]"}`}
                fill={filled ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default RatingSelect;
