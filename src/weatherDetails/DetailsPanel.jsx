import { Footer } from "./Footer";
import React from "react";
import { UnitButtons } from "./UnitButtons";
import { Forecasts } from "./Forecasts";
import { CurrentWeatherHighlights } from "./CurrentWeatherHighlights";
import "./DetailsPanel.css";

export const DetailsPanel = ({
  currentUnit,
  setCurrentUnit,
  onSetUnits,
  forecastWeather,
  units,
  currentWeather,
}) => {
  return (
    <div className="rightside">
      <UnitButtons
        onSetUnits={onSetUnits}
        currentUnit={currentUnit}
        setCurrentUnit={setCurrentUnit}
      />
      {forecastWeather && (
        <Forecasts forecastWeather={forecastWeather} units={units} />
      )}
      {currentWeather && (
        <div>
          <h2 className="hightlights-header">Today’s Hightlights</h2>
          <CurrentWeatherHighlights
            currentWeather={currentWeather}
            units={units}
          />
        </div>
      )}
      <Footer />
    </div>
  );
};
