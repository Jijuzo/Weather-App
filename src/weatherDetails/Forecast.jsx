import { ForecastImage } from "./ForecastImage";
import "./Forecast.css";
import { TemperatureUnit } from "./TemperatureUnit";

export const Forecast = ({
  date,
  icon,
  tempMax,
  tempMin,
  description,
  units,
}) => {
  return (
    <div className="forecast">
      <p className="forecast-date">{date}</p>
      <ForecastImage icon={icon} description={description} />
      <div className="forecast-temp-container">
        <p className="forecast-max-temp">
          {tempMax}
          <TemperatureUnit units={units} />
        </p>
        <p className="forecast-min-temp">
          {tempMin}
          <TemperatureUnit units={units} />
        </p>
      </div>
    </div>
  );
};
