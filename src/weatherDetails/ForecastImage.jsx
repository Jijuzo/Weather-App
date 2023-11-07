import "./ForecastImage.css";

const baseUrl = "https://openweathermap.org";

export const ForecastImage = ({ icon, description }) => {
  const imageUrl = new URL(`/img/wn/${icon}@4x.png`, baseUrl);
  return <img className="forecast-image" src={imageUrl} alt={description} />;
};
