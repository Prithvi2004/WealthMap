import { ChartOptions, ChartData } from "chart.js";

export const miniLineChartOptions: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  elements: {
    line: {
      tension: 0.4,
    },
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
};

export const getNetWorthChartData = (values: number[]) => {
  return {
    labels: values.map((_, i) => i),
    datasets: [
      {
        label: "Net Worth",
        data: values,
        borderColor: "#00E6FF",
        backgroundColor: "rgba(0,230,255,0.2)",
        borderWidth: 2,
      },
    ],
  };
};
