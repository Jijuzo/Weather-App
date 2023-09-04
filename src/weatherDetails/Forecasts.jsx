import React from "react";
import { formatDate } from "../utils/formatDate";
import { Forecast } from "./Forecast";
import "./Forecasts.css";

export const Forecasts = ({ forecastWeather, units }) => {
  const forecasts = [];
  for (let i = 6; i <= 38; i += 8) {
    forecasts.push({
      date: formatDate(forecastWeather.list[i].dt),
      icon: forecastWeather.list[i].weather[0].icon,
      temp_max: Math.round(forecastWeather.list[i].main.temp_max),
      temp_min: Math.round(forecastWeather.list[i].main.temp_min),
      description: forecastWeather.list[i].weather[0].main,
    });
  }

  return (
    <div className="forecast-container">
      {forecasts.map((item, idx) => {
        return (
          <Forecast
            key={idx}
            date={item.date}
            icon={item.icon}
            temp_max={item.temp_max}
            temp_min={item.temp_min}
            description={item.description}
            units={units}
          />
        );
      })}
    </div>
  );
};
