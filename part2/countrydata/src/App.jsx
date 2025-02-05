import { useState, useEffect } from 'react'
import Results from './components/Results'
import CountryDetails from './components/CountryDetails'
import countryApi from './services/countries'
import weatherApi from './services/weather'

const App = () => {
  const [countries, setCountries] = useState([])
  const [results, setResults] = useState([])
  const [countryObject, setCountryObject] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countryApi.getAll()
      .then(data => {
        setCountries(data)
      })
  }, [])

  useEffect(() => {
    if(countryObject){
      weatherApi.getWeather(countryObject)
        .then(data => {
          setWeather(data)
        })
    }
  }, [countryObject])

  const handleChange = (event) => {
    setCountryObject(null)
    const search = event.target.value
    const filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()))
    if(search){
      if(filteredCountries.length === 1){
        setCountryObject(filteredCountries[0])
      }else{
        setResults(filteredCountries)
      }
      
    }else{
      setResults([])
    }
  }

  const showCountry = (object) => {
    const countryDetails = object
    setCountryObject(countryDetails)
  }

  if (countryObject) {
    return (
      <>
        <div>find countries <input placeholder="country name here..." onChange={handleChange} /></div>
        <CountryDetails detail={countryObject} weather={weather} />
      </>
      
    )
  }

  if (!countryObject) {
    return (
      <>
        <div>find countries <input placeholder="country name here..." onChange={handleChange} /></div>
        <h1>search results</h1>
        <Results results={results} showCountry={showCountry} />
      </>
    )
  }

}

export default App