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
      <img
        className="forecast-image"
        src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
        alt={description}
      />
      <div className="forecast-temp-container">
        <p className="forecast-max-temp">
          {temp_max}
          {units === "metric" ? "°C" : "°F"}
        </p>
        <p className="forecast-min-temp">
          {temp_min}
          {units === "metric" ? "°C" : "°F"}
        </p>
      </div>
    </div>
  );
};
