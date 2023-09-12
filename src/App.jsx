import { DetailsPanel } from "./weatherDetails/DetailsPanel";
import { CurrentWeatherPanel } from "./currentWeather/CurrentWeatherPanel";
import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import { DotSpinner } from "@uiball/loaders";

const baseUrl = "http://api.openweathermap.org";
const apiKey = "52cd117b0f18fb74a6f94c5c52c15753";
const initialGcsValues = {
  lat: "50.45",
  lon: "30.52",
};

async function fetchCurrentWeather(gcsValues, units, setPageError) {
  setPageError(null);
  const currentWeatherUrl = new URL("/data/2.5/weather", baseUrl);
  setSearchParams(currentWeatherUrl, gcsValues.lat, gcsValues.lon, units);
  try {
    const promise = await fetch(currentWeatherUrl);
    if (!promise.ok) {
      throw new Error(`HTTP error! Status: ${promise.status}`);
    }
    return await promise.json();
  } catch (error) {
    console.error("Error:", error);
    setPageError("smthWrong");
  }
}

async function fetchForecastWeather(gcsValues, units, setPageError) {
  setPageError(null);
  const forecastWeatherUrl = new URL("/data/2.5/forecast", baseUrl);
  setSearchParams(forecastWeatherUrl, gcsValues.lat, gcsValues.lon, units);
  try {
    const promise = await fetch(forecastWeatherUrl);
    if (!promise.ok) {
      throw new Error(`HTTP error! Status: ${promise.status}`);
    }
    return await promise.json();
  } catch (error) {
    console.error("Error:", error);
    setPageError("smthWrong");
  }
}

const setSearchParams = (givenUrl, lat, lon, units) => {
  const searchParams = givenUrl.searchParams;
  searchParams.append("lat", lat);
  searchParams.append("lon", lon);
  searchParams.append("units", units);
  searchParams.append("appid", apiKey);
};

const App = () => {
  const [isActive, onSetIsActive] = useState(false);
  const [location, onSetLocation] = useState("");
  const [units, onSetUnits] = useState("metric");
  const [currentUnit, setCurrentUnit] = useState("button-C");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [gcsValues, setGcsValues] = useState(initialGcsValues);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  async function fetchLocation(location) {
    const locationUrl = new URL("/geo/1.0/direct", baseUrl);
    const searchParams = locationUrl.searchParams;
    searchParams.append("q", location);
    searchParams.append("limit", 1);
    searchParams.append("appid", apiKey);
    try {
      const promise = await fetch(locationUrl);
      if (!promise.ok) {
        throw new Error(`HTTP error! Status: ${promise.status}`);
      }
      const [result] = await promise.json();
      const { lat, lon } = result;
      setGcsValues({ lat: lat, lon: lon });

      const locationIndex = searchHistory.indexOf(location);
      if (locationIndex !== -1) {
        searchHistory.splice(locationIndex, 1);
      }
      if (!searchHistory.includes(location)) {
        setSearchHistory((prevLocation) => [location, ...prevLocation]);
        localStorage.setItem(
          "searchHistory",
          JSON.stringify([location, ...searchHistory])
        );
      }
    } catch (error) {
      alert("Couldn't find a city with this name");
    }
  }

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (storedHistory) {
      setSearchHistory(storedHistory);
    }
  }, []);

  useEffect(() => {
    const fetchRequaredData = async () => {
      setIsLoading(true);
      try {
        const [weather, forecast] = await Promise.all([
          fetchCurrentWeather(gcsValues, units, setFetchError),
          fetchForecastWeather(gcsValues, units, setFetchError),
        ]);
        setCurrentWeather(weather);
        setForecastWeather(forecast);
      } catch (error) {
        console.log("mgaga", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequaredData();
  }, [gcsValues, units]);

  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        setGcsValues({
          lat: latitude,
          lon: longitude,
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
            fetchLocation={fetchLocation}
            getLocation={getLocation}
            currentWeather={currentWeather}
            forecastWeather={forecastWeather}
            units={units}
          />

          <DetailsPanel
            fetchError={fetchError}
            setCurrentUnit={setCurrentUnit}
            currentUnit={currentUnit}
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
