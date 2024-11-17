import { useEffect, useState } from "react";
import { getAllMetrics } from "./api";
import { MetricsContainer } from "./components/MetricsContainer";
import { Metric } from "common/interfaces";

function App() {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    (async () => {
      const result = await getAllMetrics();
      setMetrics(result);
    })();
  }, []);

  return <MetricsContainer metrics={metrics} />;
}

export default App;
