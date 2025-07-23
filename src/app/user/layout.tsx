"use client";

import { useEffect, useState, type ReactNode } from "react";
import { SideBar } from "@/app/user/layouts/SideBar";
import { usePathname } from "next/navigation";
import { Header } from "@/app/user/layouts/Header";
// import Dashboard from "./bot-dashboard/page";
// import BotManagement from "./bot-dashboard/bot-management/page";
// import StrategiesPage from "./bot-dashboard/strategies/page";
// import các tab khác nếu có...

export default function BotDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathName = usePathname();
  const [activeTab, setActiveTab] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive logic
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) {
        // On mobile, close sidebar and don't allow collapse
        setSidebarOpen(false);
        setSidebarCollapsed(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // const handleTabChange = (tab: string) => {
  //   onTabChange(tab);
  //   if (isMobile) {
  //     setSidebarOpen(false); // Close mobile sidebar when navigating
  //   }
  // };

  const handleToggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  useEffect(() => {
    const parts = pathName.split("/").filter(Boolean);
    if (parts.length === 1 && parts[0] === "bot-dashboard") {
      setActiveTab("dashboard");
    } else {
      setActiveTab(parts[1] || "dashboard"); // phần sau bot-dashboard
    }
  }, [pathName]);

  // const renderContent = () => {
  //   switch (activeTab) {
  //     case "dashboard":
  //       return <Dashboard />;
  //     case "bot-management":
  //       return <BotManagement />;
  //     case "strategy":
  //       return <StrategiesPage />;
  //     case "analysis":
  //       return <AnalyticsPage />;
  //     case "portfolio":
  //       return <Portfolio />;
  //     case "history":
  //       return <History />;
  //     case "risk-management":
  //       return <RiskManagement />;
  //     case "settings":
  //       return <Settings />;
  //     default:
  //       return <Dashboard />;
  //   }
  // };

  return (
    <section className="flex">
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, #00e5a105 0%, transparent 40%),
                        radial-gradient(circle at 80% 70%, #00e5a103 0%, transparent 40%),
                        linear-gradient(135deg, #020617 0%, #0f172a 25%, #1e293b 50%, #0f172a 75%, #020617 100%)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      />
      {/* Sidebar */}
      <div
        className={`layout-sidebar ${
          isMobile
            ? `fixed z-50 transition-transform duration-300 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : "relative z-1"
        }`}
      >
        <SideBar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="flex flex-col w-full overflow-hidden">
        {/* Header */}
        <Header
          isMobile={isMobile}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={handleToggleSidebar}
        />

        {/* <main className="flex-1 overflow-auto">{renderContent()}</main> */}
        {/* <main className="flex-1 overflow-auto">{children}</main> */}
        <main className="relative min-h-screen overflow-hidden">
          <div className="relative">{children}</div>
        </main>
      </div>
    </section>
  );
}
