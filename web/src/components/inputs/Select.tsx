import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@/components/icons";

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  searchable?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export function Select({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = "Select...",
  label,
  error,
  hint,
  disabled = false,
  searchable = false,
  fullWidth = false,
  className = ""
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const selectedOption = options.find(opt => opt.value === value);

  const filteredOptions = searchable
    ? options.filter(opt => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : options;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return;

    if (controlledValue === undefined) {
      setInternalValue(option.value);
    }
    onChange?.(option.value);
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setSearchQuery("");
    } else if (e.key === "Enter" && !isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <div ref={containerRef} className={`relative ${fullWidth ? "w-full" : "w-64"} ${className}`}>
      {label && <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{label}</label>}

      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`flex h-14 w-full items-center justify-between gap-2 rounded-xl border bg-[var(--color-background-secondary)] px-4 transition-all duration-200 ${
          error ? "border-red-500" : isOpen ? "border-[var(--color-accent-primary)]" : "border-transparent"
        } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-[var(--color-border-primary)]"} `}
      >
        <div className="flex min-w-0 items-center gap-2">
          {selectedOption?.icon && <span className="flex-shrink-0">{selectedOption.icon}</span>}
          <span
            className={`truncate ${
              selectedOption ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-tertiary)]"
            }`}
          >
            {selectedOption?.label || placeholder}
          </span>
        </div>
        <ChevronDownIcon
          className={`flex-shrink-0 text-[var(--color-text-tertiary)] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-background-secondary)] shadow-lg">
          {searchable && (
            <div className="border-b border-[var(--color-border-primary)] p-2">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-lg bg-[var(--color-background-primary)] px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-tertiary)]"
              />
            </div>
          )}

          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-sm text-[var(--color-text-tertiary)]">No options found</div>
            ) : (
              filteredOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  disabled={option.disabled}
                  className={`flex w-full items-center gap-2 px-4 py-3 text-left transition-colors ${
                    option.disabled
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer hover:bg-[var(--color-background-tertiary)]"
                  } ${
                    option.value === value
                      ? "bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)]"
                      : "text-[var(--color-text-primary)]"
                  } `}
                >
                  {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                  <span className="truncate">{option.label}</span>
                  {option.value === value && (
                    <svg
                      className="ml-auto h-4 w-4 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {(hint || error) && (
        <p className={`mt-1.5 text-sm ${error ? "text-red-500" : "text-[var(--color-text-tertiary)]"}`}>
          {error || hint}
        </p>
      )}
    </div>
  );
}

export default Select;
