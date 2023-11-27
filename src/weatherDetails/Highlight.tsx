import "./Highlight.css";
import { WindDirection } from "./WindDirection";
import { ProgressBar } from "./ProgressBar";
import { CurrentWeather } from "../types";

type ItemType = {
  name: string;
  value: string | number;
  unit: {
    metric: string;
    imperial: string;
  };
};

type HighlightProps = {
  idx: number;
  units: string;
  currentWeather: CurrentWeather;
  highlight: ItemType;
};

export function Highlight({
  idx,
  units,
  currentWeather,
  highlight,
}: HighlightProps) {
  return (
    <div className="highlight" key={idx}>
      <div className="highlight-main">
        <p className="highlight-name">{highlight.name}</p>
        <p className="highlight-value">
          {highlight.value}{" "}
          {units === "metric" ? highlight.unit.metric : highlight.unit.imperial}
        </p>
      </div>
      {idx === 0 ? (
        <WindDirection currentWeather={currentWeather} />
      ) : idx === 1 ? (
        <ProgressBar value={currentWeather.main.humidity} />
      ) : (
        ""
      )}
    </div>
  );
}
