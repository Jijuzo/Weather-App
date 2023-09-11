import "./SearchHistory.css";

export const SearchHistory = ({
  searchHistory,
  onSetLocation,
  fetchLocation,
  onSetIsActive,
}) => {
  function handleClick(event) {
    fetchLocation(event.target.value);
    onSetIsActive(false);
    onSetLocation("");
  }

  return (
    <div className="search-history-div">
      <h2 className="search-history-header">Search History</h2>
      <ul className="search-history-ul">
        {searchHistory.map((name, index) => (
          <li className="search-history-ul-item" key={index}>
            <button
              className="search-history-ul-item-button"
              value={name}
              onClick={handleClick}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
