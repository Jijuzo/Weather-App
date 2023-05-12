import React from "react";
import { WindDirection } from "./WindDirection";
import ProgressBar from "./Progressbar";

export function Highlight({ idx, units, currentWeather, item }) {
  return (
    <div className="highlight" key={idx}>
      <div className="highlight-main">
        <p className="highlight-name">{item.name}</p>
        <p className="highlight-value">
          {item.value}{" "}
          {units === "metric" ? item.unit.metric : item.unit.imperial}
        </p>
      </div>
      {idx === 0 ? (
        <WindDirection currentWeather={currentWeather} />
      ) : idx === 1 ? (
        <ProgressBar value={currentWeather.main.humidity} />
      ) : (
        ""
      )}
    </div>
  );
}
