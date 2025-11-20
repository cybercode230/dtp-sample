import React, { Suspense, lazy, memo, useState, useEffect } from "react";
import layoutConfigJson from "./layout_config.json";
import settingDataJson from "./setting_data.json";

type ModuleConfig = Record<string, any>;
const layoutConfig = layoutConfigJson as ModuleConfig;
const settingData = settingDataJson as ModuleConfig;

// Lazy imports
const LogoModule = lazy(() => import("./modules/LogoModule"));
const NotificationsModule = lazy(() => import("./modules/NotificationsModule"));
const AccountModule = lazy(() => import("./modules/AccountModule"));

const moduleMap: Record<string, React.LazyExoticComponent<React.FC<any>>> = {
  logoModule: LogoModule,
  notificationsModule: NotificationsModule,
  accountModule: AccountModule,
};

const NavBar: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const modules = layoutConfig.modules.filter((m: any) => m.visible);

  const leftModules = modules.filter((m: any) => m.name === "logoModule");
  const rightModules = modules.filter(
    (m: any) => m.name === "notificationsModule" || m.name === "accountModule"
  );

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
      {/* ======= TOP ROW (ONLY LEFT + RIGHT) ======= */}
      <div className="flex items-center justify-between px-6 sm:px-16 py-3 gap-4">
        {/* LEFT */}
        <div className="flex items-center gap-4 shrink-0">
          {isLoading
            ? leftModules.map((_: unknown, i: number) => (
                <div key={i} className="h-6 w-24 bg-gray-300 rounded animate-pulse" />
              ))
            : leftModules.map(renderModule)}
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
    </nav>
  );
};

export default memo(NavBar);
