// utils/chartDataGenerator.ts
import {
  Trade,
  TradeDistribution,
  MonthlyPerformance,
  ChartData,
} from "../types";

export class ChartDataGenerator {
  static generatePerformanceData(trades: Trade[], theme: any): ChartData[] {
    if (trades.length === 0) return [];

    const parseProfitValue = (profit: any): number => {
      if (typeof profit === "number") return profit;
      if (typeof profit === "string") {
        const parsed = parseFloat(profit);
        return isNaN(parsed) ? 0 : parsed;
      }
      return 0;
    };

    let cumulativeValue = 0;
    return trades.map((trade, index) => {
      const profit = parseProfitValue(trade.profit);
      cumulativeValue += profit;

      const dailyChange = profit;
      const barFill = dailyChange >= 0 ? theme.success : theme.danger;

      return {
        index: index + 1,
        date: trade.entryDate
          ? new Date(trade.entryDate).toISOString()
          : new Date().toISOString(),
        value: cumulativeValue,
        dailyChange: dailyChange,
        barFill: barFill,
      };
    });
  }

  static generateDrawdownData(trades: Trade[], theme: any): ChartData[] {
    if (trades.length === 0) return [];

    const parseProfitValue = (profit: any): number => {
      if (typeof profit === "number") return profit;
      if (typeof profit === "string") {
        const parsed = parseFloat(profit);
        return isNaN(parsed) ? 0 : parsed;
      }
      return 0;
    };

    let peak = 0;
    let currentValue = 0;
    return trades.map((trade, index) => {
      const profit = parseProfitValue(trade.profit);
      currentValue += profit;
      if (currentValue > peak) {
        peak = currentValue;
      }
      const drawdown = peak > 0 ? ((peak - currentValue) / peak) * 100 : 0;
      return {
        index: index + 1,
        date: trade.entryDate
          ? new Date(trade.entryDate).toISOString()
          : new Date().toISOString(),
        value: -Math.abs(drawdown),
        dailyChange: -Math.abs(drawdown),
        barFill: theme.danger,
      };
    });
  }

  static generateTradeDistribution(
    trades: Trade[],
    theme: any
  ): TradeDistribution[] {
    // Debug log để kiểm tra dữ liệu
    console.log("Trade Distribution - All trades:", trades);

    const parseProfitValue = (profit: any): number => {
      if (typeof profit === "number") return profit;
      if (typeof profit === "string") {
        const parsed = parseFloat(profit);
        return isNaN(parsed) ? 0 : parsed;
      }
      return 0;
    };

    // Lọc các trades đã đóng (status không phải Pending)
    const closedTrades = trades.filter((trade) => trade.status !== "Pending");

    console.log("Trade Distribution - Closed trades:", closedTrades);

    // Đếm trades thắng/thua dựa trên status và P&L cho các trades đã đóng
    let wins = 0;
    let losses = 0;

    closedTrades.forEach((trade) => {
      const profitValue = parseProfitValue(trade.profit);
      // Logic mới: Win nếu status là Win HOẶC status khác Pending và P&L > 0
      if (
        trade.status === "Win" ||
        (trade.status !== "Pending" && profitValue > 0)
      ) {
        wins++;
        // Logic mới: Loss nếu status là Loss HOẶC status khác Pending và P&L <= 0
      } else if (
        trade.status === "Loss" ||
        (trade.status !== "Pending" && profitValue <= 0)
      ) {
        losses++;
      }
    });

    console.log("Trade Distribution - Wins:", wins, "Losses:", losses);

    return [
      { name: "Thắng", value: wins, fill: theme.success },
      { name: "Thua", value: losses, fill: theme.danger },
    ];
  }

  static generateSymbolDistribution(trades: Trade[], theme: any) {
    const symbolMap = new Map();

    trades.forEach((trade) => {
      if (trade.symbol) {
        const count = symbolMap.get(trade.symbol) || 0;
        symbolMap.set(trade.symbol, count + 1);
      }
    });

    return Array.from(symbolMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([symbol, count], index) => ({
        name: symbol,
        value: count,
        fill: [
          theme.primary || "#3b82f6",
          theme.secondary || "#a855f7",
          theme.warning || "#f59e0b",
          "#8b5cf6",
          "#ec4899",
        ][index % 5],
      }));
  }

