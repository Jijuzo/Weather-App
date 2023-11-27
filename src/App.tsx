import { DetailsPanel } from "./weatherDetails/DetailsPanel";
import { CurrentWeatherPanel } from "./currentWeather/CurrentWeatherPanel";
import { CurrentWeather, ForecastWeather } from "./types";
import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import { DotSpinner } from "@uiball/loaders";

const baseUrl = "http://api.openweathermap.org";
const apiKey = "52cd117b0f18fb74a6f94c5c52c15753";

type GcsValues = {
  lat: string;
  lon: string;
};

type OnError = (error: Error | null) => void;

const initialGcsValues: GcsValues = {
  lat: "50.45",
  lon: "30.52",
};

async function fetchCurrentWeather(
  gcsValues: GcsValues,
  units: string,
  onError: OnError
) {
  const currentWeatherUrl = new URL("/data/2.5/weather", baseUrl);
  setSearchParams(currentWeatherUrl, gcsValues.lat, gcsValues.lon, units);
  try {
    onError(null);
    const promise = await fetch(currentWeatherUrl);
    if (!promise.ok) {
      throw new Error(`HTTP error! Status: ${promise.status}`);
    }
    return (await promise.json()) as CurrentWeather;
  } catch (error) {
    console.error("Error:", error);
    onError(error as Error);
  }
}

async function fetchForecastWeather(
  gcsValues: GcsValues,
  units: string,
  onError: OnError
) {
  const forecastWeatherUrl = new URL("/data/2.5/forecast", baseUrl);
  setSearchParams(forecastWeatherUrl, gcsValues.lat, gcsValues.lon, units);
  try {
    onError(null);
    const promise = await fetch(forecastWeatherUrl);
    if (!promise.ok) {
      throw new Error(`HTTP error! Status: ${promise.status}`);
    }
    return (await promise.json()) as ForecastWeather;
  } catch (error) {
    console.error("Error:", error);
    onError(error as Error);
  }
}

const setSearchParams = (
  givenUrl: URL,
  lat: string,
  lon: string,
  units: string
) => {
  const searchParams = givenUrl.searchParams;
  searchParams.append("lat", lat);
  searchParams.append("lon", lon);
  searchParams.append("units", units);
  searchParams.append("appid", apiKey);
};

const App = () => {
  const [units, setUnits] = useState("metric");
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(
    null
  );
  const [forecastWeather, setForecastWeather] =
    useState<ForecastWeather | null>(null);
  const [gcsValues, setGcsValues] = useState(initialGcsValues);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [error, setError] = useState<Error | null>(null);

  async function fetchLocation(location: string) {
    const locationUrl = new URL("/geo/1.0/direct", baseUrl);
    const searchParams = locationUrl.searchParams;
    searchParams.append("q", location);
    searchParams.append("limit", "1");
    searchParams.append("appid", apiKey);
    try {
      const promise = await fetch(locationUrl);
      if (!promise.ok) {
        throw new Error(`HTTP error! Status: ${promise.status}`);
      }
      const [result] = await promise.json();
      const { lat, lon } = result;
      setGcsValues({ lat: lat, lon: lon });

      searchHistory.splice(0, 0, location.toLowerCase());
      const updatedSearchHistory = [...new Set(searchHistory)];
      setSearchHistory(updatedSearchHistory);
      localStorage.setItem(
        "searchHistory",
        JSON.stringify(updatedSearchHistory)
      );
    } catch (error) {
      alert("Couldn't find a city with this name");
    }
  }

  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("searchHistory") as string
    );
    if (storedHistory) {
      setSearchHistory(storedHistory);
    }
  }, []);

  useEffect(() => {
    const fetchRequiredData = async () => {
      setIsLoading(true);
      try {
        const [weather, forecast] = await Promise.all([
          fetchCurrentWeather(gcsValues, units, setError),
          fetchForecastWeather(gcsValues, units, setError),
        ]);
        if (weather) setCurrentWeather(weather);
        if (forecast) setForecastWeather(forecast);
      } catch (error) {
        console.error("Error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequiredData();
  }, [gcsValues, units]);

  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        setGcsValues({
          lat: latitude.toString(),
          lon: longitude.toString(),
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
            searchHistory={searchHistory}
            onSearch={(value) => {
              fetchLocation(value);
            }}
            onMyLocation={getLocation}
            currentWeather={currentWeather}
            forecastWeather={forecastWeather}
            units={units}
          />

          <DetailsPanel
            fetchError={error}
            onSetUnits={(unit) => {
              setUnits(unit);
            }}
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
const root = createRoot(container as Element);
root.render(<App />);
