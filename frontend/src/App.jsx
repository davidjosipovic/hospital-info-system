import React, { useEffect, useState } from "react";
import { fetchWeather } from "./services/weatherService";

function App() {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        fetchWeather().then(setWeatherData);
    }, []);

    return (
        <div>
            <h1>Weather Forecast</h1>
            {weatherData.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {weatherData.map((item, index) => (
                        <li key={index}>
                            <strong>{item.date}</strong> - {item.temperatureC}°C ({item.temperatureF}°F) - {item.summary}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
