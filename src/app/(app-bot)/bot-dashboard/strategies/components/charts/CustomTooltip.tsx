// components/charts/CustomTooltip.tsx
import React from "react";
import { Helpers } from "../../utils/helpers";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white p-3 rounded-lg shadow-lg border border-gray-700">
        <p className="text-sm font-medium mb-1">
          {new Date(label).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </p>
        <p className="text-sm font-bold text-blue-300">
          {`Hiệu suất: ${
            typeof payload[0]?.value === "number"
              ? payload[0].value.toFixed(2)
              : payload[0]?.value || "N/A"
          }%`}
        </p>
        {payload[1] && (
          <p className="text-xs mt-1">
            {`Thay đổi: ${
              typeof payload[1]?.value === "number"
                ? payload[1].value.toFixed(2)
                : payload[1]?.value || "N/A"
            }%`}
          </p>
        )}
      </div>
    );
  }
  return null;
};
