import { DetailsPanel } from "./weatherDetails/DetailsPanel";
import { CurrentWeatherPanel } from "./currentWeather/CurrentWeatherPanel";
import { createRoot } from "react-dom/client";
import { useEffect, useState, useCallback } from "react";
import { DotSpinner } from "@uiball/loaders";

const App = () => {
  const baseUrl = "http://api.openweathermap.org";
  const [isActive, setIsActive] = useState(false);
  const [location, setLocation] = useState("");
  const [units, setUnits] = useState("metric");
  const [isUnitActive, setIsUnitActive] = useState("button-C");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const initialGcsValues = {
    lat: "50.45",
    lon: "30.52",
  };
  const [gcsValues, setGcsValues] = useState(initialGcsValues);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchLocation() {
    const locationUrl = new URL(
      `/geo/1.0/direct?q=${location}&limit=1&appid=f50b5a26f6680e02171d4a22c9dfcb53`,
      baseUrl
    );
    try {
      const promise = await fetch(locationUrl);
      if (!promise.ok) {
        throw new Error(`HTTP error! Status: ${promise.status}`);
      }
      const result = await promise.json();
      setGcsValues({
        lat: `${result[0].lat}`,
        lon: `${result[0].lon}`,
      });
    } catch (error) {
      alert("Couldn't find a city with this name");
    }
  }

  async function fetchCurrentWeather() {
    setIsLoading(true);
    const currentWeatherUrl = new URL(
      `/data/2.5/weather?lat=${gcsValues.lat}&lon=${gcsValues.lon}&units=${units}&appid=f50b5a26f6680e02171d4a22c9dfcb53`,
      baseUrl
    );
    try {
      const promise = await fetch(currentWeatherUrl);
      if (!promise.ok) {
        throw new Error(`HTTP error! Status: ${promise.status}`);
      }
      setCurrentWeather(await promise.json());
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  }

  async function fetchForecastWeather() {
    const forecastWeatherurl = new URL(
      `/data/2.5/forecast?lat=${gcsValues.lat}&lon=${gcsValues.lon}&units=${units}&appid=f50b5a26f6680e02171d4a22c9dfcb53`,
      baseUrl
    );
    try {
      const promise = await fetch(forecastWeatherurl);
      if (!promise.ok) {
        throw new Error(`HTTP error! Status: ${promise.status}`);
      }
      setForecastWeather(await promise.json());
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  }

  const memoizedFetchCurrentWeather = useCallback(fetchCurrentWeather, [
    units,
    gcsValues,
  ]);
  const memoizedFetchForecastWeather = useCallback(fetchForecastWeather, [
    units,
    gcsValues,
  ]);

  useEffect(() => {
    memoizedFetchCurrentWeather();
    memoizedFetchForecastWeather();
  }, [memoizedFetchCurrentWeather, memoizedFetchForecastWeather]);

  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        setGcsValues({
          lat: `${latitude}`,
          lon: `${longitude}`,
        });
      },
      (error) => {
        if (error.code === 1) {
          alert("To use this function, allow access to your geolocation.");
        } else {
          alert("An error occurred while fetching your location.");
        }
      }
    );
  }

  return (
    <main>
      {isLoading ? (
        <div className="spinner-container">
          <DotSpinner size={50} color="#FFFFFF" />
        </div>
      ) : (
        <div className="page">
          <CurrentWeatherPanel
            isActive={isActive}
            setLocation={setLocation}
            setIsActive={setIsActive}
            location={location}
            FetchLocation={fetchLocation}
            getLocation={getLocation}
            currentWeather={currentWeather}
            units={units}
          />

          <DetailsPanel
            setIsUnitActive={setIsUnitActive}
            isUnitActive={isUnitActive}
            setUnits={setUnits}
            forecastWeather={forecastWeather}
            units={units}
            currentWeather={currentWeather}
          />
        </div>
      )}
    </main>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
