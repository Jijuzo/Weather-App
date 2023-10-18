const options: Intl.DateTimeFormatOptions = {
  weekday: "short",
  day: "numeric",
  month: "short",
};

export function formatDate(unixTimestamp: number) {
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleString("en-GB", options);
}
