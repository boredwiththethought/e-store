import { useState } from "react";
import { SearchIcon } from "@/components/icons";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
}

export function SearchInput({
  placeholder = "Search",
  value: externalValue,
  onChange,
  onSearch,
  className = ""
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState("");

  // Контролируемый или неконтролируемый режим
  const value = externalValue !== undefined ? externalValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch?.(value);
    }
  };

  const handleSearchClick = () => {
    onSearch?.(value);
  };

  return (
    <div className={`flex h-14 w-[433px] items-center gap-2 rounded-lg bg-[#F5F5F5] p-4 ${className}`}>
      {/* Search Icon */}
      <button
        type="button"
        onClick={handleSearchClick}
        className="flex shrink-0 cursor-pointer items-center justify-center transition-colors"
      >
        <SearchIcon className="text-[#656565]" />
      </button>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full bg-transparent text-[14px] leading-4.5 font-medium text-[#656565] placeholder:text-[#656565] focus:outline-none"
      />
    </div>
  );
}

export default SearchInput;
