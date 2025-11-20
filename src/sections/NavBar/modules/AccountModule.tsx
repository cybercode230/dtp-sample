// src/sections/Home/NavBar/modules/AccountModule.tsx
import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, ChevronDown } from "lucide-react";

interface AccountModuleProps {
  data: {
    signedIn: boolean;
    username: string;
    dropdownItems: string[];
  };
  align: "left" | "center" | "right";
}

const AccountModule: React.FC<AccountModuleProps> = ({ data, align }) => {
  const [open, setOpen] = useState(false);
  const { signedIn, username, dropdownItems = [] } = data;
  const navigate=useNavigate();

  return (
    <div
      className={`relative cursor-pointer ${align === "center" ? "mx-auto" : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        className={`flex items-center gap-1 px-3 py-1 rounded-full transition ${
          signedIn
            ? "bg-[#2e2e2e] text-white hover:bg-gray-800"
            : "text-[#2e2e2e] hover:text-gray-700"
        }`}
        onClick={()=> navigate("auth")}
      >
        <User size={18} />
        <span className="text-sm font-medium">
          {signedIn ? `Hi, ${username || "User"}` : null}
        </span>
        <ChevronDown size={14} />
      </div>

      {open && (
        <ul className="absolute right-0 mt-2 w-60 bg-white border rounded-2xl shadow-xl z-50 max-h-80 overflow-auto text-sm">
          {dropdownItems.length > 0 ? (
            dropdownItems.map((item) => (
              <li
                key={item}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#2e2e2e] whitespace-nowrap transition"
              >
                {item}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-500 text-sm">
              No account options available
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default memo(AccountModule);
