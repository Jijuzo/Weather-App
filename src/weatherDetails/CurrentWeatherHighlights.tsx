import { Highlight } from "./Highlight";
import "./CurrentWeatherHighlights.css";
import { CurrentWeather } from "../types";

type CurrentWeatherHighlightsProps = {
  currentWeather: CurrentWeather;
  units: string;
};

export const CurrentWeatherHighlights = ({
  currentWeather,
  units,
}: CurrentWeatherHighlightsProps) => {
  const highlights = [
    {
      name: "Wind status",
      value: currentWeather.wind.speed.toFixed(1),
      unit: {
        metric: "m/s",
        imperial: "mph",
      },
    },
    {
      name: "Humidity",
      value: currentWeather.main.humidity,
      unit: {
        metric: "%",
        imperial: "%",
      },
    },
    {
      name: "Visibility",
      value: Number(currentWeather.visibility.toFixed(2)) / 1000,
      unit: {
        metric: "km",
        imperial: "miles",
      },
    },
    {
      name: "Air Pressure",
      value: currentWeather.main.pressure,
      unit: {
        metric: "mb",
        imperial: "mb",
      },
    },
  ];

  return (
    <div className="hightlights-container">
      {highlights.map((highlight, idx) => (
        <Highlight
          idx={idx}
          units={units}
          currentWeather={currentWeather}
          highlight={highlight}
          key={idx}
        />
      ))}
    </div>
  );
};
