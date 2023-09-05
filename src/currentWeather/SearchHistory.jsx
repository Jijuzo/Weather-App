import "./SearchHistory.css";

export const SearchHistory = ({ searchHistory }) => {
  return (
    <div className="search-history-div">
      <h2 className="search-history-header">Search History</h2>
      <ul className="search-history-ul">
        {searchHistory.map((term, index) => (
          <li className="search-history-ul-item" key={index}>
            {term}
          </li>
        ))}
      </ul>
    </div>
  );
};
