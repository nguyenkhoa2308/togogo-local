// utils/statsCalculator.ts
import { Trade, Stats, WinRateData } from "../types";

export class StatsCalculator {
  static calculateStats(trades: Trade[]): Stats {
    if (!trades.length) {
      return {
        totalProfit: "0.00",
        winRate: "0.00%",
        maxDrawdown: "0.00",
        totalTrades: 0,
        profitFactor: "0.00",
        averageWin: "0.00",
        averageLoss: "0.00",
        consecutiveWins: 0,
        consecutiveLosses: 0,
        sharpeRatio: "0.00",
        tradingFrequency: "0.00",
        averageTradeDuration: "0.00h",
        largestWin: "0.00",
        largestLoss: "0.00",
        expectancy: "0.00",
        annualizedReturn: "0.00",
        volatility: "0.00",
        recoveryFactor: "0.00",
        sortinoRatio: "0.00",
        calmarRatio: "0.00",
        winLossRatio: "0.00",
        downsideDeviation: "0.00",
        dailyVaR: "0.00",
        maxConsecutiveWins: 0,
        maxConsecutiveLosses: 0,
        profitPerDay: "0.00",
        riskOfRuin: "0.00",
      };
    }

    const totalTrades = trades.length;
    const completedTrades = trades.filter(
      (trade) => trade.status === "Completed"
    );

    const profitableTradesCompleted = completedTrades.filter((t) => {
      const profitValue =
        typeof t.profit === "string" ? parseFloat(t.profit) : t.profit;
      return typeof profitValue === "number" && profitValue > 0;
    }).length;

    const totalCompletedTrades = completedTrades.length;
    const winTrades = trades.filter((trade) => trade.status === "Win");
    const lossTrades = trades.filter((trade) => trade.status === "Loss");
    const totalValidTrades = winTrades.length + lossTrades.length;
    const winRate =
      totalValidTrades > 0
        ? ((winTrades.length / totalValidTrades) * 100).toFixed(2) + "%"
        : "0.00%";

    const totalProfit = trades.reduce((sum, trade) => {
      const profit = typeof trade.profit === "number" ? trade.profit : 0;
      return sum + profit;
    }, 0);

    // Calculate max drawdown
    let maxDrawdown = 0;
    let peak = 0;
    let currentValue = 0;
    trades.forEach((trade) => {
      const profit = typeof trade.profit === "number" ? trade.profit : 0;
      currentValue += profit;
      if (currentValue > peak) {
        peak = currentValue;
      }
      const drawdown = peak > 0 ? ((peak - currentValue) / peak) * 100 : 0;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    });

    // Calculate profit factor
    const grossProfit = trades
      .filter((t) => {
        const profitValue =
          typeof t.profit === "string" ? parseFloat(t.profit) : t.profit;
        return typeof profitValue === "number" && profitValue > 0;
      })
      .reduce(
        (sum, t) => sum + (typeof t.profit === "number" ? t.profit : 0),
        0
      );

    const grossLoss = Math.abs(
      trades
        .filter((t) => {
          const profitValue =
            typeof t.profit === "string" ? parseFloat(t.profit) : t.profit;
          return typeof profitValue === "number" && profitValue < 0;
        })
        .reduce(
          (sum, t) => sum + (typeof t.profit === "number" ? t.profit : 0),
          0
        )
    );

    const profitFactor =
      grossLoss === 0 ? "∞" : (grossProfit / grossLoss).toFixed(2);

    // Calculate average win/loss (DÙNG TẤT CẢ TRADE, không chỉ Completed)
    const winTradesAll = trades.filter((t) => {
      const profitValue =
        typeof t.profit === "string" ? parseFloat(t.profit) : t.profit;
      return typeof profitValue === "number" && profitValue > 0;
    });
    const lossTradesAll = trades.filter((t) => {
      const profitValue =
        typeof t.profit === "string" ? parseFloat(t.profit) : t.profit;
      return typeof profitValue === "number" && profitValue < 0;
    });
    const grossProfitAll = winTradesAll.reduce(
      (sum, t) => sum + (typeof t.profit === "number" ? t.profit : 0),
      0
    );
    const grossLossAll = Math.abs(
      lossTradesAll.reduce(
        (sum, t) => sum + (typeof t.profit === "number" ? t.profit : 0),
        0
      )
    );
    const averageWin =
      winTradesAll.length > 0
        ? (grossProfitAll / winTradesAll.length).toFixed(2)
        : "0.00";
    const averageLoss =
      lossTradesAll.length > 0
        ? (grossLossAll / lossTradesAll.length).toFixed(2)
        : "0.00";

    // Calculate consecutive wins/losses
    let currentStreak = 0;
    let maxConsecutiveWins = 0;
    let maxConsecutiveLosses = 0;
    trades.forEach((trade) => {
      const profit = typeof trade.profit === "number" ? trade.profit : 0;
      if (profit > 0) {
        if (currentStreak > 0) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }
        maxConsecutiveWins = Math.max(maxConsecutiveWins, currentStreak);
      } else if (profit < 0) {
        if (currentStreak < 0) {
          currentStreak--;
        } else {
          currentStreak = -1;
        }
        maxConsecutiveLosses = Math.max(
          maxConsecutiveLosses,
          Math.abs(currentStreak)
        );
      }
    });

