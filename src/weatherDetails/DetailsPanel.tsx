import { Footer } from "./Footer";
import React from "react";
import { UnitButtons } from "./UnitButtons";
import { Forecasts } from "./Forecasts";
import { CurrentWeatherHighlights } from "./CurrentWeatherHighlights";
import { ErrorAlert } from "./ErrorAlert";
import "./DetailsPanel.css";
import { CurrentWeatherType, ForecastWeatherType } from "../App";

type DetailsPanelProps = {
  fetchError: string | null;
  currentUnit: string;
  currentWeather: CurrentWeatherType | null;
  forecastWeather: ForecastWeatherType | null;
  units: string;
  setCurrentUnit: React.Dispatch<React.SetStateAction<string>>;
  onSetUnits: React.Dispatch<React.SetStateAction<string>>;
};

export const DetailsPanel = ({
  fetchError,
  currentUnit,
  setCurrentUnit,
  onSetUnits,
  forecastWeather,
  units,
  currentWeather,
}: DetailsPanelProps) => {
  return (
    <div className="right-side">
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
          <h2 className="highlights-header">Today’s Highlights</h2>
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
