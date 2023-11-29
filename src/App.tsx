import { DetailsPanel } from "./weatherDetails/DetailsPanel";
import { CurrentWeatherPanel } from "./currentWeather/CurrentWeatherPanel";
import { CurrentWeather, ForecastWeather } from "./types";
import { createRoot } from "react-dom/client";
import { useEffect, useReducer, useState } from "react";
import { DotSpinner } from "@uiball/loaders";

const baseUrl = "http://api.openweathermap.org";
const apiKey = "52cd117b0f18fb74a6f94c5c52c15753";

type GcsValues = {
  lat: string;
  lon: string;
};

const initialGcsValues: GcsValues = {
  lat: "50.45",
  lon: "30.52",
};

type onError = (error: Error) => void;

async function fetchCurrentWeather(
  gcsValues: GcsValues,
  units: string,
  onError: onError
) {
  const currentWeatherUrl = new URL("/data/2.5/weather", baseUrl);
  setSearchParams(currentWeatherUrl, gcsValues.lat, gcsValues.lon, units);
  try {
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
  onError: onError
) {
  const forecastWeatherUrl = new URL("/data/2.5/forecast", baseUrl);
  setSearchParams(forecastWeatherUrl, gcsValues.lat, gcsValues.lon, units);
  try {
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

type weatherDataAction =
  | {
      type: "success";
      payload: {
        currentWeather: CurrentWeather;
        forecastWeather: ForecastWeather;
      };
    }
  | { type: "error"; payload: { error: Error } }
  | { type: "loading" }
  | { type: "idle" };

type weatherDataState = {
  currentWeather: CurrentWeather | null;
  forecastWeather: ForecastWeather | null;
  error: Error | null;
  isLoading: boolean;
};

const weatherReducer = (state: weatherDataState, action: weatherDataAction) => {
  switch (action.type) {
    case "success":
      return {
        currentWeather: action.payload.currentWeather,
        forecastWeather: action.payload.forecastWeather,
        error: null,
        isLoading: false,
      };
    case "loading":
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case "error":
      return {
        currentWeather: null,
        forecastWeather: null,
        error: action.payload.error,
        isLoading: false,
      };
    case "idle":
      return {
        ...state,
        isLoading: false,
      };
  }
};

const App = () => {
  const [units, setUnits] = useState("metric");
  const [gcsValues, setGcsValues] = useState(initialGcsValues);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [weatherState, dispatch] = useReducer(weatherReducer, {
    currentWeather: null,
    forecastWeather: null,
    error: null,
    isLoading: false,
  });

  const onError = (error: Error) => {
    dispatch({ type: "error", payload: { error } });
  };

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
      dispatch({ type: "loading" });
      try {
        const [weather, forecast] = await Promise.all([
          fetchCurrentWeather(gcsValues, units, onError),
          fetchForecastWeather(gcsValues, units, onError),
        ]);
        if (weather && forecast)
          dispatch({
            type: "success",
            payload: { currentWeather: weather, forecastWeather: forecast },
          });
      } catch (error) {
        console.error("Error", error);
      } finally {
        dispatch({ type: "idle" });
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
      {weatherState.isLoading ? (
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
            currentWeather={weatherState.currentWeather}
            forecastWeather={weatherState.forecastWeather}
            units={units}
          />

          <DetailsPanel
            fetchError={weatherState.error as Error}
            onSetUnits={(unit) => {
              setUnits(unit);
            }}
            forecastWeather={weatherState.forecastWeather}
            units={units}
            currentWeather={weatherState.currentWeather}
          />
        </div>
      )}
    </main>
  );
};

const container = document.getElementById("root");
const root = createRoot(container as Element);
root.render(<App />);
