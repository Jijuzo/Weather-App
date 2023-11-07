import { WeatherImage } from "./WeatherImage";
import { formatDate } from "../utils/formatDate";
import { TemperatureUnit } from "../weatherDetails/TemperatureUnit";
import "./CurrentWeatherAside.css";

export const CurrentWeatherAside = ({ currentWeather, units }) => {
  return (
    <div>
      <WeatherImage currentWeather={currentWeather} />
      <div className="current-weather-container">
        <p className="current-weather">
          {Math.round(currentWeather.main.temp)}
          <span className="current-weather-unit">
            <TemperatureUnit units={units} />
          </span>
        </p>
        <p className="current-condition">
          {currentWeather.weather[0].description}
        </p>
        <p className="current-date">Today • {formatDate(currentWeather.dt)}</p>
        <p className="current-location">
          <span className="material-symbols-outlined location-icon">
            location_on
          </span>{" "}
          {currentWeather.name}, {currentWeather.sys.country}
        </p>
      </div>
    </div>
  );
};
