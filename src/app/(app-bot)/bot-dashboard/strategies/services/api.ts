// services/api.ts
import { Bot, Trade } from "../types";

const API_BASE_URL = "https://apibacktest.togogo.vn/api/DataManagement";

export class ApiService {
  static async loadBots(): Promise<Bot[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/bots`, {
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to load bots");
      }
      return await response.json();
    } catch (error) {
      console.error("Error loading bots:", error);
      throw error;
    }
  }

  static async fetchTrades(params: {
    botId: string;
    pageIndex: number;
    pageSize: number;
    type?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<{ trades: Trade[] }> {
    if (!params.botId) {
      return { trades: [] };
    }

    try {
      let apiUrl = `${API_BASE_URL}/trades?BotId=${params.botId}&pageIndex=${params.pageIndex}&pageSize=${params.pageSize}`;
      console.log("Fetching trades with URL:", apiUrl);
      if (params.type) apiUrl += `&type=${params.type}`;
      if (params.status) apiUrl += `&status=${params.status}`;
      if (params.startDate) apiUrl += `&startDate=${params.startDate}`;
      if (params.endDate) apiUrl += `&endDate=${params.endDate}`;

      console.log("Fetching trades with URL:", apiUrl);

      const response = await fetch(apiUrl, {
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to load trades");

      const data = await response.json();
      console.log("API Response for page", params.pageIndex, ":", {
        totalTrades: data.trades?.length,
        firstTradeId: data.trades?.[0]?.tradeId,
        lastTradeId: data.trades?.[data.trades.length - 1]?.tradeId,
      });

      return data;
    } catch (error) {
      console.error("Error loading trades:", error);
      throw error;
    }
  }

  static async fetchAllBotsProfit(bots: Bot[]): Promise<
    Array<{
      botId: string;
      botName: string;
      totalProfit: number;
      totalTrades: number;
    }>
  > {
    const results = [];

    for (const bot of bots) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/trades?BotId=${bot.botId}&pageIndex=0&pageSize=10000`,
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.ok) {
          const data = await response.json();
          const botTrades = data.trades || [];
          const totalProfit = botTrades.reduce(
            (total: number, trade: Trade) => {
              if (typeof trade.profit === "number") {
                return total + trade.profit;
              }
              return total;
            },
            0
          );

          results.push({
            botId: bot.botId,
            botName: bot.botName,
            totalProfit,
            totalTrades: botTrades.length,
          });
        } else {
          console.error(`Failed to fetch trades for bot ${bot.botName}`);
          results.push({
            botId: bot.botId,
            botName: bot.botName,
            totalProfit: 0,
            totalTrades: 0,
          });
        }
      } catch (error) {
        console.error(`Error fetching trades for bot ${bot.botName}:`, error);
        results.push({
          botId: bot.botId,
          botName: bot.botName,
          totalProfit: 0,
          totalTrades: 0,
        });
      }
    }

    return results.sort((a, b) => b.totalProfit - a.totalProfit);
  }
}
