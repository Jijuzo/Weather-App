import React from "react";
import UnitButtons from "./UnitButtons";
import Forecasts from "./Forecasts";
import CurrentWeatherHighlights from "./CurrentWeatherHighlights";
export function DetailsPanel({
  setUnits,
  forecastWeather,
  units,
  currentWeather,
}) {
  return (
    <div className="rightside">
      <UnitButtons setUnits={setUnits} />
      {forecastWeather && (
        <Forecasts forecastWeather={forecastWeather} units={units} />
      )}
      <h2 className="hightlights-header">Today’s Hightlights</h2>
      {currentWeather && (
        <CurrentWeatherHighlights
          currentWeather={currentWeather}
          units={units}
        />
      )}
      <footer className="footer">
        Created by{" "}
        <strong>
          <a className="link" href="https://github.com/Jijuzo">
            Jijuzo
          </a>
        </strong>{" "}
        - devChallenges.io
      </footer>
    </div>
  );
}
