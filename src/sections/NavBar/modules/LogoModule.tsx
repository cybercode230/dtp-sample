import React, { memo } from "react";

interface LogoModuleProps {
  data: { src: string; title: string; subtitle: string };
  align: "left" | "center" | "right";
}

const LogoModule: React.FC<LogoModuleProps> = ({ data, align }) => {
  return (
    <div
      className={`flex items-center gap-3 ${
        align === "center" ? "mx-auto" : ""
      }`}
    >
      <div className="bg-gray-100 rounded-2xl p-1 flex items-center justify-center">
        <img
          src={data.src}
          alt={data.title}
          className="h-10 w-10 object-contain rounded-xl"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-bold text-base text-[#3b3b3b]">{data.title}</span>
        <span className="text-xs text-gray-500">{data.subtitle}</span>
      </div>
    </div>
  );
};

export default memo(LogoModule);
