import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { useFAQ } from "../../hooks/useFAQ";
import SearchButton from "./modules/SearchButton";
import SuggestionSearchList from "./modules/SuggestionSearchList";

const SearchSection: React.FC = () => {
  const { searchResults, recommended, searchFAQs, loading } = useFAQ();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    searchFAQs(searchValue);
  };

  const handleSuggestionClick = (value: string) => {
    setSearchValue(value);
    searchFAQs(value);
  };

  const displayedFAQs = searchValue ? searchResults : recommended;

  return (
    <div className="w-full px-4 sm:px-6 py-6 flex flex-col items-center">
      <motion.div className="flex flex-col sm:flex-row items-center w-full max-w-3xl gap-3 sm:gap-2 relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Icons.Search size={20} />
        </div>
        <motion.input
          type="text"
          placeholder="What do you want to know about DTP Program..."
          value={searchValue}
          onChange={(e:any) => setSearchValue(e.target.value)}
          className="flex-1 border border-gray-300 rounded-full pl-10 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 w-full"
        />
        <SearchButton label="Find answer" icon="Search" onClick={handleSearch} />
      </motion.div>

      <div className="w-full max-w-6xl mt-4 px-1 sm:px-0">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <SuggestionSearchList
            suggestions={displayedFAQs.map((f) => f.question)}
            onSelect={handleSuggestionClick}
          />
        )}
      </div>
    </div>
  );
};

export default memo(SearchSection);
