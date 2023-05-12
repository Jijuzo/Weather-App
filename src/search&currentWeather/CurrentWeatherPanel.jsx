import { SearchPanel } from "./SearchPanel";
import React from "react";
import CurrentWeatherAside from "./CurrentWeatherAside";
export function CurrentWeatherPanel({
  isActive,
  setLocation,
  setIsActive,
  location,
  FetchLocation,
  getLocation,
  currentWeather,
  units,
}) {
  return (
    <aside className="searchbar">
      <SearchPanel
        isActive={isActive}
        setLocation={setLocation}
        setIsActive={setIsActive}
        location={location}
        FetchLocation={FetchLocation}
      />

      <div className={isActive === true ? "hidden" : ""}>
        <div className="location-search-div">
          <button className="search-button" onClick={() => setIsActive(true)}>
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
}
