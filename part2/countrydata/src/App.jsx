import {useState, useEffect } from 'react'
import Results from './components/Results'
import api from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [results, setResults] = useState([])

  useEffect(() => {
    api.getAll()
    .then(data => {
      setCountries(data)
    } )
  }, [])

  const handleChange = (event) => {
    const search = event.target.value
    const filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()))
    setResults(filteredCountries)
  }

  return (
    <>
    <div>find countries <input placeholder="country name here..." onChange={handleChange}/></div>
    <h1>search results</h1>
    <Results results={results} />
    </>
  )
}

export default App