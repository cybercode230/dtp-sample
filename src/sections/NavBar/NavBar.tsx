import React, { Suspense, lazy, memo, useState, useEffect } from "react";
import layoutConfigJson from "./layout_config.json";
import settingDataJson from "./setting_data.json";

type ModuleConfig = Record<string, any>;
const layoutConfig = layoutConfigJson as ModuleConfig;
const settingData = settingDataJson as ModuleConfig;

// Lazy imports
const LogoModule = lazy(() => import("./modules/LogoModule"));
const LanguageCurrencyModule = lazy(() => import("./modules/LanguageCurrencyModule"));
const NotificationsModule = lazy(() => import("./modules/NotificationsModule"));
const OrdersDeliveryModule = lazy(() => import("./modules/OrdersDeliveryModule"));
const CartModule = lazy(() => import("./modules/CartModule"));
const AccountModule = lazy(() => import("./modules/AccountModule"));
const CategoriesModule = lazy(() => import("./modules/CategoriesModule"));

const moduleMap: Record<string, React.LazyExoticComponent<React.FC<any>>> = {
  logoModule: LogoModule,
  languageCurrencyModule: LanguageCurrencyModule,
  notificationsModule: NotificationsModule,
  ordersDeliveryModule: OrdersDeliveryModule,
  cartModule: CartModule,
  accountModule: AccountModule,
  categoriesModule: CategoriesModule,
};

const NavBar: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000); // 1s loading
    return () => clearTimeout(timer);
  }, []);

  const row1Modules = layoutConfig.modules.filter(
    (m: any) => m.visible && m.name !== "categoriesModule"
  );
  const row2Modules = layoutConfig.modules.filter(
    (m: any) => m.visible && m.name === "categoriesModule"
  );

  const leftModules = row1Modules.filter((m: any) => m.align === "left");
  const centerModules = row1Modules.filter((m: any) => m.align === "center");
  const rightModules = row1Modules.filter((m: any) => m.align === "right");

  const renderModule = (mod: any) => {
    const Component = moduleMap[mod.name];
    if (!Component) return null;
    return (
      <Suspense
        key={mod.name}
        fallback={<div className="h-6 w-24 bg-gray-300 rounded animate-pulse" />}
      >
        <Component align={mod.align} data={settingData[mod.name]} />
      </Suspense>
    );
  };

  return (
    <nav className="w-full bg-white border-b border-gray-100">
      {/* ======= ROW 1 ======= */}
      <div className="flex flex-wrap md:flex-nowrap items-center px-6 sm:px-16 py-3 gap-4">
        {/* LEFT */}
        <div className="flex items-center gap-4 shrink-0">
          {isLoading
            ? leftModules.map((_: unknown, i: number) => (
                <div key={i} className="h-6 w-24 bg-gray-300 rounded animate-pulse" />
              ))
            : leftModules.map(renderModule)}
        </div>

        {/* CENTER */}
        <div className="flex-1 flex items-center justify-center min-w-[150px] h-10">
          {isLoading
            ? centerModules.map((_: unknown, i: number) => (
                <div key={i} className="h-6 w-32 bg-gray-300 rounded animate-pulse" />
              ))
            : centerModules.length > 0
            ? centerModules.map(renderModule)
            : <div className="w-full h-full" />}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 shrink-0">
          {isLoading
            ? rightModules.map((_: unknown, i: number) => (
                <div key={i} className="h-6 w-24 bg-gray-300 rounded animate-pulse" />
              ))
            : rightModules.map(renderModule)}
        </div>
      </div>

      {/* ======= ROW 2: CATEGORIES ======= */}
      {row2Modules.length > 0 && (
        <div className="flex items-center justify-start bg-gray-50 px-6 sm:px-16 py-3 gap-2 overflow-x-auto">
          {isLoading
            ? row2Modules.map((_: unknown, i: number) => (
                <div key={i} className="h-6 w-28 bg-gray-300 rounded animate-pulse" />
              ))
            : row2Modules.map(renderModule)}
        </div>
      )}
    </nav>
  );
};

export default memo(NavBar);
