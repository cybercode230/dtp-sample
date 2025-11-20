// src/sections/Home/NavBar/modules/AccountModule.tsx
import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, ChevronDown } from "lucide-react";
import Button from "../../../components/buttons/buttons";

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
  const navigate = useNavigate();

  // ----------------------------------------
  // 1️⃣ NOT LOGGED IN → Show CTA BUTTON
  // ----------------------------------------
  if (!signedIn) {
    return (
      <div
        className={`${align === "center" ? "mx-auto" : ""}`}
      >
        <Button
          label="Sign In"
          icon={User}
          variant="primary"
          onClick={() => navigate("/auth")}
          className="rounded-full"
        />
      </div>
    );
  }

  // ----------------------------------------
  // 2️⃣ LOGGED IN → Show Profile Dropdown
  // ----------------------------------------
  return (
    <div
      className={`relative cursor-pointer ${align === "center" ? "mx-auto" : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#2e2e2e] text-white hover:bg-gray-800 transition"
      >
        <User size={18} />
        <span className="text-sm font-medium">Hi, {username || "User"}</span>
        <ChevronDown size={14} />
      </div>

      {open && (
        <ul className="absolute right-0 mt-2 w-60 bg-white border rounded-2xl shadow-xl z-50 max-h-80 overflow-auto text-sm">
          {dropdownItems.map((item) => (
            <li
              key={item}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#2e2e2e] whitespace-nowrap transition"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default memo(AccountModule);
