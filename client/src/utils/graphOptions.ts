import { ChartOptions } from "chart.js";

export const graphOptions = {
  borderColor: "#e1127a",
  backgroundColor: "#2e2f57",
  fill: true,
  borderWidth: 5,
  hoverBorderWidth: 7,
  tension: 0.1,
};

export function getChartOptions(settings: {
  title: string;
  xAxisLabel: string;
  yAxisLabel: string;
}): ChartOptions<"line" | "bar"> {
  return {
    responsive: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: settings.title,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: settings.xAxisLabel,
        },
      },
      y: {
        title: {
          display: true,
          text: settings.yAxisLabel,
        },
      },
    },
  };
}
