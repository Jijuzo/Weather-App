import { Footer } from "./Footer";
import { UnitButton } from "./UnitButtons";
import { Forecasts } from "./Forecasts";
import { CurrentWeatherHighlights } from "./CurrentWeatherHighlights";
import { ErrorAlert } from "./ErrorAlert";
import "./DetailsPanel.css";
import { CurrentWeather, ForecastWeather } from "../types";
import { useMemo } from "react";

type DetailsPanelProps = {
  fetchError: Error | null;
  currentWeather: CurrentWeather | null;
  forecastWeather: ForecastWeather | null;
  units: string;
  onSetUnits: (unit: string) => void;
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
            onUnitChange={(unit) => {
              onSetUnits(unit === "C" ? "metric" : "imperial");
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
