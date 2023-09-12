import { Footer } from "./Footer";
import React from "react";
import { UnitButtons } from "./UnitButtons";
import { Forecasts } from "./Forecasts";
import { CurrentWeatherHighlights } from "./CurrentWeatherHighlights";
import { ErrorAlert } from "./ErrorAlert";
import "./DetailsPanel.css";

export const DetailsPanel = ({
  fetchError,
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
      {forecastWeather && currentWeather && (
        <Forecasts forecastWeather={forecastWeather} units={units} />
      )}
      <ErrorAlert error={fetchError} />
      {forecastWeather && currentWeather && (
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
