import { Metric } from "common/interfaces";
export const API_URL = "http://localhost:8080";

interface RawMetric {
  id: string;
  snow_quality: string;
  occupation: number;
  wind_speed: number;
  created_at: string;
}
export async function getAllMetrics() {
  const result = await (await fetch(`${API_URL}/api/getAllMetrics`)).json();

  const parsedResult: Metric[] = result.map((entry: RawMetric) => ({
    id: entry.id,
    snowQuality: entry.snow_quality,
    occupation: entry.occupation,
    windSpeed: entry.wind_speed,
    date: new Date(entry.created_at),
  }));

  return parsedResult;
}
