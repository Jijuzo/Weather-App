const CurrentWeatherAside = ({ currentWeather, units }) => {
  return (
    <div>
      <div className="weather-image-container">
        <img
          className="weather-image"
          src={` https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`}
          alt={`${currentWeather.weather[0].description}`}
        />
      </div>
      <div className="current-weather-container">
        <p className="current-weather">
          {Math.round(currentWeather.main.temp)}
          <span className="current-weather-unit">
            {units === "metric" ? "°C" : "°F"}
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

export default CurrentWeatherAside;

export function formatDate(data) {
  const date = new Date(data * 1000);
  const options = { weekday: "short", day: "numeric", month: "short" };
  return date.toLocaleString("en-GB", options);
}
