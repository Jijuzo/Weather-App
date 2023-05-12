import React from "react";
export function SearchPanel({
  isActive,
  setLocation,
  setIsActive,
  location,
  FetchLocation,
}) {
  return (
    <div className={`${isActive === false ? "hidden" : ""} "search-params"`}>
      <div className="close-button-container">
        <button
          className="close-button"
          onClick={() => {
            setLocation(""), setIsActive(false);
          }}
        >
          <span className=" material-symbols-outlined">close</span>
        </button>
      </div>
      <div className="search-input-flex">
        <div className="search-input-container">
          <label htmlFor="srch-input">
            <span className="material-symbols-outlined">search</span>
          </label>
          <input
            id="srch-input"
            autoComplete="off"
            className="search-input"
            placeholder="search location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            FetchLocation();
            setIsActive(false);
            setLocation("");
          }}
          className="search-input-activate"
        >
          Search
        </button>
      </div>
    </div>
  );
}
