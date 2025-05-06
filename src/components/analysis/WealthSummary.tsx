import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { WealthSource } from "../../types";

interface WealthSummaryProps {
  wealthSources: WealthSource[];
  history?: number[];
}

const WealthSummary: React.FC<WealthSummaryProps> = ({ wealthSources }) => {
  const { theme } = useTheme();

  // Sort wealth sources by percentage (highest first)
  const sortedSources = [...wealthSources].sort(
    (a, b) => b.percentage - a.percentage
  );

  // Get colors for each wealth source type
  const getColorForSourceType = (type: string): string => {
    switch (type) {
      case "real_estate":
        return "#00E6FF"; // Cyan
      case "stocks":
        return "#5643CC"; // Indigo
      case "private_equity":
        return "#9C6ADE"; // Purple
      case "cash":
        return "#FFD700"; // Gold
      case "business":
        return "#32CD32"; // Lime Green
      default:
        return "#7C91F9"; // Soft Blue
    }
  };

  return (
    <div className="space-y-2">
      {/* Visual Wealth Distribution Bar */}
      <div
        className={`
          h-3 w-full rounded-full overflow-hidden flex
          ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}
        `}
      >
        {sortedSources.map((source, index) => (
          <div
            key={index}
            className="h-full"
            style={{
              width: `${source.percentage}%`,
              backgroundColor: getColorForSourceType(source.type),
            }}
            title={`${source.type}: ${source.percentage}%`}
          />
        ))}
      </div>

      {/* Legend with Icons and Labels */}
      <div className="flex flex-wrap gap-3 mt-2">
        {sortedSources.map((source, index) => (
          <div key={index} className="flex items-center space-x-1.5">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getColorForSourceType(source.type) }}
              aria-label={source.type}
            />
            <span
              className={`
                text-xs capitalize
                ${theme === "dark" ? "text-gray-300" : "text-gray-700"}
              `}
            >
              {source.type.replace("_", " ")} ({source.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WealthSummary;
