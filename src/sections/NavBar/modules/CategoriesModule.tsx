// src/sections/Home/NavBar/modules/CategoriesModule.tsx
import React, { memo, useState } from "react";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import AllCategoriesModal from "../../../components/modals/AllCategoriesModal";
import settingDataJson from "../setting_data.json";

// Types for subcategories & shops
interface SubCategory {
  name: string;
  image: string;
}

interface Shop {
  name: string;
  location: string;
  image: string;
}

// Minimal JSON type
interface SettingData {
  categoriesModule: {
    categories: string[];
  };
  subCategories: Record<string, SubCategory[]>;
  shops: Shop[];
}

// Use safe casting
const data = settingDataJson as unknown as SettingData;

interface CategoriesModuleProps {
  align: "left" | "center" | "right";
}

const MAX_VISIBLE = 7;

const CategoriesModule: React.FC<CategoriesModuleProps> = ({ align }) => {
  const categories = data.categoriesModule.categories ?? [];
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0] ?? "");
  const [showAllCategories, setShowAllCategories] = useState(false);

  const subCategories: SubCategory[] = data.subCategories[selectedCategory] ?? [];
  const shops: Shop[] = data.shops ?? [];

  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, MAX_VISIBLE);

  const hiddenCount = categories.length - MAX_VISIBLE;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${align === "center" ? "mx-auto" : ""}`}>
      {visibleCategories.map((cat) => {
        const isSuperDeal = cat.toLowerCase() === "super deals";
        const handleClick = cat === "All Categories" ? () => setOpenModal(true) : undefined;

        return (
          <span
            key={cat}
            onClick={handleClick}
            className={`cursor-pointer px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1 transition-colors
              ${isSuperDeal ? "text-[#00fe33]" : "text-[#2e2e2e] hover:bg-gray-100"}
            `}
          >
            {isSuperDeal && <Sparkles size={16} className="text-[#00fe33] animate-pulse" />}
            {cat}
            {cat === "All Categories" && <ChevronDown size={16} />}
          </span>
        );
      })}

      {categories.length > MAX_VISIBLE && (
        <span
          onClick={() => setShowAllCategories(!showAllCategories)}
          className="cursor-pointer px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1 text-blue-600 hover:bg-gray-100 transition-colors"
        >
          {showAllCategories ? "Less" : `+${hiddenCount} More`}
          {showAllCategories ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      )}

      {/* All Categories Modal */}
      <AllCategoriesModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        subCategories={subCategories}
        shops={shops}
      />
    </div>
  );
};

export default memo(CategoriesModule);
