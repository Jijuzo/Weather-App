import React from "react";
import { SearchPanel } from "./SearchPanel";
import { CurrentWeatherAside } from "./CurrentWeatherAside";
import "./CurrentWeatherPanel.css";

export const CurrentWeatherPanel = ({
  isActive,
  onSetLocation,
  onSetIsActive,
  location,
  FetchLocation,
  getLocation,
  currentWeather,
  units,
}) => {
  return (
    <aside className="searchbar">
      <SearchPanel
        isActive={isActive}
        onSetLocation={onSetLocation}
        onSetIsActive={onSetIsActive}
        location={location}
        FetchLocation={FetchLocation}
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
        {currentWeather && (
          <CurrentWeatherAside currentWeather={currentWeather} units={units} />
        )}
      </div>
    </aside>
  );
};
