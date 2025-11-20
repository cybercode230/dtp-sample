import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const Index: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const originPage = query.get("originPage") || "/";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <Outlet context={{ originPage }} />
    </div>
  );
};

export default Index;
