import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type DropdownProps = {
  onSelect: (option: string) => void;
  value: string;
  options: string[];
  label?: string;
};

export default function Dropdown({ onSelect, value, options }: DropdownProps) {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-value" onClick={toggleDropdown}>
        <p>{value === "default" ? "Select user category" : value}</p>
        <FontAwesomeIcon icon={showDropdown ? faChevronUp : faChevronDown} />
      </div>
      {showDropdown && (
        <div className="dropdown-options">
          {options.map((option) => (
            <div
              className="dropdown-option"
              key={option}
              onClick={() => {
                onSelect(option);
                toggleDropdown();
              }}
            >
              <a href="#">{option}</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
