export const setSearchHistoryFunc = (
  searchHistory,
  setSearchHistory,
  location
) => {
  const cityIndex = searchHistory.indexOf(location);
  if (cityIndex !== -1) {
    searchHistory.splice(cityIndex, 1);
  }
  if (!searchHistory.includes(location)) {
    setSearchHistory((prevLocation) => [location, ...prevLocation]);
    localStorage.setItem(
      "searchHistory",
      JSON.stringify([location, ...searchHistory])
    );
  }
};
