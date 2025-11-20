import React from "react";
import type { JSX } from "react";
import { X, Home, Truck, Users, Watch, Star, Cpu } from "lucide-react";

interface SubCategory {
  name: string;
  image: string;
}

interface Shop {
  name: string;
  location: string;
  image: string;
}

interface AllCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  subCategories: SubCategory[];
  shops: Shop[];
}

const categoryIcons: Record<string, JSX.Element> = {
  "All Categories": <Star size={20} className="text-gray-600" />,
  "Super Deals": <Star size={20} className="text-green-500" />,
  "Home Improvement & Lighting": <Home size={20} className="text-gray-600" />,
  "Women's Clothing": <Users size={20} className="text-gray-600" />,
  "Automotive & Motorcycle": <Truck size={20} className="text-gray-600" />,
  "Jewelry & Watches": <Watch size={20} className="text-gray-600" />,
  "Sports & Entertainment": <Star size={20} className="text-gray-600" />,
  "Electronics & Gadgets": <Cpu size={20} className="text-gray-600" />,
};

const AllCategoriesModal: React.FC<AllCategoriesModalProps> = ({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onSelectCategory,
  subCategories,
  shops,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-start pt-16">
      <div className="bg-white w-11/12 md:w-4/5 h-[80vh] rounded-lg shadow-xl flex overflow-hidden relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <X size={24} />
        </button>

        {/* Left: Category List */}
        <div className="w-1/4 border-r overflow-y-auto">
          <ul className="flex flex-col">
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-3 cursor-pointer flex items-center gap-2 hover:bg-gray-100 transition
                  ${cat === selectedCategory ? "bg-gray-100 font-semibold" : ""}
                `}
              >
                {categoryIcons[cat] || <Star size={20} className="text-gray-600" />}
                <span>{cat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Subcategories & Shops */}
        <div className="w-3/4 p-4 overflow-y-auto flex flex-col gap-6">
          {/* Subcategories */}
          <div>
            <h4 className="font-semibold mb-2 text-gray-700">Subcategories</h4>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {subCategories.map((sub) => (
                <div key={sub.name} className="flex flex-col items-center">
                  <img
                    src={sub.image}
                    alt={sub.name}
                    className="w-20 h-20 rounded-full object-cover mb-1"
                  />
                  <span className="text-sm text-gray-700">{sub.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shops */}
          <div>
            <h4 className="font-semibold mb-2 text-gray-700">Nearby Shops</h4>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {shops.map((shop) => (
                <div key={shop.name} className="flex flex-col items-center">
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-20 h-20 rounded-full object-cover mb-1"
                  />
                  <span className="text-sm text-gray-700 font-medium">{shop.name}</span>
                  <span className="text-xs text-gray-500">{shop.location}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCategoriesModal;
