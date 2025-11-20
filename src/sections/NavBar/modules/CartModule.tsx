// src/sections/Home/NavBar/modules/CartModule.tsx
import React, { memo, useState } from "react";
import { ShoppingCart, XCircle } from "lucide-react";

interface CartModuleProps {
  data: { items: any[]; emptyMessage: string; buttons: string[] };
  align: "left" | "center" | "right";
}

const CartModule: React.FC<CartModuleProps> = ({ data, align }) => {
  const [open, setOpen] = useState(false);
  const hasItems = data.items.length > 0;

  return (
    <div className={`relative cursor-pointer ${align === "center" ? "mx-auto" : ""}`}>
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="flex items-center gap-2 text-[#2e2e2e] hover:text-gray-700"
      >
        <ShoppingCart size={20} />
        <span className="font-medium">{data.items.length}</span>
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-2xl shadow-xl p-3 z-50">
          {!hasItems ? (
            <div className="flex flex-col items-center justify-center py-6 text-gray-500">
              <XCircle size={32} />
              <p className="mt-2 text-sm">{data.emptyMessage}</p>
            </div>
          ) : (
            <>
              <h4 className="text-sm font-semibold text-[#2e2e2e] mb-2">Shopping Cart</h4>
              <ul className="divide-y">
                {data.items.map((item, i) => (
                  <li key={i} className="py-2 text-sm text-gray-700 hover:bg-gray-50 rounded px-2">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                    <p className="text-xs text-gray-600">{item.price}</p>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between mt-3">
                {data.buttons.map((btn) => (
                  <button
                    key={btn}
                    className="bg-[#2e2e2e] text-white text-sm px-3 py-1.5 rounded-full hover:bg-gray-800 transition"
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(CartModule);
