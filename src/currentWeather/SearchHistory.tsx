import "./SearchHistory.css";

type SearchHistoryProps = {
  searchHistory: string[];
  onclick: (e: React.MouseEvent<HTMLElement>) => void;
};

export const SearchHistory = ({
  searchHistory,
  onclick,
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
              onClick={onclick}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
