import "./SearchHistory.css";

type SearchHistoryProps = {
  searchHistory: string[];
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

export const SearchHistory = ({
  searchHistory,
  onClick,
}: SearchHistoryProps) => {
  return (
    <div className="search-history-div">
      <h2 className="search-history-header">Search History</h2>
      <ul className="search-history-ul">
        {searchHistory.map((name, index) => (
          <li className="search-history-ul-item" key={index}>
            <button
              className="search-history-ul-item-button"
              value={name}
              onClick={onClick}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
