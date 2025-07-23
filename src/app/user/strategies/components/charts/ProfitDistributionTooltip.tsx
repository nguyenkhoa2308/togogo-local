// components/charts/ProfitDistributionTooltip.tsx
import React from "react";
import { Trade } from "../../types";

interface ProfitDistributionTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  trades?: Trade[];
}

export const ProfitDistributionTooltip: React.FC<
  ProfitDistributionTooltipProps
> = ({ active, payload, label, trades }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white p-3 rounded-lg shadow-lg border border-gray-700">
        <p className="text-sm font-medium mb-1">{label}</p>
        <p className="text-sm font-bold">
          {`Số giao dịch: ${payload[0].value}`}
        </p>
        {trades && trades.length > 0 && (
          <p className="text-xs mt-1">
            {`${
              payload[0].value > 0
                ? ((payload[0].value / trades.length) * 100).toFixed(1)
                : 0
            }% tổng số`}
          </p>
        )}
      </div>
    );
  }
  return null;
};
