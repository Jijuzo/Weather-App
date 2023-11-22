import { useState } from "react";
import { SearchPanel } from "./SearchPanel";
import { CurrentWeatherAside } from "./CurrentWeatherAside";
import "./CurrentWeatherPanel.css";
import { CurrentWeather, ForecastWeather } from "../App";

type CurrentWeatherPanelProps = {
  searchHistory: string[];
  fetchLocation: (location: string) => Promise<void>;
  getLocation: () => void;
  currentWeather: CurrentWeather | null;
  forecastWeather: ForecastWeather | null;
  units: string;
};

export const CurrentWeatherPanel = ({
  searchHistory,
  fetchLocation,
  getLocation,
  currentWeather,
  forecastWeather,
  units,
}: CurrentWeatherPanelProps) => {
  const [isActive, onSetIsActive] = useState(false);

  return (
    <aside className="searchbar">
      <SearchPanel
        isActive={isActive}
        onSetIsActive={onSetIsActive}
        onSubmit={fetchLocation}
        searchHistory={searchHistory}
      />

      <div className={isActive === true ? "hidden" : ""}>
        <div className="location-search-div">
          <button className="search-button" onClick={() => onSetIsActive(true)}>
            Search for places
          </button>
          <button className="top-button" onClick={getLocation}>
            <span className="material-symbols-outlined">my_location</span>
          </button>
        </div>
        {currentWeather && forecastWeather && (
          <CurrentWeatherAside currentWeather={currentWeather} units={units} />
        )}
      </div>
    </aside>
  );
};
