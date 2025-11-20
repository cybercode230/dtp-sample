import React from "react";
import * as Icons from "lucide-react";

interface SearchButtonProps {
  label: string;
  icon: string;
  onClick: () => void;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Search: Icons.Search,
};

const SearchButton: React.FC<SearchButtonProps> = ({ label, icon, onClick }) => {
  const IconComponent = iconMap[icon];
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 px-6 py-2.5 bg-[#2e2e2e] text-white rounded-full hover:bg-bg-[#3e3e3e] transition"
    >
      {IconComponent && <IconComponent size={20} />}
      {label}
    </button>
  );
};

export default SearchButton;
