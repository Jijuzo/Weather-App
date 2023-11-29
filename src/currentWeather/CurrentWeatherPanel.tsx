import { useState } from "react";
import { SearchPanel } from "./SearchPanel";
import { CurrentWeatherAside } from "./CurrentWeatherAside";
import "./CurrentWeatherPanel.css";
import { CurrentWeather, ForecastWeather, Units } from "../types";

type CurrentWeatherPanelProps = {
  searchHistory: string[];
  onSearch: (location: string) => void;
  onMyLocation: () => void;
  currentWeather: CurrentWeather | null;
  forecastWeather: ForecastWeather | null;
  units: Units;
};
export const CurrentWeatherPanel = ({
  searchHistory,
  onSearch,
  onMyLocation,
  currentWeather,
  forecastWeather,
  units,
}: CurrentWeatherPanelProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <aside className="searchbar">
      <SearchPanel
        isActive={isActive}
        onSetIsActive={(value) => setIsActive(value)}
        onSubmit={(value) => {
          onSearch(value);
          setIsActive(false);
        }}
        searchHistory={searchHistory}
      />

      <div className={isActive === true ? "hidden" : ""}>
        <div className="location-search-div">
          <button className="search-button" onClick={() => setIsActive(true)}>
            Search for places
          </button>
          <button className="top-button" onClick={onMyLocation}>
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
