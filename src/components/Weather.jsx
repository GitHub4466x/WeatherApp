import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import searchIcon from '../assets/search.png'
import clearIcon from '../assets/clear.png'
import cloudIcon from '../assets/cloud.png'
import drizzleIcon from '../assets/drizzle.png'
import humidityIcon from '../assets/humidity.png'
import rainIcon from '../assets/rain.png'
import snowIcon from '../assets/snow.png'
import windIcon from '../assets/wind.png'


const Weather = () => {
    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false);
    const allIcons = {
        "01d": clearIcon,
        "01n": clearIcon,
        "02d": cloudIcon,
        "02n": cloudIcon,
        "03d": cloudIcon,
        "03n": cloudIcon,
        "04d": drizzleIcon,
        "04n": drizzleIcon,
        "09n": rainIcon,
        "09d": rainIcon,
        "10n": rainIcon,
        "10d": rainIcon,
        "13n": snowIcon,
        "13d": snowIcon
    }
    const search = async (city) => {
        if (city == '') {
            alert('Enter state name')
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url)
            const data = await response.json();
            console.log(data)
            if( !response.ok){
                alert(data.message);
                return;
            }
            const icon = allIcons[data.weather[0].icon || clearIcon]
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temprature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon

            })
        } catch (error) {
 setWeatherData(false)
 console.error("Error in fetching data")
        }
    }

    useEffect(() => { search('Idukki'); }, [])

    return (
        <div className='weather'>
            <div className='search-bar'>
                <input type='text' placeholder='Search' ref={inputRef} />
                <img src={searchIcon} alt="" onClick={() => search(inputRef.current.value)} />
            </div>
            {weatherData ? <>
                <img src={weatherData.icon} alt='' className='weather-icon' />
                <p className='temprature'>{weatherData.temprature}<sup>o</sup>C</p>
                <p className='city'>{weatherData.location}</p>
                <div className="weather-data">
                    <div className="col">
                        <img src={humidityIcon} alt='' />
                        <div>
                            <p> {weatherData.humidity}%</p>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className="col">
                        <img src={windIcon} alt='' />
                        <div>
                            <p> {weatherData.windSpeed} Km/h</p>
                            <span>Wind Speed </span>
                        </div>
                    </div>
                </div>
            </> : <></>}

        </div>
    )
}

export default Weather
