import { Highlight } from "./Highlight";
import "./CurrentWeatherHighlights.css";

export const CurrentWeatherHighlights = ({ currentWeather, units }) => {
  const props = [
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
      value: currentWeather.visibility.toFixed(2) / 1000,
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
      {props.map((item, idx) => (
        <Highlight
          idx={idx}
          units={units}
          currentWeather={currentWeather}
          item={item}
          key={idx}
        />
      ))}
    </div>
  );
};
