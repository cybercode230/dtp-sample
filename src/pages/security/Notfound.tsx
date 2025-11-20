import React from "react";
import * as Icons from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate("/"); // assuming "/" is your home page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      {/* 404 Icon */}
      <Icons.ShieldAlert size={80} className="text-red-500 mb-4" />

      {/* Heading */}
      <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-4">
        Oops! Page not found
      </h2>
      
      {/* Description */}
      <p className="text-gray-500 mb-8 max-w-md">
        The page you are looking for does not exist or has been moved. Don’t worry, you can go back to the homepage or reload the page.
      </p>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleGoHome}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
        >
          <Icons.Home size={18} />
          Go to Home
        </button>

        <button
          onClick={handleReload}
          className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-xl transition"
        >
          <Icons.RotateCw size={18} />
          Reload Page
        </button>
      </div>

      {/* Optional footer note */}
      <p className="text-gray-400 text-sm mt-8">
        © {new Date().getFullYear()} Your E-commerce. All rights reserved.
      </p>
    </div>
  );
};

export default NotFound;
