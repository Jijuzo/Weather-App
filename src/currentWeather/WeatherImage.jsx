import "./WeatherImage.css";

export const WeatherImage = ({ currentWeather }) => {
  const baseUrl = "http://openweathermap.org";
  let imageUrl = new URL(
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
