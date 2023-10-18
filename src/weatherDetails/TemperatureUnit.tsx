const READABLE_UNITS = {
  metric: "°C",
  imperial: "°F",
};

export const TemperatureUnit = ({ units }: { units: string }) => {
  return (
    <span>
      {units === "metric" ? READABLE_UNITS.metric : READABLE_UNITS.imperial}
    </span>
  );
};
