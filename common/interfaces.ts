export enum SnowQuality {
  powder = "Powder",
  crust = "Crust",
  slush = "Slush",
  ice = "Ice",
}

export interface Metric {
  id: string;
  snowQuality: SnowQuality;
  occupation: number;
  windSpeed: number;
  date: Date;
}

export enum MetricType {
  occupation = "Occupation",
  windSpeed = "Wind speed",
  snowQuality = "Snow quality",
}
