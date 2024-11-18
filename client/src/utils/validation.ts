import { AddableMetric } from "common/interfaces";

export function validateValue<T extends keyof AddableMetric>(
  key: T,
  value: AddableMetric[T]
) {
  if (key === "date" && new Date(value) > new Date()) {
    return new Date();
  } else if (["occupation", "windSpeed"].includes(key) && Number(value) < 0) {
    return 0;
  } else if (key === "occupation" && Number(value) > 100) {
    return 100;
  } else if (key === "windSpeed" && Number(value) > 200) {
    return 200;
  } else {
    return value;
  }
}
