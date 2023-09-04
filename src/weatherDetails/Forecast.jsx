import { ForecastImage } from "./ForecastImage";
import "./Forecast.css";
import { TemperatureUnit } from "./TemperatureUnit";

export const Forecast = ({
  date,
  icon,
  temp_max,
  temp_min,
  description,
  units,
}) => {
  return (
    <div className="forecast">
      <p className="forecast-date">{date}</p>
      <ForecastImage icon={icon} description={description} />
      <div className="forecast-temp-container">
        <p className="forecast-max-temp">
          {temp_max}
          <TemperatureUnit units={units} />
        </p>
        <p className="forecast-min-temp">
          {temp_min}
          <TemperatureUnit units={units} />
        </p>
      </div>
    </div>
  );
};
