import React from "react";
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
  switch (true) {
    case deg >= 360 || deg <= 21:
      return "N";
    case deg >= 22 && deg <= 44:
      return "NNE";
    case deg >= 45 && deg <= 66:
      return "NE";
    case deg >= 67 && deg <= 89:
      return "ENE";
    case deg >= 90 && deg <= 111:
      return "E";
    case deg >= 112 && deg <= 134:
      return "ESE";
    case deg >= 135 && deg <= 156:
      return "SE";
    case deg >= 157 && deg <= 179:
      return "SSE";
    case deg >= 180 && deg <= 201:
      return "S";
    case deg >= 202 && deg <= 224:
      return "SSW";
    case deg >= 225 && deg <= 246:
      return "SW";
    case deg >= 247 && deg <= 269:
      return "WSW";
    case deg >= 270 && deg <= 291:
      return "W";
    case deg >= 292 && deg <= 314:
      return "WNW";
    case deg >= 315 && deg <= 336:
      return "NW";
    case deg >= 337 && deg <= 359:
      return "NNW";
    default:
      deg = "no data";
  }
}
