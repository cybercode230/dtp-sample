// src/sections/SearchSection/modules/SuggestionSearchList.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SuggestionSearchListProps {
  suggestions: string[];
  onSelect: (value: string) => void;
}

const SuggestionSearchList: React.FC<SuggestionSearchListProps> = ({ suggestions, onSelect }) => {
  if (!suggestions.length) return null;

  return (
    <AnimatePresence>
      <div className="flex flex-wrap gap-3 mt-3">
        {suggestions.map((item) => (
          <motion.button
            key={item}
            type="button"
            onClick={() => onSelect(item)}
            className="bg-gray-100 hover:bg-gray-200 px-5 py-2 rounded-full text-sm font-medium transition"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
            whileHover={{ scale: 1.05 }}
          >
            {item}
          </motion.button>
        ))}
      </div>
    </AnimatePresence>
  );
};

export default SuggestionSearchList;
