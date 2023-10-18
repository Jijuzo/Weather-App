import "./SearchHistory.css";

type SearchHistoryProps = {
  searchHistory: string[];
  onSetLocation: React.Dispatch<React.SetStateAction<string>>;
  onClick: (location: string) => Promise<void>;
  onSetIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchHistory = ({
  searchHistory,
  onSetLocation,
  onClick,
  onSetIsActive,
}: SearchHistoryProps) => {
  function handleClick(event: React.MouseEvent<HTMLElement>) {
    onClick((event.target as HTMLInputElement).value);
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
