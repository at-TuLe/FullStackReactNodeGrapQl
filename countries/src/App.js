import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './Countries'
import Country from './Country'

function App() {
  const [ searchWord, setSearchWord ] = useState('')
  const [ weather, setWeather ] = useState({})
  const [ countries, setCountries ] = useState([])
  const [ country, setCountry ] = useState({})
  const [ isShowDetail, setIsShowDetail ] = useState(false)

  const handleSearchWord = (event) => {
    let value = event.target.value;
    setSearchWord(value)
    if (value !== '') {
      filterCountry(value)
    }
  }

  const filterCountry = (name) => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}`)
      .then(response => {
        // console.log(name, response.data )
        let results = response.data;
        setCountries(results);
        if(results.length === 1) {
          getWeather(results[0].name)
        }
      })
  }

  const getCountryByName = (name) => {
    console.log('detail', name)
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}`)
      .then(response => {
        console.log(name, response.data )
        setCountry(response.data[0]);
        getWeather(response.data[0].name);
        setIsShowDetail(true);
      })
  }

  const getCountries = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('all')
        setCountries(response.data)
      })
  }

  const getWeather = (countryName) => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=1f1f69bdbc9c621784c6482a3c0e867e&query=${countryName}`)
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
      })
  }

  const showDetail = () => {
    if (isShowDetail){
      return (
        <div>
          <Country country={country} weather={weather}/>
          <button onClick={() => setIsShowDetail(false)}>Hide</button>
        </div>
      )
    } 
  }

  // useEffect(() => {
  //   filterCountry(searchWord);

  //   // if(searchWord === '') {
  //   //   getCountries();
  //   // } else {
  //     // filterCountry(searchWord);
  //   // }
  // }, [searchWord])

  useEffect(() => {
    getCountries();
  }, [])

  return (
    <div className="App">
      <div>
        Find country: <input value={searchWord} onChange={handleSearchWord}/>
      </div>
      { countries.length === 1
        ? (<Country country={countries[0]} weather={weather}/>)
        : countries.length > 10
          ? (<div>Too many matches, specify another filter</div>)
          : isShowDetail
            ? (
                <div>
                  <Country country={country} weather={weather}/>
                  <button onClick={() => setIsShowDetail(false)}>Hide</button>
                  <Countries countries={countries} onShowDetail={getCountryByName} />
                </div>
              )
            : (<Countries countries={countries} onShowDetail={getCountryByName} />)
      }
    </div>
  );
}

export default App;
