import "./ForecastImage.css";

export const ForecastImage = ({ icon, description }) => {
  const baseUrl = "https://openweathermap.org";
  const imageUrl = new URL(`/img/wn/${icon}@4x.png`, baseUrl);
  return <img className="forecast-image" src={imageUrl} alt={description} />;
};
