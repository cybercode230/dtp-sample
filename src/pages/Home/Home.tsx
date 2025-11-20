import React, { Suspense, lazy } from "react";

// Lazy import for SearchSection
const SearchSection = lazy(() => import("../../sections/SearchSection/SearchSection"));

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white px-4 sm:px-10 py-10">
      {/* Header / Help Center Introduction */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          DTP Help Center – ICT Chamber
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-2">
          Welcome to the Digital Transformation Program (DTP) Help Center. 
        </p>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Here you can find guidance, resources, and support for using digital tools and programs provided by the ICT Chamber. 
          Use the search below to quickly locate FAQs, tutorials, and documentation to help you get started and solve issues efficiently.
        </p>
      </header>

      {/* Search Section */}
      <div className="w-full flex justify-center">
        <Suspense
          fallback={
            <div className="w-full max-w-4xl h-24 bg-gray-200 rounded-xl animate-pulse" />
          }
        >
          <SearchSection />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
