const options = { weekday: "short", day: "numeric", month: "short" };

export function formatDate(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleString("en-GB", options);
}
