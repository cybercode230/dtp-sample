import React, { memo, useState } from "react";
import { Globe } from "lucide-react";

interface LanguageCurrencyModuleProps {
  data: {
    defaultLanguage: string;
    defaultCurrency: string;
    languages: string[];
    currencies: string[];
  };
  align: "left" | "center" | "right";
}

const LanguageCurrencyModule: React.FC<LanguageCurrencyModuleProps> = ({
  data,
  align,
}) => {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState(data.defaultLanguage);
  const [currency, setCurrency] = useState(data.defaultCurrency);

  return (
    <div
      className={`relative ${align === "center" ? "mx-auto" : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-center gap-2 cursor-pointer text-[#2e2e2e]">
        <Globe size={18} />
        <span className="text-sm">
          {language} - {currency}
        </span>
      </div>

      {open && (
        <div className="absolute right-0 mt-3 w-72 bg-white shadow-lg rounded-lg p-4 text-sm z-50 border">
          <h4 className="font-semibold mb-1 text-[#2e2e2e]">
            Set language and currency
          </h4>
          <p className="text-gray-500 mb-3">
            Select your preferred language and currency. You can update at any time.
          </p>

          <div className="flex flex-col gap-2">
            <label className="text-gray-600">Language</label>
            <select
              className="border rounded p-1"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {data.languages.map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
            </select>

            <label className="text-gray-600 mt-2">Currency</label>
            <select
              className="border rounded p-1"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {data.currencies.map((curr) => (
                <option key={curr}>{curr}</option>
              ))}
            </select>

            <button className="bg-[#2e2e2e] text-white py-1.5 rounded mt-3">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(LanguageCurrencyModule);
