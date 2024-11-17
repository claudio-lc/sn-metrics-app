import {
  Chart,
  ChartData,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  CategoryScale,
  TimeScale,
  Legend,
  Tooltip,
  ChartOptions,
  ChartDataset,
  BarController,
  BarElement,
} from "chart.js";
import "chartjs-adapter-date-fns";
import {
  AddableMetric,
  Metric,
  MetricType,
  SnowQuality,
} from "common/interfaces";
import { Bar, Line } from "react-chartjs-2";
import "../styles/MetricsContainer.css";
import { NewMetricAdder } from "./NewMetricAdder";
import { useEffect, useState } from "react";

interface MetricsContainerProps {
  metrics: Metric[];
}

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

const graphOptions = {
  borderColor: "rgba(75,192,192,1)",
  backgroundColor: "rgba(75,192,192,0.2)",
  fill: true,
  borderWidth: 5,
  hoverBorderWidth: 7,
  tension: 0.1,
};

const options: ChartOptions<"line" | "bar"> = {
  responsive: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Date",
      },
    },
    y: {
      title: {
        display: true,
        text: "Value",
      },
    },
  },
};

export function MetricsContainer(props: MetricsContainerProps) {
  const [metrics, setMetrics] = useState<Metric[]>();

  useEffect(() => {
    setMetrics(props.metrics);
  }, [props.metrics]);

  return (
    <>
      {metrics && (
        <>
          <span className="metrics-container">
            {Object.keys(MetricType).map((type) => {
              if (type !== "snowQuality") {
                return (
                  <Line
                    data={
                      transformLineMetricsData(
                        metrics,
                        MetricType[type as keyof typeof MetricType]
                      ) as ChartData<"line">
                    }
                    options={options}
                    height={400}
                    width={600}
                    id={`metrics-chart-${type}`}
                    className="metrics-chart"
                  />
                );
              } else {
                return (
                  <Bar
                    data={
                      transformBarMetricsData(
                        metrics,
                        MetricType.snowQuality
                      ) as unknown as ChartData<"bar">
                    }
                    options={{
                      ...options,
                      scales: { x: { type: "category" } },
                    }}
                    height={400}
                    width={600}
                    id={`metrics-chart-${type}`}
                    className="metrics-chart"
                  />
                );
              }
            })}
          </span>
          <span>
            <NewMetricAdder
              onSubmit={(newMetric) => {
                if (newMetric) {
                  handleSubmit(newMetric);
                }
              }}
            />
          </span>
        </>
      )}
    </>
  );

  function handleSubmit(newMetric: AddableMetric) {
    setMetrics((prevMetrics) => {
      if (prevMetrics) {
        return [...prevMetrics, { ...newMetric, id: "234234" }];
      }
    });
  }
}

function transformLineMetricsData(metrics: Metric[], metricType: MetricType) {
  const dataset = getDataset(metrics, metricType);

  return {
    labels: metrics.map((metric) => metric.date.toDateString()),
    datasets: [{ ...dataset, ...graphOptions }] as ChartDataset<"bar">[],
  };
}

function transformBarMetricsData(metrics: Metric[], metricType: MetricType) {
  const data = Object.keys(SnowQuality).map(
    (quality) =>
      metrics.filter((metric) => metric.snowQuality === quality).length
  );

  return {
    labels: Object.values(SnowQuality),
    datasets: [{ data, ...graphOptions }],
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
