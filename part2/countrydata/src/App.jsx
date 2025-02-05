import { useState, useEffect } from 'react'
import Results from './components/Results'
import CountryDetails from './components/CountryDetails'
import api from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [results, setResults] = useState([])
  const [countryObject, setCountryObject] = useState(null)

  useEffect(() => {
    api.getAll()
      .then(data => {
        setCountries(data)
      })
  }, [])

  const handleChange = (event) => {
    setCountryObject(null)
    const search = event.target.value
    const filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()))
    if(search){
      setResults(filteredCountries)
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
        <CountryDetails detail={countryObject} />
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