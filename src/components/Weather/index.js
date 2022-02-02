import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';

export default function WeatherService() {
  const [cityState, setCityState] = useState("");
  const [zip, setZip] = useState("");
  const [weather, setWeather] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({});
  // forecasts are updated every 10 minutes by OpenWeatherMap
  // Code 429 is if you have exceeded call limit
  const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentLocation.lat}&lon=${currentLocation.long}&units=imperial&appid=${process.env.REACT_APP_WEATHER_APPID}`;
  const zipUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&appid=${process.env.REACT_APP_WEATHER_APPID}`;
  const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityState}&units=imperial&appid=${process.env.REACT_APP_WEATHER_APPID}`;
  console.log(process.env.REACT_APP_WEATHER_APPID);

  // NOTE: Below is Current Location request for the browser
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    console.log(pos);
    const crd = pos.coords;
  
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    setCurrentLocation({ lat: crd.latitude, long: crd.longitude });
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
    console.log(weather);
  }, []);

  useEffect(() => {
    console.log(currentLocation);
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${currentLocation.lat}&lon=${currentLocation.long}&units=imperial&appid=${process.env.REACT_APP_WEATHER_APPID}`).then((result) => setWeather(result.data));
  }, [currentLocation]);

  const handleInputChange = e => {
    if(e.target.name === 'cityState') {
      setCityState(e.target.value.split(', ').join(','));
    }
    if(e.target.name === 'zip') setZip(e.target.value);
  };

  const handleSubmit = async () => {
    if(zip) {
      console.log(zipUrl);
      axios.get(zipUrl).then((result) => setWeather(result));
    } else {
      axios.get(cityUrl).then((result) => setWeather(result));
    }
    console.log(weather);
    console.log(zip, cityState);
  }

  console.log(!!weather);
  console.log(weather);

  return (
    <Fragment>
      {!currentLocation && (
        <Form>
          <FormGroup>
            <Input
              type="text"
              name="zip"
              placeholder="Zipcode"
              value={zip}
              onChange={handleInputChange}
              disabled={cityState ? true : false}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="cityState"
              placeholder="City, State"
              value={cityState}
              onChange={handleInputChange}
              disabled={zip ? true: false}
            />
          </FormGroup>
          <Button onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      )}
      {!!weather && (
        <Fragment>
          <h3>Current Weather</h3>
          <p>{weather.current.weather[0].description}</p>
          <p>Temp: {weather.current.temp} F</p>
          <p>Feels like: {weather.current.feels_like} F</p>
          <p>Humidity: {weather.current.humidity}%</p>
          <p>Wind speed: {weather.current.wind_speed}mph</p>
        </Fragment>
      )}
    </Fragment>
  )
};
