// utils/helpers.ts - FIXED VERSION
import { Trade } from "../types";

export class Helpers {
  // Format timestamp to localized date time
  static formatDateTime(timestamp: string | undefined): string {
    if (!timestamp) return "N/A";

    try {
      return new Date(
        new Date(timestamp).getTime() + 7 * 60 * 60 * 1000
      ).toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    } catch (err) {
      console.error("Error formatting date:", err);
      return "N/A";
    }
  }

  // Format numbers with proper precision
  static formatNumber(
    value: number | string | undefined,
    precision: number = 2
  ): string {
    if (value === undefined || value === null) return "N/A";

    if (typeof value === "number") {
      return value.toFixed(precision);
    }

    const parsedValue = parseFloat(value.toString());
    return isNaN(parsedValue) ? value : parsedValue.toFixed(precision);
  }

  // Get trade status with proper logic
  static getTradeStatus(trade: Trade): string {
    if (trade.status === "Pending") {
      return "Pending";
    }

    if (trade.status === "Completed") {
      if (typeof trade.profit === "number") {
        return trade.profit > 0 ? "Win" : "Loss"; // CHANGED: >= 0 to > 0
      }
    }

    return trade.status || "Completed";
  }

  // Get top icon for rankings
  static getTopIcon(index: number): string | null {
    switch (index) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return null;
    }
  }

  // Type guard for checking if value is number
  static isNumber(value: any): value is number {
    return typeof value === "number";
  }

  // Generate gradient configuration (NO JSX in .ts file)
  static getGradientConfig(id: string, startColor: string, endColor: string) {
    return {
      id,
      startColor,
      endColor,
      // Use this in your component like:
      // <defs>
      //   <linearGradient id={config.id} x1="0" y1="0" x2="0" y2="1">
      //     <stop offset="5%" stopColor={config.startColor} stopOpacity={0.8} />
      //     <stop offset="95%" stopColor={config.endColor} stopOpacity={0.1} />
      //   </linearGradient>
      // </defs>
    };
  }

  // Format locale number
  static formatLocaleNumber(
    value: number | string,
    options?: Intl.NumberFormatOptions
  ): string {
    if (typeof value === "string") {
      const parsed = parseFloat(value);
      if (isNaN(parsed)) return value;
      value = parsed;
    }

    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...options,
    });
  }

  // Validate and parse profit value
  static parseProfitValue(profit: number | string | undefined): number {
    if (typeof profit === "number") {
      return profit;
    }
    if (typeof profit === "string") {
      const parsed = parseFloat(profit);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  }

  // Get status color class
  static getStatusColorClass(status: string, profit?: number | string): string {
    if (status === "Completed") {
      const profitValue = this.parseProfitValue(profit);
      return profitValue > 0 // CHANGED: >= 0 to > 0
        ? "bg-green-600 text-white"
        : "bg-red-600 text-white";
    }
    if (status === "Pending") {
      return "bg-amber-600 text-white";
    }
    return "bg-gray-700 text-white";
  }

  // Get profit display with sign
  static getProfitDisplay(profit: number | string | undefined): string {
    const profitValue = this.parseProfitValue(profit);
    const sign = profitValue > 0 ? "+" : ""; // CHANGED: >= 0 to > 0
    return `${sign}${profitValue.toFixed(2)}`;
  }

  // Get profit color class
  static getProfitColorClass(profit: number | string | undefined): string {
    const profitValue = this.parseProfitValue(profit);
    return profitValue > 0 // CHANGED: >= 0 to > 0
      ? "text-green-600 dark:text-green-500"
      : "text-red-600 dark:text-red-500";
  }

  // Get symbol icon
  static getSymbolIcon(symbol: string | undefined): string {
    if (!symbol) return "?";
    return symbol.split("/")[0]?.charAt(0) || "?";
  }

  // Format duration - FIXED
  static formatDuration(duration: string | number | undefined): string {
    if (!duration) return "N/A";

    // Convert to string if it's a number
    const durationStr =
      typeof duration === "number" ? duration.toString() : duration;

    // Check if already formatted
    if (
      typeof durationStr === "string" &&
      (durationStr.includes("h") ||
        durationStr.includes("m") ||
        durationStr.includes("s"))
    ) {
      return durationStr;
    }

    // Try to parse as minutes and convert
    const minutes = parseFloat(durationStr);
    if (!isNaN(minutes)) {
      if (minutes < 60) {
        return `${minutes.toFixed(0)}m`;
      } else {
        const hours = (minutes / 60).toFixed(1);
        return `${hours}h`;
      }
    }

    return durationStr || "N/A";
  }

  // Debounce function
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  // Throttle function
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Capitalize first letter
  static capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  // Get percentage change
  static getPercentageChange(current: number, previous: number): string {
    if (previous === 0) return current === 0 ? "0.00%" : "∞%";
    const change = ((current - previous) / previous) * 100;
    const sign = change >= 0 ? "+" : "";
    return `${sign}${change.toFixed(2)}%`;
  }

  // Deep clone object
  static deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== "object") return obj;
    if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
    if (obj instanceof Array)
      return obj.map((item) => this.deepClone(item)) as unknown as T;
    if (typeof obj === "object") {
      const clonedObj = {} as T;
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = this.deepClone(obj[key]);
        }
      }
      return clonedObj;
    }
    return obj;
  }

  // Generate random ID
  static generateId(length: number = 8): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Check if object is empty
  static isEmpty(obj: any): boolean {
    if (obj == null) return true;
    if (Array.isArray(obj) || typeof obj === "string") return obj.length === 0;
    if (typeof obj === "object") return Object.keys(obj).length === 0;
    return false;
  }

  /**
   * Lọc danh sách bot theo loại: phaisinh, coin, bot (dựa trên prefix tên bot, không phân biệt hoa thường, bỏ khoảng trắng)
   * @param {Array} bots - Danh sách bot (có trường name hoặc botName)
   * @param {string} type - Loại bot: 'phaisinh', 'coin', 'bot', ''
   * @returns {Array} Danh sách bot đã lọc
   */
  static filterBotsByType(bots: any[], type: string): any[] {
    if (!type) return bots;
    return bots.filter((bot) => {
      const rawName = bot.name || bot.botName || "";
      const name = rawName.replace(/\s/g, "").toUpperCase();
      if (type === "phaisinh") return name.startsWith("PHAISINHVN");
      if (type === "coin") return name.startsWith("COIN");
      if (type === "bot")
        return (
          name.startsWith("BOT") &&
          !name.startsWith("COIN") &&
          !name.startsWith("PHAISINHVN")
        );
      return true;
    });
  }
}
