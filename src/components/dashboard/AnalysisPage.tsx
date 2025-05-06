import React from "react";
import { useAppContext } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";
import { Chart } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

const AnalysisPage: React.FC = () => {
  const { owners } = useAppContext();
  const { theme } = useTheme();

  // Example chart data
  const topOwners = owners
    .filter((o) => o.netWorth?.estimate)
    .sort((a, b) => b.netWorth.estimate - a.netWorth.estimate)
    .slice(0, 5);

  const chartData = {
    labels: topOwners.map((o) => o.name),
    datasets: [
      {
        label: "Net Worth (USD)",
        data: topOwners.map((o) => o.netWorth.estimate / 1e6),
        backgroundColor: "#00E6FF",
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Wealth Comparison</h1>

      {/* Net Worth Chart */}
      <div
        className={`
          p-6 rounded-xl
          ${
            theme === "dark"
              ? "bg-[#171b29]/70 border border-indigo-800"
              : "bg-white border border-gray-100 shadow-sm"
          }
        `}
      >
        <h2 className="text-lg font-semibold mb-4">Top Owners by Net Worth</h2>
        <div className="h-64">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (ctx) => `$${ctx.raw}M`,
                  },
                },
              },
              scales: {
                y: {
                  ticks: {
                    callback: (value) => `$${value}M`,
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Individual Owner Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topOwners.map((owner) => (
          <div
            key={owner.id}
            className={`
              p-4 rounded-xl
              ${theme === "dark" ? "bg-[#0A1128]/50" : "bg-gray-50"}
            `}
          >
            <h3 className="font-medium text-lg">{owner.name}</h3>
            <p className="text-gray-400 capitalize">{owner.type}</p>
            <p className="text-xl font-bold mt-2">
              ${(owner.netWorth.estimate / 1e6).toFixed(1)}M
            </p>
            <div className="mt-4">
              <div className="space-y-2">
                {owner.wealthSources.slice(0, 2).map((source, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs">
                      <span>{source.type.replace("_", " ")}</span>
                      <span>${source.amount.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                      <div
                        className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500"
                        style={{
                          width: `${
                            (source.amount / owner.netWorth.estimate) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisPage;
