import { useState, useEffect } from 'react'
import axios from 'axios'




const Country = ({country}) => 
  <>
    <h1>{country.name.common}</h1>
    <p>capital {country.capital}</p>
    <p>area {country.area}</p>
    <b>languages:</b>
    <ul>
      {Object.values(country.languages).map(lng => <li key={lng}>{lng}</li>)}
    </ul>
    <img src={country.flags.png}></img>
  </>



const ShowCountry = ({countriesData, buttonClick}) => {

  const handleShow = (countryIndex) => {
    console.log(countryIndex)
    buttonClick(countryIndex)
  }

  if (countriesData === undefined) {
    console.log(countriesData)
    return (
      <Country country={countriesData}/>
    )
  }

  if (countriesData.length > 10 || countriesData.length === 0) {
    return (
      <p>Too many matches, specify another filter</p>
    )}
  if (countriesData.length > 1) {
    return (
      <>
        {countriesData.map((count, i) => <p key={count.name.common}>{count.name.common} 
        <button onClick={() => {handleShow(i)}}>show</button></p>)}
      </>
    )}
  
  return (
    <Country country={countriesData[0]}/>
  )

}

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])

  const baseUrl = `https://restcountries.com/v3.1/all`

  useEffect(() => {
    console.log('effect run, country is now', value)

    if (value) {
      console.log('fetching exchange rates...')

        axios.get(`${baseUrl}/../name/${value}`).then(response => {
            setCountries(response.data)
            console.log(response.data)}).catch (errNotFound => {
              console.log(errNotFound)
              setCountries([])
            })
    }

  }, [value])


  const handleValueChange = (event) => {
    setValue(event.target.value)
  }

  const showSelected = (countryIndex) => {
    setCountries([countries[countryIndex]])
  }

  return (
    <div>
      <form>
        find countries: <input value={value} onChange={handleValueChange} />
      </form>
      <div>
        <ShowCountry countriesData={countries} buttonClick={showSelected}/>
      </div>
    </div>
  )
}

export default App