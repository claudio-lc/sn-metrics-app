import { AddableMetric, Metric } from "common/interfaces";
import "../styles/MetricsContainer.css";
import { NewMetricAdder } from "./NewMetricAdder";
import { useEffect, useState } from "react";
import { addMetric } from "../api";
import { MetricsVisualiser } from "./MetricsVisualiser";

interface MetricsContainerProps {
  metrics: Metric[];
}

export function MetricsContainer(props: MetricsContainerProps) {
  const [metrics, setMetrics] = useState<Metric[]>();

  useEffect(() => {
    setMetrics(props.metrics);
  }, [props.metrics]);

  return (
    <>
      <h1>Sierra Nevada metrics reporter</h1>
      {metrics && (
        <span className="metrics-tool-container">
          <div className="metrics-visualizer-container">
            <MetricsVisualiser metrics={metrics} />
          </div>
          <div className="metrics-adder-container">
            <NewMetricAdder
              onSubmit={async (newMetric) => {
                if (newMetric) {
                  await handleSubmit(newMetric);
                }
              }}
            />
          </div>
        </span>
      )}
    </>
  );

  async function handleSubmit(newMetric: AddableMetric) {
    const result = await addMetric(newMetric);
    setMetrics((prevMetrics) => {
      if (prevMetrics) {
        return [...prevMetrics, { ...newMetric, id: result.id }];
      }
    });
  }
}
