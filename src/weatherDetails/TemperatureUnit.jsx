import React from "react";

export const TemperatureUnit = ({ units }) => {
  return <span>{units === "metric" ? "°C" : "°F"}</span>;
};
