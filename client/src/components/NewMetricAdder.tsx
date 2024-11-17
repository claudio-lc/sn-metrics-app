import { AddableMetric, SnowQuality } from "common/interfaces";
import { useState } from "react";

interface NewMetricAdderProps {
  onSubmit: (newMetric: AddableMetric) => Promise<void>;
}

export function NewMetricAdder(props: NewMetricAdderProps) {
  const [newMetric, setNewMetric] = useState<AddableMetric>({
    date: new Date(),
    snowQuality: SnowQuality.powder,
    occupation: 0,
    windSpeed: 0,
  });

  return (
    <div>
      <h2>Add new metric</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Date:
          <input
            type="date"
            value={
              newMetric?.date
                ? newMetric.date.toISOString().split("T")[0]
                : new Date().toISOString().split("T")[0]
            }
            onChange={(e) => handleChange("date", new Date(e.target.value))}
          />
        </label>
        <label>
          Snow quality:
          <select
            value={newMetric?.snowQuality}
            onChange={(e) =>
              handleChange("snowQuality", e.target.value as SnowQuality)
            }
          >
            {Object.keys(SnowQuality).map((quality) => (
              <option key={quality} value={quality}>
                {SnowQuality[quality as keyof typeof SnowQuality]}
              </option>
            ))}
          </select>
        </label>
        <label>
          Occupation:
          <input
            type="number"
            value={newMetric?.occupation}
            onChange={(e) => handleChange("occupation", Number(e.target.value))}
          />
        </label>
        <label>
          Wind speed:
          <input
            type="number"
            value={newMetric?.windSpeed}
            onChange={(e) => handleChange("windSpeed", Number(e.target.value))}
          />
        </label>
        <button onClick={() => props.onSubmit(newMetric)}>Add</button>
      </form>
    </div>
  );

  function handleChange<T extends keyof AddableMetric>(
    key: T,
    value: AddableMetric[T]
  ) {
    setNewMetric((prevMetric: AddableMetric) => {
      return {
        ...prevMetric,
        [key]: value,
      };
    });
  }
}
