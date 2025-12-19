import { useState, useRef, useEffect, useCallback } from "react";

interface PriceRangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: [number, number];
  defaultValue?: [number, number];
  onChange?: (value: [number, number]) => void;
  label?: string;
  currency?: string;
  formatPrice?: (value: number) => string;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export function PriceRangeSlider({
  min = 0,
  max = 10000,
  step = 1,
  value: controlledValue,
  defaultValue,
  onChange,
  label,
  currency = "$",
  formatPrice,
  disabled = false,
  fullWidth = false,
  className = ""
}: PriceRangeSliderProps) {
  const [internalValue, setInternalValue] = useState<[number, number]>(defaultValue || [min, max]);
  const [activeThumb, setActiveThumb] = useState<"min" | "max" | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const [minValue, maxValue] = value;

  const formatPriceDisplay = useCallback(
    (price: number) => {
      if (formatPrice) return formatPrice(price);
      return `${currency}${price.toLocaleString()}`;
    },
    [currency, formatPrice]
  );

  const getPercentage = (val: number) => ((val - min) / (max - min)) * 100;

  const updateValue = useCallback(
    (newValue: [number, number]) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [controlledValue, onChange]
  );

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, "");
    const parsed = inputValue === "" ? min : parseInt(inputValue, 10);
    if (!isNaN(parsed)) {
      const newMin = Math.min(Math.max(parsed, min), maxValue - step);
      updateValue([newMin, maxValue]);
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, "");
    const parsed = inputValue === "" ? max : parseInt(inputValue, 10);
    if (!isNaN(parsed)) {
      const newMax = Math.max(Math.min(parsed, max), minValue + step);
      updateValue([minValue, newMax]);
    }
  };

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = ((e.clientX - rect.left) / rect.width) * 100;
    const newValue = Math.round((percentage / 100) * (max - min) + min);

    // Determine which thumb to move based on proximity
    const distToMin = Math.abs(newValue - minValue);
    const distToMax = Math.abs(newValue - maxValue);

    if (distToMin <= distToMax) {
      const clampedMin = Math.min(Math.max(newValue, min), maxValue - step);
      updateValue([clampedMin, maxValue]);
    } else {
      const clampedMax = Math.max(Math.min(newValue, max), minValue + step);
      updateValue([minValue, clampedMax]);
    }
  };

  const handleThumbMouseDown = (thumb: "min" | "max") => {
    if (disabled) return;
    setActiveThumb(thumb);
  };

  useEffect(() => {
    if (!activeThumb || !sliderRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = sliderRef.current!.getBoundingClientRect();
      const percentage = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
      const rawValue = (percentage / 100) * (max - min) + min;
      const snappedValue = Math.round(rawValue / step) * step;

      if (activeThumb === "min") {
        const newMin = Math.min(Math.max(snappedValue, min), maxValue - step);
        updateValue([newMin, maxValue]);
      } else {
        const newMax = Math.max(Math.min(snappedValue, max), minValue + step);
        updateValue([minValue, newMax]);
      }
    };

    const handleMouseUp = () => {
      setActiveThumb(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [activeThumb, min, max, step, minValue, maxValue, updateValue]);

  return (
    <div className={`${fullWidth ? "w-full" : "w-80"} ${className}`}>
      {label && <label className="mb-3 block text-sm font-medium text-[var(--color-text-primary)]">{label}</label>}

      {/* Price Inputs */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex-1">
          <label className="mb-1 block text-xs text-[var(--color-text-tertiary)]">Min</label>
          <div
            className={`flex h-10 items-center rounded-lg border border-transparent bg-[var(--color-background-secondary)] px-3 focus-within:border-[var(--color-accent-primary)] ${disabled ? "opacity-50" : ""} `}
          >
            <span className="mr-1 text-[var(--color-text-tertiary)]">{currency}</span>
            <input
              type="text"
              inputMode="numeric"
              value={minValue}
              onChange={handleMinInputChange}
              disabled={disabled}
              className="w-full bg-transparent text-[var(--color-text-primary)] outline-none"
            />
          </div>
        </div>

        <span className="mt-5 text-[var(--color-text-tertiary)]">—</span>

        <div className="flex-1">
          <label className="mb-1 block text-xs text-[var(--color-text-tertiary)]">Max</label>
          <div
            className={`flex h-10 items-center rounded-lg border border-transparent bg-[var(--color-background-secondary)] px-3 focus-within:border-[var(--color-accent-primary)] ${disabled ? "opacity-50" : ""} `}
          >
            <span className="mr-1 text-[var(--color-text-tertiary)]">{currency}</span>
            <input
              type="text"
              inputMode="numeric"
              value={maxValue}
              onChange={handleMaxInputChange}
              disabled={disabled}
              className="w-full bg-transparent text-[var(--color-text-primary)] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Slider Track */}
      <div
        ref={sliderRef}
        onClick={handleSliderClick}
        className={`relative h-2 rounded-full bg-[var(--color-background-tertiary)] ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} `}
      >
        {/* Active Range */}
        <div
          className="absolute h-full rounded-full bg-[var(--color-accent-primary)]"
          style={{
            left: `${getPercentage(minValue)}%`,
            right: `${100 - getPercentage(maxValue)}%`
          }}
        />

        {/* Min Thumb */}
        <div
          onMouseDown={() => handleThumbMouseDown("min")}
          className={`absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--color-accent-primary)] bg-white shadow-md transition-transform ${
            disabled ? "cursor-not-allowed" : "cursor-grab hover:scale-110"
          } ${activeThumb === "min" ? "scale-110 cursor-grabbing" : ""} `}
          style={{ left: `${getPercentage(minValue)}%` }}
        >
          {activeThumb === "min" && (
            <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-[var(--color-background-inverse)] px-2 py-1 text-xs whitespace-nowrap text-[var(--color-text-inverse)]">
              {formatPriceDisplay(minValue)}
            </div>
          )}
        </div>

        {/* Max Thumb */}
        <div
          onMouseDown={() => handleThumbMouseDown("max")}
          className={`absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--color-accent-primary)] bg-white shadow-md transition-transform ${
            disabled ? "cursor-not-allowed" : "cursor-grab hover:scale-110"
          } ${activeThumb === "max" ? "scale-110 cursor-grabbing" : ""} `}
          style={{ left: `${getPercentage(maxValue)}%` }}
        >
          {activeThumb === "max" && (
            <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-[var(--color-background-inverse)] px-2 py-1 text-xs whitespace-nowrap text-[var(--color-text-inverse)]">
              {formatPriceDisplay(maxValue)}
            </div>
          )}
        </div>
      </div>

      {/* Range Labels */}
      <div className="mt-2 flex justify-between text-xs text-[var(--color-text-tertiary)]">
        <span>{formatPriceDisplay(min)}</span>
        <span>{formatPriceDisplay(max)}</span>
      </div>
    </div>
  );
}

export default PriceRangeSlider;
