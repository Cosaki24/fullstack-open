import axios from 'axios'
const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY
const apiUrl = 'https://api.openweathermap.org/data/3.0/onecall'

const getWeather = (country) => {
   const request = axios
    .get(`${apiUrl}?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&exclude=minutely,hourly,daily&units=metric&appid=${API_KEY}`)

    return request.then(response => response.data)
}

export default {getWeather}