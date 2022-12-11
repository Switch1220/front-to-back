import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

interface HourlyUnits {
  time: string;
  temperature_2m: string;
}

interface Hourly {
  time: string[];
  temperature_2m: number[];
}

interface RootObject {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: HourlyUnits;
  hourly: Hourly;
}

interface TempInfo {
  hour: string;
  temp: number;
}

function App() {
  const [weathers, setWeathers] = useState<Array<TempInfo>>([]);

  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=47.91&longitude=106.88&hourly=temperature_2m'
    );

    if (res.ok) {
      const json = await res.json();
      const temps = json.hourly as Hourly;

      /*
      time: [
        ...
      ]
      temp: [
        ...
      ]



      [
        {
        hour: 2022-12-13T12:00,
        temp: -12
      },
        {
        hour: 2022-12-13T12:00,
        temp: -12
      },
        {
        hour: 2022-12-13T12:00,
        temp: -12
      },
    ]
      */

      let tempInfo: Array<TempInfo> = [];

      for (let i = 0; i < temps.temperature_2m.length; i++) {
        tempInfo.push({ hour: temps.time[i], temp: temps.temperature_2m[i] });
      }

      setWeathers(tempInfo);
    }
  };

  return (
    <div className="App">
      <div>
        {weathers.map((info) => (
          <p>
            hour: {info.hour}, temp: {info.temp}°C
          </p>
        ))}
      </div>
      <button onClick={handleClick}>Fetch weather!</button>
    </div>
  );
}

export default App;
