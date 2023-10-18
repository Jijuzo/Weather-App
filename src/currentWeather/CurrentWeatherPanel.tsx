import React from "react";
import { SearchPanel } from "./SearchPanel";
import { CurrentWeatherAside } from "./CurrentWeatherAside";
import "./CurrentWeatherPanel.css";
import { CurrentWeatherType, ForecastWeatherType } from "../App";

type CurrentWeatherPanelProps = {
  isActive: boolean;
  searchHistory: string[];
  onSetLocation: React.Dispatch<React.SetStateAction<string>>;
  onSetIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  location: string;
  fetchLocation: (location: string) => Promise<void>;
  getLocation: () => void;
  currentWeather: CurrentWeatherType | null;
  forecastWeather: ForecastWeatherType | null;
  units: string;
};

export const CurrentWeatherPanel = ({
  isActive,
  searchHistory,
  onSetLocation,
  onSetIsActive,
  location,
  fetchLocation,
  getLocation,
  currentWeather,
  forecastWeather,
  units,
}: CurrentWeatherPanelProps) => {
  return (
    <aside className="searchbar">
      <SearchPanel
        isActive={isActive}
        onSetLocation={onSetLocation}
        onSetIsActive={onSetIsActive}
        location={location}
        onSubmit={fetchLocation}
        searchHistory={searchHistory}
      />

      <div className={isActive === true ? "hidden" : ""}>
        <div className="location-search-div">
          <button className="search-button" onClick={() => onSetIsActive(true)}>
            Search for places
          </button>
          <button
            className="top-button"
            onClick={() => {
              getLocation();
            }}
          >
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
