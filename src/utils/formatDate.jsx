export function formatDate(data) {
  const date = new Date(data * 1000);
  const options = { weekday: "short", day: "numeric", month: "short" };
  return date.toLocaleString("en-GB", options);
}