    // Calculate win/loss ratio
    const winLossRatio =
      averageLoss === "0.00"
        ? "∞"
        : (parseFloat(averageWin) / parseFloat(averageLoss)).toFixed(2);

    // Calculate expectancy
    const expectancy =
      totalCompletedTrades > 0
        ? (
            (profitableTradesCompleted / totalCompletedTrades) *
              (grossProfit / (profitableTradesCompleted || 1)) -
            ((totalCompletedTrades - profitableTradesCompleted) /
              totalCompletedTrades) *
              (grossLoss /
                (totalCompletedTrades - profitableTradesCompleted || 1))
          ).toFixed(2)
        : "0.00";

    // Calculate profit values for largest win/loss
    const profitValues = trades.map((t) => {
      const profitValue =
        typeof t.profit === "string" ? parseFloat(t.profit) : t.profit;
      return typeof profitValue === "number" ? profitValue : 0;
    });

    const largestWin = Math.max(
      ...profitValues.filter((p) => p > 0),
      0
    ).toFixed(2);
    const largestLoss = Math.min(
      ...profitValues.filter((p) => p < 0),
      0
    ).toFixed(2);

    // Simulated advanced metrics (for demo purposes)
    const annualizedReturn =
      totalTrades > 0 ? (totalProfit * (365 / totalTrades)).toFixed(2) : "0.00";
    const volatility = (Math.random() * 10 + 5).toFixed(2);
    const recoveryFactor =
      maxDrawdown > 0 ? (totalProfit / maxDrawdown).toFixed(2) : "0.00";
    const sortinoRatio = (Math.random() * 2 + 0.5).toFixed(2);
    const calmarRatio =
      maxDrawdown > 0 ? (totalProfit / maxDrawdown).toFixed(2) : "0.00";
    const downsideDeviation = (Math.random() * 5 + 2).toFixed(2);
    const dailyVaR = (Math.random() * 3 + 1).toFixed(2);
    const profitPerDay =
      totalTrades > 0 ? (totalProfit / (totalTrades * 0.5)).toFixed(2) : "0.00";
    const riskOfRuin =
      totalTrades > 0
        ? (Math.pow(1 - parseFloat(winRate) / 100, totalTrades) * 100).toFixed(
            2
          )
        : "0.00";
    const sharpeRatio = (Math.random() * 1 + 0.8).toFixed(2);
    const tradingFrequency = (Math.random() * 3 + 1).toFixed(1);
    const averageTradeDuration = (Math.random() * 8 + 2).toFixed(1) + "h";

    return {
      totalProfit: totalProfit.toFixed(2),
      winRate,
      maxDrawdown: maxDrawdown.toFixed(2),
      totalTrades,
      profitFactor,
      averageWin,
      averageLoss,
      consecutiveWins: maxConsecutiveWins,
      consecutiveLosses: maxConsecutiveLosses,
      sharpeRatio,
      tradingFrequency,
      averageTradeDuration,
      largestWin,
      largestLoss,
      expectancy,
      annualizedReturn,
      volatility,
      recoveryFactor,
      sortinoRatio,
      calmarRatio,
      winLossRatio,
      downsideDeviation,
      dailyVaR,
      maxConsecutiveWins,
      maxConsecutiveLosses,
      profitPerDay,
      riskOfRuin,
    };
  }

  static calculateWinRateData(trades: Trade[]): WinRateData {
    // Chỉ tính các trade có status là 'Win' hoặc 'Loss'
    const winTrades = trades.filter((trade) => trade.status === "Win");
    const lossTrades = trades.filter((trade) => trade.status === "Loss");
    const totalValidTrades = winTrades.length + lossTrades.length;
    const winRate =
      totalValidTrades > 0
        ? ((winTrades.length / totalValidTrades) * 100).toFixed(2) + "%"
        : "0.00%";
    return {
      winTrades: winTrades.length,
      lossTrades: lossTrades.length,
      totalValidTrades,
      winRate,
    };
  }

  static calculateProfitForPeriod(
    trades: Trade[],
    startDate: Date,
    endDate: Date
  ): number {
    return trades.reduce((sum, trade) => {
      if (trade.entryDate && typeof trade.profit === "number") {
        const tradeDate = new Date(trade.entryDate);
        if (tradeDate >= startDate && tradeDate <= endDate) {
          return sum + trade.profit;
        }
      }
      return sum;
    }, 0);
  }

  static calculateTotalProfit(trades: Trade[]): number {
    return trades.reduce((total, trade) => {
      if (typeof trade.profit === "number") {
        return total + trade.profit;
      }
      return total;
    }, 0);
  }
}
