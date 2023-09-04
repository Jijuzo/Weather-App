import React from "react";
import "./SearchPanel.css";

export const SearchPanel = ({
  isActive,
  onSetLocation,
  onSetIsActive,
  location,
  FetchLocation,
}) => {
  function handleSubmit(event) {
    event.preventDefault();

    if (location.trim() === "") {
      alert("Please enter a valid location.");
      return;
    }

    FetchLocation();
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
    </div>
  );
};
