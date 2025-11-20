import React, { memo, useState } from "react";
import { Bell } from "lucide-react";

interface NotificationsModuleProps {
  data: { unreadCount: number; messages?: any[] };
  align: "left" | "center" | "right";
}

const NotificationsModule: React.FC<NotificationsModuleProps> = ({
  data,
  align,
}) => {
  const [open, setOpen] = useState(false);

  const sampleMessages = data.messages || [
    {
      title: "Love Person",
      date: "2025-03-09",
      sender: "Shenzhen Loveperson Technology Co., Ltd.",
      content:
        "If you want to buy any models now, please write the memory and quantity to me and I will give you a precise quotation including shipping.",
    },
  ];

  return (
    <div
      className={`relative cursor-pointer ${align === "center" ? "mx-auto" : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Bell className="text-[#2e2e2e]" size={18} />
      {data.unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
          {data.unreadCount}
        </span>
      )}

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-lg border shadow-lg p-3 z-50">
          <h4 className="font-semibold mb-2 text-[#2e2e2e]">Messages</h4>
          {sampleMessages.map((msg, i) => (
            <div
              key={i}
              className="border-b last:border-none pb-2 mb-2 text-sm text-gray-700"
            >
              <div className="font-semibold text-[#2e2e2e]">{msg.title}</div>
              <div className="text-xs text-gray-500 mb-1">{msg.date}</div>
              <div className="text-xs text-gray-400">{msg.sender}</div>
              <p className="text-xs mt-1">{msg.content}</p>
            </div>
          ))}
          <button className="w-full text-center text-[#2e2e2e] hover:underline text-sm">
            View more
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(NotificationsModule);
