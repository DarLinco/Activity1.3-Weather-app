//API:https://home.openweathermap.org/
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";
import "./Weather.css";
import { wait } from "@testing-library/user-event/dist/utils";

const Weather = () => {
  const [city, setCity] = useState("Pagadian");
  const [weatherData, setWeatherData] = useState(null);
  // const [forecastData, setForecastData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d862b4b7a910dbfe9ca8dca553055bd0`
      );

      const { coord } = response.data;

      // const forecastResponse = await axios.get(
      //   `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${coord.lat}&lon=${coord.lon}&cnt=5&appid=d862b4b7a910dbfe9ca8dca553055bd0`
      // );

      setWeatherData(response.data);
      //   setForecastData(forecastData.data);
      console.log(response.data);
      // console.log(forecastData.data);
    } catch (error) {
      alert("City not found. Please enter a valid city name.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="main">
      <form onSubmit={handleSubmit} style={{ width: "70%" }}>
        <div class="input-group rounded">
          <input
            type="search"
            class="form-control rounded"
            className="form-control"
            aria-label="Search"
            aria-describedby="search-addon"
            placeholder="Enter city name"
            value={city}
            onChange={handleInputChange}
          />
          <button class="btn btn-primary" type="submit">
            Get Weather
          </button>
        </div>
      </form>
      <div className="weatherData">
        {weatherData ? (
          <>
            <div>
              <div>
                <div class="card-body">
                  <h5 class="card-title" className="city">
                    {weatherData.name}
                  </h5>

                  <p class="card-text" className="date">
                    {new Date(weatherData.dt * 1000).toLocaleDateString(
                      "en-IN"
                    )}
                  </p>

                  <p class="card-text" className="temperature">
                    {weatherData.main.temp} &deg;C
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                      className="icon"
                    />
                  </p>
                  <p class="card-text" className="dayType">
                    {weatherData.weather[0].description}
                  </p>
                </div>
              </div>
            </div>

            <div className="mini-cards">
              <div class="col-sm-6">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Feels Like</h5>

                    <p class="card-text">
                      {weatherData.main.feels_like} &deg;C
                    </p>
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Wind</h5>
                    <p class="card-text">{weatherData.wind.speed}m/s</p>
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Humidity</h5>
                    <p class="card-text">{weatherData.main.humidity}%</p>
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Air Pressure</h5>
                    <p class="card-text">{weatherData.main.pressure} hPa</p>
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Sunrise</h5>
                    <p class="card-text">
                      {new Date(
                        weatherData.sys.sunrise * 1000
                      ).toLocaleTimeString("en-IN")}{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Sunset</h5>
                    <p class="card-text">
                      {new Date(
                        weatherData.sys.sunset * 1000
                      ).toLocaleTimeString("en-IN")}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
};

export default Weather;
