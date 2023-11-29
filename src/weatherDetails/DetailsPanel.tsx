import { Footer } from "./Footer";
import { UnitButton } from "./UnitButton";
import { Forecasts } from "./Forecasts";
import { CurrentWeatherHighlights } from "./CurrentWeatherHighlights";
import { ErrorAlert } from "./ErrorAlert";
import "./DetailsPanel.css";
import { CurrentWeather, ForecastWeather, Units } from "../types";
import { useMemo } from "react";

type DetailsPanelProps = {
  fetchError: Error;
  currentWeather: CurrentWeather | null;
  forecastWeather: ForecastWeather | null;
  units: Units;
  onSetUnits: (unit: Units) => void;
};

export const DetailsPanel = ({
  fetchError,
  onSetUnits,
  forecastWeather,
  units,
  currentWeather,
}: DetailsPanelProps) => {
  const activeUnit = useMemo(() => {
    return units === "metric" ? "C" : "F";
  }, [units]);

  return (
    <div className="right-side">
      <div className="unit-buttons">
        {["C", "F"].map((unit) => (
          <UnitButton
            key={unit}
            label={unit}
            activeUnit={activeUnit}
            onUnitChange={(activeUnit) => {
              onSetUnits(activeUnit === "C" ? "metric" : "imperial");
            }}
          />
        ))}
      </div>
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
