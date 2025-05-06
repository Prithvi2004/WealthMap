import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { WealthSource } from "../../types";

interface WealthSummaryProps {
  wealthSources: WealthSource[];
  history?: {
    year: string;
    value: number;
  }[];
}

const WealthSummary: React.FC<WealthSummaryProps> = ({
  wealthSources,
  history,
}) => {
  const { theme } = useTheme();

  // Sort by percentage descending
  const sortedSources = [...wealthSources].sort(
    (a, b) => b.percentage - a.percentage
  );

  // Get color for source type
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
    <div className="space-y-3">
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
            title={`${source.type.replace("_", " ")}: ${source.percentage}%`}
          />
        ))}
      </div>

      {/* Legend with Icons and Labels */}
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {sortedSources.map((source, index) => (
          <div
            key={index}
            className="flex items-center space-x-1.5 min-w-[45%] sm:min-w-0"
          >
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: getColorForSourceType(source.type) }}
              aria-label={source.type}
            />
            <span
              className={`
                text-xs capitalize truncate
                ${theme === "dark" ? "text-gray-300" : "text-gray-700"}
              `}
            >
              {source.type.replace("_", " ")} ({source.percentage}%)
            </span>
          </div>
        ))}
      </div>

      {/* Optional Historical Chart Preview */}
      {history && history.length > 0 && (
        <div className="mt-2 h-16 w-full relative">
          <svg
            className="w-full h-full"
            viewBox={`0 0 ${history.length * 30} 40`}
            preserveAspectRatio="none"
          >
            <polyline
              fill="none"
              stroke={theme === "dark" ? "#7C91F9" : "#5643CC"}
              strokeWidth="2"
              points={history
                .map(
                  (point, i) =>
                    `${i * 30},${
                      40 -
                      (point.value / Math.max(...history.map((h) => h.value))) *
                        40
                    }`
                )
                .join(" ")}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx={(history.length - 1) * 30}
              cy={
                40 -
                (history[history.length - 1].value /
                  Math.max(...history.map((h) => h.value))) *
                  40
              }
              r="2"
              fill={theme === "dark" ? "#00E6FF" : "#007BFF"}
            />
          </svg>
          <p className="text-xs text-center mt-1 text-gray-400">
            Net Worth Growth
          </p>
        </div>
      )}
    </div>
  );
};

export default WealthSummary;
