import { useEffect, useState } from "react";
import "./App.css";
import Forecast from "./Components/Forecast";
import Inputs from "./Components/Inputs";
import TemparatureAndDetails from "./Components/TemparatureAndDetails";
import TimeAndLocation from "./Components/TimeAndLocation";
import TopButtons from "./Components/TopButtons";
import getFormattedWeatherData from "./Services/weatherServices";
// import Uilreact from "@iconscout/react-unicons/icons/uil-react";

function App() {
  const [query, setQuery] = useState({ q: "Ghatlodiya" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} units={units} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemparatureAndDetails weather={weather} />
          <Forecast title={"hourly forecast"} items={weather.hourly} />
          <Forecast title={"daily forecast"} items={weather.daily} />
        </div>
      )}
    </div>
  );
}

export default App;
