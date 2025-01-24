import { useEffect, useState } from 'react';
import './App.css';
import searchIcon from './assets/search.png';
import WeatherDetails from './weather';
import clearIcon from './assets/sun.png';
import drizzleIcon from './assets/drizzle.png';
import rainIcon from './assets/rain.png';
import snowIcon from './assets/snow.png';
import fogIcon from './assets/fog.png';
import showerIcon from './assets/shower.png';
import thunderIcon from './assets/thunderstrom.png';
import cloudsIcon from './assets/clouds.png';

//import { useForm } from 'react-hook-form';

function App() {
  const api_key = 'd4ff145f4bacbc2826c8a4177fe60d1b';
  const [icon, setIcon] = useState(snowIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState('none');
  const [country, setCountry] = useState('-');
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [text, setText] = useState('');
  const [cityNotFound, setCityNotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading,setLoading]=useState(false)
  const weatherIconMap = {
    '01d': clearIcon,
    '01n': clearIcon,
    '02d': cloudsIcon,
    '02n': cloudsIcon,
    '03d': drizzleIcon,
    '03n': drizzleIcon,
    '04d': drizzleIcon,
    '04n': drizzleIcon,
    '09d': showerIcon,
    '09n': showerIcon,
    '10d': rainIcon,
    '10n': rainIcon,
    '11d':thunderIcon,
    '11n':thunderIcon,
    '13d': snowIcon,
    '13n': snowIcon,
    '50d':fogIcon,
    '50n':fogIcon,
  };

  const search = async () => {
    setText('')
    if (!text.trim()) {
      setErrorMessage('Please enter a city name.');
      return;
    }
    setLoading(true)
    setErrorMessage('')
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.cod === '404') {
        setCityNotFound(true);
        setErrorMessage('City not found. Please try again.');
        return;
      }else{
      setCityNotFound(false);
      setErrorMessage('')
      setHumidity(data.main.humidity);
      setTemp(data.main.temp);
      setWind(data.wind.speed);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLong(data.coord.lon);
      setCity(data.name);

      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);}
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
    finally{
      setLoading(false)
    }
  };
  // useEffect(() => {
  //   search();
  // }, []);

  return (
    <>
      <div className="container">
        <div className="input">
          <input
            type="text"
            className="cityInput"
            placeholder="Search a City"
            onChange={(e) => {setText(e.target.value); setErrorMessage('')}}
            value={text}
          />
          <div className="search">
            <img src={searchIcon} alt="search" onClick={search} />
          </div>
        </div>

        {errorMessage && <p className="error">{errorMessage}</p>}
        {loading && <p className='loader'><span className="loader"></span></p>}

        { !loading && !cityNotFound&&(<WeatherDetails
          icon={icon}
          temp={temp}
          city={city}
          country={country}
          lat={lat}
          long={long}
          humidity={humidity}
          wind={wind}
        />)}
      </div>
    </>
  );
}

export default App;

