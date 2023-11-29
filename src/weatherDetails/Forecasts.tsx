import { formatDate } from "../utils/formatDate";
import { Forecast } from "./Forecast";
import "./Forecasts.css";
import { ForecastWeather, Units } from "../types";

// Define the starting index for the forecast data.
const startPoint = 6;
// Define the ending index for the forecast data.
const endPoint = 38;
// Define the step size to iterate through the forecast data.
const step = 8;

export const Forecasts = ({
  forecastWeather,
  units,
}: {
  forecastWeather: ForecastWeather;
  units: Units;
}) => {
  const forecasts = [];
  for (let i = startPoint; i <= endPoint; i += step) {
    forecasts.push({
      date: formatDate(forecastWeather.list[i].dt),
      icon: forecastWeather.list[i].weather[0].icon,
      tempMax: Math.round(forecastWeather.list[i].main.temp_max),
      tempMin: Math.round(forecastWeather.list[i].main.temp_min),
      description: forecastWeather.list[i].weather[0].main,
    });
  }

  return (
    <div className="forecast-container">
      {forecasts.map((item, idx) => {
        return (
          <Forecast
            key={idx}
            date={item.date}
            icon={item.icon}
            tempMax={item.tempMax}
            tempMin={item.tempMin}
            description={item.description}
            units={units}
          />
        );
      })}
    </div>
  );
};
