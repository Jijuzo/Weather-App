import { DetailsPanel } from "./weatherDetails/DetailsPanel";
import { CurrentWeatherPanel } from "./currentWeather/CurrentWeatherPanel";
import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import { DotSpinner } from "@uiball/loaders";

const baseUrl = "http://api.openweathermap.org";
const apiKey = "52cd117b0f18fb74a6f94c5c52c15753";

type GcsValues = {
  lat: string;
  lon: string;
};

export type CurrentWeather = {
  main: { temp: number; humidity: number; pressure: number };
  weather: [{ description: string; icon: string }];
  dt: number;
  name: string;
  sys: { country: string };
  wind: { speed: number; deg: number };
  visibility: number;
};

export type ForecastWeather = {
  list: [
    {
      dt: number;
      weather: [{ icon: string; main: string }];
      main: { temp_max: number; temp_min: number };
    }
  ];
};

const initialGcsValues: GcsValues = {
  lat: "50.45",
  lon: "30.52",
};

async function fetchCurrentWeather<T extends Record<string, unknown>>(
  gcsValues: GcsValues,
  units: string,
  onError: (value: Error | null) => void
) {
  onError(null);
  const currentWeatherUrl = new URL("/data/2.5/weather", baseUrl);
  setSearchParams(currentWeatherUrl, gcsValues.lat, gcsValues.lon, units);
  try {
    const promise = await fetch(currentWeatherUrl);
    if (!promise.ok) {
      throw new Error(`HTTP error! Status: ${promise.status}`);
    }
    return (await promise.json()) as T;
  } catch (error) {
    console.error("Error:", error);
    onError(error as Error);
  }
}

async function fetchForecastWeather<T extends Record<string, unknown>>(
  gcsValues: GcsValues,
  units: string,
  onError: (error: Error | null) => void
) {
  onError(null);
  const forecastWeatherUrl = new URL("/data/2.5/forecast", baseUrl);
  setSearchParams(forecastWeatherUrl, gcsValues.lat, gcsValues.lon, units);
  try {
    const promise = await fetch(forecastWeatherUrl);
    if (!promise.ok) {
      throw new Error(`HTTP error! Status: ${promise.status}`);
    }
    return (await promise.json()) as T;
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
  const [units, onSetUnits] = useState("metric");
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(
    null
  );
  const [forecastWeather, setForecastWeather] =
    useState<ForecastWeather | null>(null);
  const [gcsValues, setGcsValues] = useState(initialGcsValues);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [fetchError, setFetchError] = useState<Error | null>(null);

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
          fetchCurrentWeather<CurrentWeather>(gcsValues, units, setFetchError),
          fetchForecastWeather<ForecastWeather>(
            gcsValues,
            units,
            setFetchError
          ),
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
            fetchLocation={fetchLocation}
            getLocation={getLocation}
            currentWeather={currentWeather}
            forecastWeather={forecastWeather}
            units={units}
          />

          <DetailsPanel
            fetchError={fetchError}
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
const root = createRoot(container as Element);
root.render(<App />);
