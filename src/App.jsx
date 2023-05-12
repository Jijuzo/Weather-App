import { DetailsPanel } from "./forecast&highlights/DetailsPanel";
import { CurrentWeatherPanel } from "./search&currentWeather/CurrentWeatherPanel";
import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";

const App = () => {
  const [isActive, setIsActive] = useState(false);
  const [location, setLocation] = useState("");
  const [units, setUnits] = useState("metric");
  const [lat, setLat] = useState("50.45");
  const [lon, setLon] = useState("30.52");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  async function FetchLocation() {
    const apiRes = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=f50b5a26f6680e02171d4a22c9dfcb53`
    );
    const response = await apiRes.json();
    setLat(response[0].lat);
    setLon(response[0].lon);
  }

  async function FetchCurrentWeather() {
    const apiRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=f50b5a26f6680e02171d4a22c9dfcb53`
    );
    setCurrentWeather(await apiRes.json());
  }

  async function FetchForecastWeather() {
    const apiRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=f50b5a26f6680e02171d4a22c9dfcb53`
    );
    setForecastWeather(await apiRes.json());
  }

  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLat(latitude);
        setLon(longitude);
      },
      (error) => console.log(error.message)
    );
  }

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    FetchCurrentWeather();
    FetchForecastWeather();
  }, [units, lat, lon]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="page">
      <CurrentWeatherPanel
        isActive={isActive}
        setLocation={setLocation}
        setIsActive={setIsActive}
        location={location}
        FetchLocation={FetchLocation}
        getLocation={getLocation}
        currentWeather={currentWeather}
        units={units}
      />

      <DetailsPanel
        setUnits={setUnits}
        forecastWeather={forecastWeather}
        units={units}
        currentWeather={currentWeather}
      />
    </main>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
