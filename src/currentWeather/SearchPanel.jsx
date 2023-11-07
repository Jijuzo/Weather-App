import React from "react";
import "./SearchPanel.css";
import { SearchHistory } from "./SearchHistory";

export const SearchPanel = ({
  isActive,
  onSetLocation,
  onSetIsActive,
  location,
  onSubmit,
  searchHistory,
}) => {
  function handleSubmit(event) {
    event.preventDefault();

    if (location.trim() === "") {
      alert("Please enter a valid location.");
      return;
    }

    onSubmit(location);
    onSetIsActive(false);
    onSetLocation("");
  }

  return (
    <div className={`${isActive === false ? "hidden" : ""} "search-params"`}>
      <div className="close-button-container">
        <button
          className="close-button"
          onClick={() => {
            onSetIsActive(false);
            onSetLocation("");
          }}
        >
          <span className=" material-symbols-outlined">close</span>
        </button>
      </div>
      <div className="search-input-flex">
        <div className="search-input-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="srch-input">
              <span className="material-symbols-outlined search-icon">
                search
              </span>
            </label>
            <input
              id="srch-input"
              autoComplete="off"
              className="search-input"
              placeholder="search location"
              value={location}
              onChange={(e) => onSetLocation(e.target.value)}
            />
          </form>
        </div>
        <button onClick={handleSubmit} className="search-input-button">
          Search
        </button>
      </div>
      <SearchHistory
        searchHistory={searchHistory}
        onSetLocation={onSetLocation}
        onClick={onSubmit}
        onSetIsActive={onSetIsActive}
        location={location}
      />
    </div>
  );
};
