import React, { useState, useEffect } from "react";
import "./styles.css";



const Weather = () => {
  

  const [City, setCity] = useState(null); // storing data..from api
  const [Search, setSearch] = useState("Mumbai"); // for searching..to api
  const [ico, setIcon] = useState(null);
  useEffect(() => {
    const fetchApi = async () => {
      const url = `${process.env.REACT_APP_API_URL}/weather?q=${Search}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
      const response = await fetch(url);
      const resJson = await response.json();
      await setCity(resJson.main);
      await setIcon(resJson.weather[0].description);
      console.log(resJson);
    };
    fetchApi();
  }, [Search]);

  return (
    <>
      <div className="body">
        <div className="maindiv">
          <div className="firstdiv">
            <input
              type="text"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>
          {!City ? (
            <p className="error">No city found</p>
          ) : (
            <div className="seconddiv">
              <p>{ico}</p>

              <h2>{Search}</h2>
              <h3>{City.temp} °C</h3>
              <p>
                Min {City.temp_min} °C | Max {City.temp_max} °C
              </p>
              <p>Pressure {City.pressure} hPa</p>
              <p>Humidity {City.humidity} %</p>
            </div>
          )}
          <div className="first"></div>
          <div className="second"></div>
          <div className="third"></div>
        </div>
      </div>
    </>
  );
};
export default Weather;
