import { CurrentWeather } from "../types";
import "./WeatherImage.css";

const baseUrl = "https://openweathermap.org";

export const WeatherImage = ({
  currentWeather,
}: {
  currentWeather: CurrentWeather;
}) => {
  const imageUrl = new URL(
    `/img/wn/${currentWeather.weather[0].icon}@4x.png`,
    baseUrl
  );
  return (
    <div className="weather-image-container">
      <img
        className="weather-image"
        src={imageUrl.toString()}
        alt={`${currentWeather.weather[0].description}`}
      />
    </div>
  );
};
