// src/sections/Home/NavBar/modules/OrdersDeliveryModule.tsx
import React, { memo, useState } from "react";
import { PackageSearch, Truck, ShieldCheck, RefreshCcw, HelpCircle } from "lucide-react";

interface OrdersDeliveryModuleProps {
  data: {
    options: { label: string; path: string }[];
  };
  align: "left" | "center" | "right";
}

const OrdersDeliveryModule: React.FC<OrdersDeliveryModuleProps> = ({ data, align }) => {
  const [open, setOpen] = useState(false);
  const options = data?.options || [];

  return (
    <div
      className={`relative cursor-pointer text-[#2e2e2e] ${align === "center" ? "mx-auto" : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-center gap-2 font-medium hover:text-gray-700">
        <PackageSearch size={18} />
        <span>Orders & Delivery</span>
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white border rounded-2xl shadow-lg z-50 p-3">
          <p className="text-sm text-gray-600 mb-2 font-semibold">
            Enjoy secure orders and delivery protection
          </p>
          <ul className="divide-y text-sm">
            {options.map((item) => (
              <li
                key={item.path}
                className="flex items-center gap-2 py-2 px-2 hover:bg-gray-50 transition rounded cursor-pointer"
                onClick={() => (window.location.href = item.path)}
              >
                <Truck size={16} />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>

          <div className="border-t mt-3 pt-3 text-xs text-gray-500 space-y-2">
            <div className="flex items-center gap-2"><ShieldCheck size={14}/> Safe & easy payments</div>
            <div className="flex items-center gap-2"><RefreshCcw size={14}/> Refund protection</div>
            <div className="flex items-center gap-2"><HelpCircle size={14}/> After-sales support</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(OrdersDeliveryModule);
