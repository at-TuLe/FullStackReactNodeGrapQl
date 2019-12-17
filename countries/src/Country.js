import React from 'react';
import Languages from './Languages'

const Country = ({country, weather}) => {
  const temperature = () => {
    console.log(weather)
    if(!weather.current) {
      return;
    }
    return (
      <div>
        <h2>Weather in {Country.name}</h2>
        <p>temperature: {weather.current.temperature} Celsius</p>
        {
          weather.current.weather_icons.map(icon =>
            <img src={icon} width='50px' alt='icon'></img>
          )
        }
        <p><b>Wind: </b>{weather.current.wind_speed} kph direction {weather.current.wind_dir}</p>
      </div>
    )
  }
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <Languages languages={country.languages}/>
      <img src={country.flag} width='200px' alt='flag'></img>
      { temperature() }
    </div>
  )
}

export default Country;
