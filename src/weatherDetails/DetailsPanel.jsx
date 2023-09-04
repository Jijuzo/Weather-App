import { Footer } from "./Footer";
import React from "react";
import { UnitButtons } from "./UnitButtons";
import { Forecasts } from "./Forecasts";
import { CurrentWeatherHighlights } from "./CurrentWeatherHighlights";
import "./DetailsPanel.css";

export const DetailsPanel = ({
  isUnitActive,
  setIsUnitActive,
  onSetUnits,
  forecastWeather,
  units,
  currentWeather,
}) => {
  return (
    <div className="rightside">
      <UnitButtons
        onSetUnits={onSetUnits}
        isUnitActive={isUnitActive}
        setIsUnitActive={setIsUnitActive}
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
