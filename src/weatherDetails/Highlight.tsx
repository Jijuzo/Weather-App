import { WindDirection } from "./WindDirection";
import { ProgressBar } from "./ProgressBar";
import "./Highlight.css";
import { CurrentWeatherType } from "../App";

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
  currentWeather: CurrentWeatherType;
  item: ItemType;
};

export function Highlight({
  idx,
  units,
  currentWeather,
  item,
}: HighlightProps) {
  return (
    <div className="highlight" key={idx}>
      <div className="highlight-main">
        <p className="highlight-name">{item.name}</p>
        <p className="highlight-value">
          {item.value}{" "}
          {units === "metric" ? item.unit.metric : item.unit.imperial}
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
