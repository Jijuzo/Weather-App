import React from "react";
import "./WindDirection.css";

export function WindDirection({ currentWeather }) {
  return (
    <div className="highlight-additional">
      <span
        className="material-symbols-outlined wind-direction-icon"
        style={{
          transform: `rotate(${currentWeather.wind.deg}deg)`,
        }}
      >
        navigation
      </span>
      {"  "}
      {degreesToText(currentWeather.wind.deg)}
    </div>
  );
}

function degreesToText(deg) {
  const directions = [
    { range: [360, 21], name: "N" },
    { range: [22, 44], name: "NNE" },
    { range: [45, 66], name: "NE" },
    { range: [67, 89], name: "ENE" },
    { range: [90, 111], name: "E" },
    { range: [112, 134], name: "ESE" },
    { range: [135, 156], name: "SE" },
    { range: [157, 179], name: "SSE" },
    { range: [180, 201], name: "S" },
    { range: [202, 224], name: "SSW" },
    { range: [225, 246], name: "SW" },
    { range: [247, 269], name: "WSW" },
    { range: [270, 291], name: "W" },
    { range: [292, 314], name: "WNW" },
    { range: [315, 336], name: "NW" },
    { range: [337, 359], name: "NNW" },
  ];

  const matchedDirection = directions.find(
    ({ range }) => deg >= range[0] && deg <= range[1]
  );

  return matchedDirection ? matchedDirection.name : "no data";
}