  static generateMonthlyPerformance(
    trades: Trade[],
    theme: any
  ): MonthlyPerformance[] {
    const parseProfitValue = (profit: any): number => {
      if (typeof profit === "number") return profit;
      if (typeof profit === "string") {
        const parsed = parseFloat(profit);
        return isNaN(parsed) ? 0 : parsed;
      }
      return 0;
    };

    const monthlyData = new Map();

    trades.forEach((trade) => {
      if (trade.entryDate) {
        const profit = parseProfitValue(trade.profit);
        if (profit !== 0) {
          const date = new Date(trade.entryDate);
          if (!isNaN(date.getTime())) {
            const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1)
              .toString()
              .padStart(2, "0")}`;
            const monthName = date.toLocaleString("vi-VN", { month: "long" });

            const currentValue = monthlyData.get(monthKey) || {
              month: monthName,
              performance: 0,
            };
            currentValue.performance += profit;
            monthlyData.set(monthKey, currentValue);
          }
        }
      }
    });

    // Chỉ trả về các tháng có giao dịch (loại bỏ tháng trống)
    const sortedMonths = Array.from(monthlyData.entries())
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .map(([monthKey, entry]) => ({
        ...entry,
        month: new Date(`${monthKey}-01`).toLocaleString("vi-VN", {
          month: "short",
        }),
        fill: entry.performance >= 0 ? theme.success : theme.danger,
      }));

    return sortedMonths;
  }

  static generateDailyPerformance(trades: Trade[], theme: any): ChartData[] {
    if (trades.length === 0) return [];

    const parseProfitValue = (profit: any): number => {
      if (typeof profit === "number") return profit;
      if (typeof profit === "string") {
        const parsed = parseFloat(profit);
        return isNaN(parsed) ? 0 : parsed;
      }
      return 0;
    };

    const dailyData = new Map();

    trades.forEach((trade) => {
      if (trade.entryDate) {
        const profit = parseProfitValue(trade.profit);
        if (profit !== 0) {
          const date = new Date(trade.entryDate);
          if (!isNaN(date.getTime())) {
            const dayKey = date.toISOString().split("T")[0];

            const currentValue = dailyData.get(dayKey) || {
              date: dayKey,
              value: 0,
              dailyChange: 0,
            };

            currentValue.value += profit;
            currentValue.dailyChange += profit;
            dailyData.set(dayKey, currentValue);
          }
        }
      }
    });

    return Array.from(dailyData.values())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((entry, index) => ({
        index: index + 1,
        date: entry.date,
        value: entry.value,
        dailyChange: entry.dailyChange,
        barFill: entry.dailyChange >= 0 ? theme.success : theme.danger,
      }));
  }

  static generateProfitDistribution(trades: Trade[], theme: any): any[] {
    const parseProfitValue = (profit: any): number => {
      if (typeof profit === "number") return profit;
      if (typeof profit === "string") {
        const parsed = parseFloat(profit);
        return isNaN(parsed) ? 0 : parsed;
      }
      return 0;
    };

    // Chia nhóm hợp lý hơn cho nhà đầu tư
    const ranges = [
      {
        min: -Infinity,
        max: -50,
        label: "Lỗ rất lớn (< -50%)",
        color: "#b91c1c",
      },
      { min: -50, max: -20, label: "Lỗ vừa (-50% đến -20%)", color: "#f87171" },
      { min: -20, max: -5, label: "Lỗ nhẹ (-20% đến -5%)", color: "#fbbf24" },
      { min: -5, max: 0, label: "Gần hòa vốn (-5% đến 0%)", color: "#a3a3a3" },
      { min: 0, max: 5, label: "Lãi nhẹ (0% đến 5%)", color: "#6ee7b7" },
      { min: 5, max: 20, label: "Lãi vừa (5% đến 20%)", color: "#34d399" },
      { min: 20, max: Infinity, label: "Lãi lớn (> 20%)", color: "#059669" },
    ];

    return ranges.map((range) => {
      const count = trades.filter((t) => {
        const profitValue = parseProfitValue(t.profit);
        return profitValue >= range.min && profitValue < range.max;
      }).length;
      return {
        range: range.label,
        count: count,
        fill: range.color,
      };
    });
  }

  static generateRiskMetrics(trades: Trade[]) {
    // Debug log để kiểm tra dữ liệu
    console.log("Risk Metrics - All trades:", trades);

    const parseProfitValue = (profit: any): number => {
      if (typeof profit === "number") return profit;
      if (typeof profit === "string") {
        const parsed = parseFloat(profit);
        return isNaN(parsed) ? 0 : parsed;
      }
      return 0;
    };

    // Lọc các trades đã đóng (status không phải Pending)
    const closedTrades = trades.filter((trade) => trade.status !== "Pending");

    console.log("Risk Metrics - Closed trades:", closedTrades);

    if (closedTrades.length === 0) {
      return {
        sharpeRatio: 0,
        maxDrawdown: 0,
        winRate: 0,
        profitFactor: 0,
        expectancy: 0,
        volatility: 0,
      };
    }

    // Đếm trades thắng/thua dựa trên status và P&L cho các trades đã đóng
    let wins = 0;
    let losses = 0;

    closedTrades.forEach((trade) => {
      const profitValue = parseProfitValue(trade.profit);
      // Logic mới: Win nếu status là Win HOẶC status khác Pending và P&L > 0
      if (
        trade.status === "Win" ||
        (trade.status !== "Pending" && profitValue > 0)
      ) {
        wins++;
        // Logic mới: Loss nếu status là Loss HOẶC status khác Pending và P&L <= 0
      } else if (
        trade.status === "Loss" ||
        (trade.status !== "Pending" && profitValue <= 0)
      ) {
        losses++;
      }
    });

    // Tổng số trades có kết quả (đã đóng)
    const totalTradesWithResult = closedTrades.length;

    // DEBUG LOG CUỐI CÙNG TRƯỚC KHI TÍNH WINRATE
    console.log(
      `DEBUG WINRATE: Wins = ${wins}, Losses = ${losses}, Total Trades with Result = ${totalTradesWithResult}`
    );

    const winRate =
      totalTradesWithResult > 0 ? (wins / totalTradesWithResult) * 100 : 0;

    console.log("Risk Metrics - Calculated Winrate:", winRate);

    const profits = closedTrades.map((t) => parseProfitValue(t.profit));
    const grossProfit = profits.reduce(
      (sum, profit) => sum + (profit > 0 ? profit : 0),
      0
    );
    const grossLoss = Math.abs(
      profits.reduce((sum, profit) => sum + (profit <= 0 ? profit : 0), 0)
    );
    const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : 0;

    const avgProfit =
      profits.reduce((sum, profit) => sum + profit, 0) / closedTrades.length;
    const variance =
      profits.reduce(
        (sum, profit) => sum + Math.pow(profit - avgProfit, 2),
        0
      ) / closedTrades.length;
    const volatility = Math.sqrt(variance);
    const sharpeRatio = volatility > 0 ? avgProfit / volatility : 0;

    let maxDrawdown = 0;
    let peak = 0;
    let runningProfit = 0;

    closedTrades.forEach((trade) => {
      runningProfit += parseProfitValue(trade.profit);
      peak = Math.max(peak, runningProfit);
      const drawdown = peak > 0 ? ((peak - runningProfit) / peak) * 100 : 0;
      maxDrawdown = Math.max(maxDrawdown, drawdown);
    });

    const averageWin = wins > 0 ? grossProfit / wins : 0;
    const averageLoss = losses > 0 ? grossLoss / losses : 0;
    const expectancy =
      (winRate / 100) * averageWin - ((100 - winRate) / 100) * averageLoss;

    return {
      sharpeRatio: Math.max(0, Math.min(5, sharpeRatio)),
      maxDrawdown: Math.max(0, Math.min(100, maxDrawdown)),
      winRate: Math.max(0, Math.min(100, winRate)),
      profitFactor: Math.max(0, Math.min(10, profitFactor)),
      expectancy: Math.max(-10, Math.min(10, expectancy)),
      volatility: Math.max(0, Math.min(10, volatility)),
    };
  }

  static generateRiskMetricsData(stats: any): any[] {
    return [
      {
        name: "Sharpe Ratio",
        value: parseFloat(stats.sharpeRatio) || 0,
        fullMark: 3,
      },
      {
        name: "Win Rate",
        value: (parseFloat(stats.winRate.replace("%", "")) / 100) * 3 || 0,
        fullMark: 3,
      },
      {
        name: "Profit Factor",
        value:
          stats.profitFactor === "∞"
            ? 3
            : Math.min(parseFloat(stats.profitFactor) || 0, 3),
        fullMark: 3,
      },
      {
        name: "Max Drawdown",
        value: Math.min(parseFloat(stats.maxDrawdown) || 0, 3),
        fullMark: 3,
      },
    ];
  }

  static generateTradeTiming(
    trades: Trade[],
    theme: any,
    groupBy: number = 1
  ): any[] {
    // groupBy: số giờ mỗi nhóm (1 = từng giờ, 2 = mỗi 2h, 4 = mỗi 4h, ...)
    const numGroups = Math.ceil(24 / groupBy);
    const hours = Array.from({ length: numGroups }, (_, i) => ({
      label: `${(i * groupBy).toString().padStart(2, "0")}:00 - ${(
        (i + 1) * groupBy -
        1
      )
        .toString()
        .padStart(2, "0")}:59`,
      totalTrades: 0,
      totalVolume: 0,
    }));

    trades.forEach((trade) => {
      if (
        trade.entryDate &&
        ["Completed", "Win", "Loss"].includes(trade.status)
      ) {
        const hourVN = this.getVietnamHour(trade.entryDate);
        const groupIdx = Math.floor(hourVN / groupBy);
        const volume = typeof trade.volume === "number" ? trade.volume : 0;
        hours[groupIdx].totalTrades += 1;
        hours[groupIdx].totalVolume += volume;
      }
    });

    return hours;
  }

  static generateWeekdayDistribution(trades: Trade[], theme: any): any[] {
    // Khởi tạo mảng 7 ngày
    const weekdays = [
      { key: 1, label: "Thứ 2", fill: theme.info },
      { key: 2, label: "Thứ 3", fill: theme.success },
      { key: 3, label: "Thứ 4", fill: theme.warning },
      { key: 4, label: "Thứ 5", fill: theme.orange },
      { key: 5, label: "Thứ 6", fill: theme.pink },
      { key: 6, label: "Thứ 7", fill: theme.cyan },
      { key: 0, label: "CN", fill: theme.danger },
    ];
    const counts = [0, 0, 0, 0, 0, 0, 0];
    trades.forEach((trade) => {
      if (trade.entryDate) {
        const date = new Date(trade.entryDate);
        if (!isNaN(date.getTime())) {
          const day = date.getDay(); // 0: CN, 1: Thứ 2, ...
          counts[day]++;
        }
      }
    });
    return weekdays.map((w, idx) => ({
      weekday: w.label,
      value: counts[w.key],
      fill: w.fill,
    }));
  }

  static generateDailyTradeCount(
    trades: Trade[],
    startDate: Date,
    endDate: Date,
    theme: any
  ): any[] {
    // Tạo mảng các ngày trong khoảng
    const days = [];
    let current = new Date(startDate);
    current.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);
    while (current <= end) {
      days.push({
        date: current.toISOString().split("T")[0],
        label: `${current.getDate()}/${current.getMonth() + 1}`,
        value: 0,
        fill: theme.info,
      });
      current = new Date(current.getTime() + 24 * 60 * 60 * 1000);
    }
    // Đếm số lượng giao dịch cho từng ngày
    trades.forEach((trade) => {
      if (trade.entryDate) {
        const d = new Date(trade.entryDate);
        d.setHours(0, 0, 0, 0);
        const key = d.toISOString().split("T")[0];
        const found = days.find((item) => item.date === key);
        if (found) found.value++;
      }
    });
    return days;
  }

  // Hàm chuẩn hóa lấy giờ Việt Nam từ entryDate (luôn cộng 7 giờ, giống Helpers.formatDateTime)
  static getVietnamHour(entryDate: string) {
    const date = new Date(entryDate);
    return new Date(date.getTime() + 7 * 60 * 60 * 1000).getHours();
  }
}
