import { useState } from "react";
import "./SearchPanel.css";
import { SearchHistory } from "./SearchHistory";

type SearchPanelProps = {
  isActive: boolean;
  onSetIsActive: (value: boolean) => void;
  onSubmit: (location: string) => void;
  searchHistory: string[];
};

export const SearchPanel = ({
  isActive,
  onSetIsActive,
  onSubmit,
  searchHistory,
}: SearchPanelProps) => {
  const [location, setLocation] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    if (location.trim() === "") {
      alert("Please enter a valid location.");
      return;
    }
    onSubmit(location);
    setLocation("");
  }

  return (
    <div className={`${isActive === false ? "hidden" : ""} "search-params"`}>
      <div className="close-button-container">
        <button
          className="close-button"
          onClick={() => {
            onSetIsActive(false);
            setLocation("");
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
              onChange={(e) => setLocation(e.target.value)}
            />
          </form>
        </div>
        <button onClick={handleSubmit} className="search-input-button">
          Search
        </button>
      </div>
      <SearchHistory
        searchHistory={searchHistory}
        onClick={(e) => {
          onSubmit((e.target as HTMLInputElement).value);
          setLocation("");
        }}
      />
    </div>
  );
};
