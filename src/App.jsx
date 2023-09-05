import { DetailsPanel } from "./weatherDetails/DetailsPanel";
import { CurrentWeatherPanel } from "./currentWeather/CurrentWeatherPanel";
import { createRoot } from "react-dom/client";
import { useEffect, useState, useCallback } from "react";
import { DotSpinner } from "@uiball/loaders";
import { setSearchHistoryFunc } from "./utils/setSearchHistory";

const App = () => {
  const baseUrl = "http://api.openweathermap.org";
  const [isActive, onSetIsActive] = useState(false);
  const [location, onSetLocation] = useState("");
  const [units, onSetUnits] = useState("metric");
  const [isUnitActive, setIsUnitActive] = useState("button-C");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const initialGcsValues = {
    lat: "50.45",
    lon: "30.52",
  };
  const [gcsValues, setGcsValues] = useState(initialGcsValues);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (storedHistory) {
      setSearchHistory(storedHistory);
    }
  }, []);

  async function fetchLocation() {
    const locationUrl = new URL(
      `/geo/1.0/direct?q=${location}&limit=1&appid=8f8fc4b4047f83a4ee00b8214d7106b1`,
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
      setSearchHistoryFunc(searchHistory, setSearchHistory, location);
    } catch (error) {
      alert("Couldn't find a city with this name");
    }
  }

  async function fetchCurrentWeather() {
    setIsLoading(true);
    const currentWeatherUrl = new URL(
      `/data/2.5/weather?lat=${gcsValues.lat}&lon=${gcsValues.lon}&units=${units}&appid=8f8fc4b4047f83a4ee00b8214d7106b1`,
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
      `/data/2.5/forecast?lat=${gcsValues.lat}&lon=${gcsValues.lon}&units=${units}&appid=8f8fc4b4047f83a4ee00b8214d7106b1`,
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
            searchHistory={searchHistory}
            setSearchHistory={setSearchHistory}
            onSetLocation={onSetLocation}
            onSetIsActive={onSetIsActive}
            location={location}
            FetchLocation={fetchLocation}
            getLocation={getLocation}
            currentWeather={currentWeather}
            units={units}
          />

          <DetailsPanel
            setIsUnitActive={setIsUnitActive}
            isUnitActive={isUnitActive}
            onSetUnits={onSetUnits}
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
