import "./WeatherImage.css";

const baseUrl = "http://openweathermap.org";

export const WeatherImage = ({ currentWeather }) => {
  const imageUrl = new URL(
    `/img/wn/${currentWeather.weather[0].icon}@4x.png`,
    baseUrl
  );
  return (
    <div className="weather-image-container">
      <img
        className="weather-image"
        src={imageUrl}
        alt={`${currentWeather.weather[0].description}`}
      />
    </div>
  );
};
