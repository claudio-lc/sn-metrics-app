import { AddableMetric, SnowQuality } from "common/interfaces";
import { useState } from "react";
import { validateValue } from "../utils/validation";
import { parseDate } from "../utils/parsers";
import "../styles/NewMetricAdder.css";

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
    <div className="form-container">
      <h2>Add new metric</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          <h4>Date</h4>
          <input
            type="date"
            value={
              newMetric?.date
                ? parseDate(newMetric.date)
                : parseDate(new Date())
            }
            onChange={(e) => handleChange("date", new Date(e.target.value))}
          />
        </label>
        <label>
          <h4>Snow quality</h4>
          <select
            value={newMetric?.snowQuality}
            onChange={(e) =>
              handleChange("snowQuality", e.target.value as SnowQuality)
            }
          >
            {renderSnowQualityOptions()}
          </select>
        </label>
        <label>
          <h4>Occupation (%)</h4>
          <input
            type="number"
            value={newMetric?.occupation}
            onChange={(e) => handleChange("occupation", Number(e.target.value))}
          />
        </label>
        <label>
          <h4>Wind speed (km/h)</h4>
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
    const validatedValue = validateValue(key, value);

    setNewMetric((prevMetric: AddableMetric) => {
      return {
        ...prevMetric,
        [key]: validatedValue,
      };
    });
  }

  function renderSnowQualityOptions() {
    return (
      <>
        {Object.keys(SnowQuality).map((quality) => (
          <option key={quality} value={quality}>
            {SnowQuality[quality as keyof typeof SnowQuality]}
          </option>
        ))}
      </>
    );
  }
}
