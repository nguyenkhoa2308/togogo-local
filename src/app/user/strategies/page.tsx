"use client";

import React, { Suspense, lazy, useMemo } from "react";
import { useDashboard } from "./hooks/useDashboard";
import { TabNavigation } from "./components/navigation/TabNavigation";
import { Helpers } from "./utils/helpers";

const OverviewTab = React.memo(
  lazy(() => import("./components/tabs/OverviewTab"))
);
const TradesTab = React.memo(lazy(() => import("./components/tabs/TradesTab")));
const AnalyticsTab = React.memo(
  lazy(() => import("./components/tabs/AnalyticsTab"))
);
const TopBotTab = React.memo(lazy(() => import("./components/tabs/TopBotTab")));
const History3MonthsTab = React.memo(
  lazy(() => import("./components/tabs/History3MonthsTab"))
);

const BotReviewsTab = React.memo(
  lazy(() => import("./components/tabs/BotReviewsTab"))
);

export default function StrategiesPage() {
  const dashboardData = useDashboard();
  const { activeTab, setActiveTab } = dashboardData;
  const [selectedBotType, setSelectedBotType] = React.useState("");

  // Lọc bots theo loại bot đã chọn (dùng chung cho mọi tab)
  const filteredBots = React.useMemo(() => {
    return Helpers.filterBotsByType(dashboardData.bots, selectedBotType);
  }, [dashboardData.bots, selectedBotType]);

  // Tự động cập nhật selectedBotId khi đổi loại bot hoặc danh sách bot lọc thay đổi
  React.useEffect(() => {
    if (filteredBots.length > 0) {
      dashboardData.setSelectedBotId(filteredBots[0].botId);
    } else {
      dashboardData.setSelectedBotId("");
    }
  }, [selectedBotType, filteredBots]);

  // ĐỒNG BỘ: Truyền trực tiếp dashboardData.trades vào OverviewTab và TradesTab, không filter lại theo botId ở FE
  // const filteredTrades = React.useMemo(() => {
  //   let result = dashboardData.trades;
  //   if (dashboardData.selectedBotId) {
  //     result = result.filter(
  //       (trade) => String(trade.botId) === String(dashboardData.selectedBotId)
  //     );
  //   }
  //   return result;
  // }, [dashboardData.trades, dashboardData.selectedBotId]);

  // Log debug trước khi render tab Trades
  // console.log("filteredTrades:", filteredTrades);

  const tabComponents = useMemo(
    () => ({
      overview: (
        <OverviewTab
          key="overview"
          bots={filteredBots}
          selectedBotId={dashboardData.selectedBotId}
          setSelectedBotId={dashboardData.setSelectedBotId}
          timeframe={dashboardData.timeframe}
          setTimeframe={dashboardData.setTimeframe}
          showAdvancedStats={dashboardData.showAdvancedStats}
          setShowAdvancedStats={dashboardData.setShowAdvancedStats}
          stats={dashboardData.stats}
          profitToday={dashboardData.profitToday}
          profitYesterday={dashboardData.profitYesterday}
          profitLastWeek={dashboardData.profitLastWeek}
          profitLastMonth={dashboardData.profitLastMonth}
          winRateData={dashboardData.winRateData}
          chartData={dashboardData.chartData}
          trades={dashboardData.trades}
          loading={dashboardData.loading}
          error={dashboardData.error}
          setActiveTab={dashboardData.setActiveTab}
          selectedBotType={dashboardData.selectedBotType}
          setSelectedBotType={dashboardData.setSelectedBotType}
          // 🔥 Thêm đầy đủ các filter props
          searchTerm={dashboardData.searchTerm}
          setSearchTerm={dashboardData.setSearchTerm}
          selectedTypeFilter={dashboardData.selectedTypeFilter}
          setSelectedTypeFilter={dashboardData.setSelectedTypeFilter}
          selectedStatusFilter={dashboardData.selectedStatusFilter}
          setSelectedStatusFilter={dashboardData.setSelectedStatusFilter}
          startDateFilter={dashboardData.startDateFilter}
          setStartDateFilter={dashboardData.setStartDateFilter}
          endDateFilter={dashboardData.endDateFilter}
          setEndDateFilter={dashboardData.setEndDateFilter}
          orderCodeFilter={dashboardData.orderCodeFilter}
          setOrderCodeFilter={dashboardData.setOrderCodeFilter}
          handleExport={dashboardData.handleExport}
          isExporting={dashboardData.isExporting}
          setCurrentPage={dashboardData.setCurrentPage}
        />
      ),
      trades: (
        <TradesTab
          key="trades"
          trades={{
            bots: dashboardData.bots,
            selectedBotId: dashboardData.selectedBotId,
            setSelectedBotId: dashboardData.setSelectedBotId,
            filteredTrades: dashboardData.filteredTrades,
            searchTerm: dashboardData.searchTerm,
            setSearchTerm: dashboardData.setSearchTerm,
            selectedTypeFilter: dashboardData.selectedTypeFilter,
            setSelectedTypeFilter: dashboardData.setSelectedTypeFilter,
            selectedStatusFilter: dashboardData.selectedStatusFilter,
            setSelectedStatusFilter: dashboardData.setSelectedStatusFilter,
            startDateFilter: dashboardData.startDateFilter,
            setStartDateFilter: dashboardData.setStartDateFilter,
            endDateFilter: dashboardData.endDateFilter,
            setEndDateFilter: dashboardData.setEndDateFilter,
            setCurrentPage: dashboardData.setCurrentPage,
            handleExport: dashboardData.handleExport,
            isExporting: dashboardData.isExporting,
          }}
          loading={dashboardData.loading}
          error={dashboardData.error}
          goToNextPage={dashboardData.goToNextPage}
          goToPrevPage={dashboardData.goToPrevPage}
          goToFirstPage={dashboardData.goToFirstPage}
          goToPage={dashboardData.goToPage}
          currentPage={dashboardData.currentPage}
          hasMoreTrades={dashboardData.hasMoreTrades}
          totalTrades={dashboardData.totalTrades}
          pageSize={dashboardData.pageSize}
          disableAnimation
          selectedBotType={selectedBotType}
          setSelectedBotType={setSelectedBotType}
        />
      ),
      analytics: (
        <AnalyticsTab
          key="analytics"
          bots={filteredBots}
          selectedBotId={dashboardData.selectedBotId}
          setSelectedBotId={dashboardData.setSelectedBotId}
          timeframe={dashboardData.timeframe}
          setTimeframe={dashboardData.setTimeframe}
          riskLevel={dashboardData.riskLevel}
          setRiskLevel={dashboardData.setRiskLevel}
          chartData={dashboardData.chartData}
          stats={dashboardData.stats}
          winRateData={dashboardData.winRateData}
          trades={dashboardData.trades}
          error={dashboardData.error}
          allTrades={dashboardData.allTrades}
          disableAnimation
          selectedBotType={selectedBotType}
          setSelectedBotType={setSelectedBotType}
          // ✅ Thêm nếu cần dùng bộ lọc ở tab Analytics
          searchTerm={dashboardData.searchTerm}
          setSearchTerm={dashboardData.setSearchTerm}
          selectedTypeFilter={dashboardData.selectedTypeFilter}
          setSelectedTypeFilter={dashboardData.setSelectedTypeFilter}
          selectedStatusFilter={dashboardData.selectedStatusFilter}
          setSelectedStatusFilter={dashboardData.setSelectedStatusFilter}
          startDateFilter={dashboardData.startDateFilter}
          setStartDateFilter={dashboardData.setStartDateFilter}
          endDateFilter={dashboardData.endDateFilter}
          setEndDateFilter={dashboardData.setEndDateFilter}
          orderCodeFilter={dashboardData.orderCodeFilter}
          setOrderCodeFilter={dashboardData.setOrderCodeFilter}
          handleExport={dashboardData.handleExport}
          isExporting={dashboardData.isExporting}
          setCurrentPage={dashboardData.setCurrentPage}
        />
      ),
      topBot: (
        <TopBotTab
          key="topBot"
          botRankings={dashboardData.botRankingsData}
          loadingRankings={dashboardData.loadingRankings}
          handleBotClick={dashboardData.handleBotClick}
          rankingTimeframe={dashboardData.rankingTimeframe}
          onRankingTimeframeChange={dashboardData.onRankingTimeframeChange}
          disableAnimation
        />
      ),
      history3months: (
        <History3MonthsTab
          key="history3months"
          bots={filteredBots}
          filteredTrades={dashboardData.filteredAllTrades}
          selectedBotId={dashboardData.selectedBotId}
          setSelectedBotId={dashboardData.setSelectedBotId}
          selectedBotType={selectedBotType}
          setSelectedBotType={setSelectedBotType}
          searchTerm={dashboardData.searchTerm}
          setSearchTerm={dashboardData.setSearchTerm}
          selectedTypeFilter={dashboardData.selectedTypeFilter}
          setSelectedTypeFilter={dashboardData.setSelectedTypeFilter}
          selectedStatusFilter={dashboardData.selectedStatusFilter}
          setSelectedStatusFilter={dashboardData.setSelectedStatusFilter}
          startDateFilter={dashboardData.startDateFilter}
          setStartDateFilter={dashboardData.setStartDateFilter}
          endDateFilter={dashboardData.endDateFilter}
          setEndDateFilter={dashboardData.setEndDateFilter}
          setCurrentPage={dashboardData.setCurrentPage}
        />
      ),
      botReviews: (
        <BotReviewsTab
          key="botReviews"
          // usedBots={dashboardData.usedBots}
          // onSubmitReview={dashboardData.onSubmitReview}
          // loading={dashboardData.loadingReviews}
          // error={dashboardData.reviewError}
        />
      ),
    }),
    [dashboardData, filteredBots, selectedBotType, setSelectedBotType]
  );

  // Lưu trạng thái tab đã từng mở
  const [visitedTabs, setVisitedTabs] = React.useState<Record<string, boolean>>(
    { overview: true }
  );
  React.useEffect(() => {
    setVisitedTabs((prev) => ({ ...prev, [activeTab]: true }));
  }, [activeTab]);

  return (
    <main className="flex-1 px-6 pt-8 pb-8 relative z-10">
      {/* Dashboard Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Backtest Dashboard</h1>
        <p className="text-gray-300 mt-1">
          Phân tích hiệu suất và quản lý giao dịch của các bot
        </p>
      </div>

      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab Content - Keep-alive các tab đã từng mở */}
      <div className="tab-content">
        {Object.keys(tabComponents).map((tabKey) =>
          visitedTabs[tabKey] ? (
            <div
              key={tabKey}
              style={{ display: activeTab === tabKey ? "block" : "none" }}
            >
              <Suspense
                fallback={
                  <div className="text-center py-8">Đang tải tab...</div>
                }
              >
                {tabComponents[tabKey]}
              </Suspense>
            </div>
          ) : null
        )}
      </div>
    </main>
  );
}
