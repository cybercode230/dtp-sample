import React, { Suspense, lazy } from "react";
import homeSections from "../../components/cards/setting_product.json";


// Lazy imports for sections
const NavBar = lazy(() => import("../../sections/NavBar/NavBar"));
const SearchSection = lazy(() => import("../../sections/SearchSection/SearchSection"));


const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <Suspense fallback={<div className="w-full h-20 bg-gray-200 animate-pulse" />}>
        <NavBar />
      </Suspense>

      {/* Hero / Search Section */}
      <div className="w-full flex justify-center mt-6 px-4 sm:px-10">
        <Suspense fallback={<div className="w-full max-w-4xl h-24 bg-gray-200 rounded-xl animate-pulse" />}>
          <SearchSection />
        </Suspense>
      </div>

      {/* Savings Booster Section */}
      <div className="w-full mt-10 px-4 sm:px-0">
        <Suspense fallback={
          <div className="w-full max-w-6xl mx-auto h-64 bg-gray-200 rounded-xl animate-pulse" />
        }>
          <SavingsBoosterSection />
        </Suspense>
      </div>    
      {/* single product section */}
      <div className="w-full mt-10 px-4 sm:px-0">
        <Suspense fallback={
          <div className="w-full max-w-6xl mx-auto h-64 bg-gray-200 rounded-xl animate-pulse" />
        }>
         {homeSections.map((section) => (
  <ProductSection
    key={section.id}
    title={section.title}
    subtitle={section.subtitle}
    viewMore={section.viewMore}
    products={section.products}
  />
))}
        </Suspense>
      </div>      

      {/* Optional Footer */}
<Suspense fallback={
          <div className="w-full max-w-6xl mx-auto h-64 bg-gray-200 rounded-xl animate-pulse" />
        }>
          <Footer />
        </Suspense>
    </div>
  );
};

export default Home;
