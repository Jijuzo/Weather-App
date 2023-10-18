import { ForecastImage } from "./ForecastImage";
import "./Forecast.css";
import { TemperatureUnit } from "./TemperatureUnit";

type ForecastProps = {
  date: string;
  icon: string;
  tempMax: number;
  tempMin: number;
  description: string;
  units: string;
};

export const Forecast = ({
  date,
  icon,
  tempMax,
  tempMin,
  description,
  units,
}: ForecastProps) => {
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
