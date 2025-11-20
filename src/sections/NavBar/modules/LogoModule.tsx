import React, { memo } from "react";

interface LogoModuleProps {
  data: { src: string; title?: string; subtitle?: string };
  align: "left" | "center" | "right";
}

const LogoModule: React.FC<LogoModuleProps> = ({ data, align }) => {
  return (
    <div
      className={`flex items-center gap-3 ${
        align === "center" ? "mx-auto" : ""
      }`}
    >
      {/* Logo */}
      <div className="bg-transparent rounded-xl p-1 flex items-center justify-center">
        <img
          src={data.src || "/assets/logo/dtp_logo.png"}
          alt="ICT Chamber - DTP Help Center"
          className="h-10 w-10 object-contain rounded-[5px]"
          loading="lazy"
        />
      </div>

      {/* Title + Subtitle */}
      <div className="flex flex-col leading-tight">
        <span className="font-bold text-base text-[#3b3b3b]">
          {data.title || "ICT Chamber"}
        </span>
        <span className="text-xs text-gray-500">
          {data.subtitle || "DTP Help Center"}
        </span>
      </div>
    </div>
  );
};

export default memo(LogoModule);
