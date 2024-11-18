import {
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  CategoryScale,
  TimeScale,
  Legend,
  Tooltip,
  ChartDataset,
  BarController,
  BarElement,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Bar, Line } from "react-chartjs-2";
import { Metric, MetricType, SnowQuality } from "common/interfaces";
import { getChartOptions, graphOptions } from "../utils/graphOptions";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  TimeScale,
  Legend,
  Tooltip,
  BarController,
  BarElement
);

interface MetricsVisualiserProps {
  metrics: Metric[];
}

export function MetricsVisualiser(props: MetricsVisualiserProps) {
  return (
    <>
      {Object.keys(MetricType).map((type) => {
        const metricType = MetricType[type as keyof typeof MetricType];
        if (
          [MetricType.occupation, MetricType.windSpeed].includes(metricType)
        ) {
          return (
            <Line
              data={transformLineMetricsData(props.metrics, metricType)}
              options={getChartOptions({
                title: metricType,
                xAxisLabel: "Date",
                yAxisLabel:
                  metricType === MetricType.occupation
                    ? "Occupation (%)"
                    : "Wind speed (km/h)",
              })}
              height={400}
              width={600}
              id={`metrics-chart-${type}`}
              className="metrics-chart"
            />
          );
        } else if (metricType === MetricType.snowQuality) {
          return (
            <Bar
              data={transformBarMetricsData(props.metrics)}
              options={getChartOptions({
                title: MetricType.snowQuality,
                xAxisLabel: MetricType.snowQuality,
                yAxisLabel: "Times reported",
              })}
              height={400}
              width={600}
              id={`metrics-chart-${type}`}
              className="metrics-chart"
            />
          );
        } else {
          return <>Unknown metric</>;
        }
      })}
    </>
  );
}

function transformLineMetricsData(metrics: Metric[], metricType: MetricType) {
  const dataset = getDataset(metrics, metricType);

  return {
    labels: metrics.map((metric) => metric.date.toDateString()),
    datasets: [{ ...dataset, ...graphOptions }] as ChartDataset<"line">[],
  };
}

function transformBarMetricsData(metrics: Metric[]) {
  const data = Object.keys(SnowQuality).map(
    (quality) =>
      metrics.filter((metric) => metric.snowQuality === quality).length
  );

  return {
    labels: Object.values(SnowQuality),
    datasets: [
      { data, label: "Times reported", ...graphOptions },
    ] as ChartDataset<"bar">[],
  };
}

function getDataset(metrics: Metric[], metricType: MetricType) {
  switch (metricType) {
    case MetricType.occupation:
      return {
        label: MetricType.occupation,
        data: metrics.map((metric) => metric.occupation),
      };
    case MetricType.snowQuality:
      return {
        label: MetricType.snowQuality,
        data: metrics.map((metric) => metric.snowQuality),
      };
    case MetricType.windSpeed:
      return {
        label: MetricType.windSpeed,
        data: metrics.map((metric) => metric.windSpeed),
      };
    default:
      throw Error("Unknown metric type for dataset");
  }
}
