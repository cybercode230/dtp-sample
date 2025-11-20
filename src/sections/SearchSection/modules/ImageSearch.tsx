// src/sections/SearchSection/modules/ImageSearch.tsx
import React, { useState, useRef } from "react";
import * as Icons from "lucide-react";

interface ImageSearchProps {
  options?: {
    icon: string; // must match iconMap keys
    tooltip: string;
  }[];
  onSearch: (file: File | null, optionTooltip?: string) => void;
}

// Map icon names from JSON to Lucide React components
const iconMap: Record<string, React.ComponentType<any>> = {
  Camera: Icons.Camera,
  Image: Icons.Image,
};

const ImageSearch: React.FC<ImageSearchProps> = ({
  options = [{ icon: "Image", tooltip: "Select image" }],
  onSearch,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setSelectedFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) setSelectedFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        {options.map((opt) => {
          const IconComponent = iconMap[opt.icon];
          if (!IconComponent) return null;

          return (
            <button
              key={opt.tooltip}
              type="button"
              title={opt.tooltip}
              onClick={() => setOpenDropdown((prev) => !prev)}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition"
            >
              <IconComponent size={25} />
            </button>
          );
        })}
      </div>

      {openDropdown && (
        <div className="absolute top-full mt-2 w-72 bg-white border border-gray-200 shadow-lg rounded-xl p-4 z-50">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-300 p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-gray-400"
            onClick={() => inputFileRef.current?.click()}
          >
            {selectedFile ? (
              <p className="text-sm text-gray-700">{selectedFile.name}</p>
            ) : (
              <>
                <Icons.Image size={32} className="text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 text-center">
                  Drag & drop an image here or click to select
                </p>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={inputFileRef}
              onChange={handleFileSelect}
            />
          </div>

          <button
            type="button"
            onClick={() => {
              onSearch(selectedFile);
              setOpenDropdown(false);
              setSelectedFile(null);
            }}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-[#2e2e2e] text-white rounded-2xl py-2 hover:bg-blue-700 transition"
          >
            <Icons.Search size={20} />
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageSearch;
