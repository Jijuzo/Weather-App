export type CurrentWeather = {
  main: { temp: number; humidity: number; pressure: number };
  weather: [{ description: string; icon: string }];
  dt: number;
  name: string;
  sys: { country: string };
  wind: { speed: number; deg: number };
  visibility: number;
};

export type ForecastWeather = {
  list: [
    {
      dt: number;
      weather: [{ icon: string; main: string }];
      main: { temp_max: number; temp_min: number };
    }
  ];
};
