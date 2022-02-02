import { Fragment } from 'react';
import LoginButton from './Auth/Login';
import WeatherService from './components/Weather';

function App() {
  return (
    <Fragment>
      <LoginButton />
      <WeatherService />
    </Fragment>
  );
}

export default App;
