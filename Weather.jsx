import React, {useEffect, useRef, useState} from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';

import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';

import wind_icon from '../assets/wind-fotor.png';
import humidity_icon from '../assets/humidity-fotor.png';
import presure_icon from '../assets/resilience-fotor.png';
import fells_like_icon from '../assets/thermometer-fotor.png';
import sunrise_icon from '../assets/sunrise.png';
import sunset_icon from '../assets/sunset.png';
import cloudiness_icon from '../assets/cloudy-day-.png';
import precipitation_icon from '../assets/precipitation-.png';

const Weather = () => {

    const inputRef = useRef();
     const [weatherData, setWeatherData] = useState(false);

     const allIcons = {
         "01d": clear_icon,
         "01n": clear_icon,
         "02d": cloud_icon,
         "02n": cloud_icon,
         "03d": cloud_icon,
         "03n": cloud_icon,
         "04d": drizzle_icon,
         "04n": drizzle_icon,
         "09d": rain_icon,
         "09n": rain_icon,
         "10d": rain_icon,
         "10n": rain_icon,
         "13d": snow_icon,
         "13n": snow_icon,
     }

    const search = async (city) => {
         if(city===""){
             alert("Enter a City Name");
             return;
         }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }

            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                pressure: data.main.pressure,
                feelsLike: Math.floor(data.main.feels_like),
                sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
                sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
                cloudiness: data.clouds.all,
                precipitation: data.rain ? data.rain['1h'] : 0,
                icon: icon
            })

            localStorage.setItem('lastCity', city);

        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching weather data");
        }
    }

    useEffect(()=>{
        const lastCity = localStorage.getItem('lastCity');
        if (lastCity) {
            search(lastCity);
        }else {
            search("Cluj-Napoca");
        }
    },[])

    return (
        <div className='weather'>
            <div className="search-bar">
                <input ref={inputRef} placeholder='Search'/>
                <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
            </div>
            {weatherData?<>
                <img src={weatherData.icon} alt="" className='weather-icon'/>
                <p className='temperature'>{weatherData.temperature}°C</p>
                <p className='location'>{weatherData.location}</p>
                <div className="weather-data">
                    <div className="col">
                        <img src={humidity_icon} alt ="" />
                        <div>
                            <p>{weatherData.humidity} %</p>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className="col">
                        <img src={wind_icon} alt ="" />
                        <div>
                            <p>{weatherData.windSpeed} Km/h</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                    <div className="col">
                        <img src={presure_icon} alt ="" />
                        <div>
                            <p>{weatherData.pressure} hPA</p>
                            <span>Pressure</span>
                        </div>
                    </div>
                    <div className="col">
                        <img src={fells_like_icon} alt ="" />
                        <div>
                            <p>{weatherData.feelsLike} °C</p>
                            <span>Feels Like</span>
                        </div>
                    </div>
                    <div className="col">
                        <img src={sunrise_icon} alt ="" />
                        <div>
                            <p>{weatherData.sunrise}</p>
                            <span>Sunrise</span>
                        </div>
                    </div>
                    <div className="col">
                        <img src={sunset_icon} alt ="" />
                        <div>
                            <p>{weatherData.sunset}</p>
                            <span>Sunset</span>
                        </div>
                    </div>
                    <div className="col">
                        <img src={cloudiness_icon} alt ="" />
                        <div>
                            <p>{weatherData.cloudiness} %</p>
                            <span>Cloudiness</span>
                        </div>
                    </div>
                    <div className="col">
                        <img src={precipitation_icon} alt ="" />
                        <div>
                            <p>{weatherData.precipitation} mm</p>
                            <span>Precipitation</span>
                        </div>
                    </div>

                </div>
            </>:<></>}
        </div>
    )
}

export default Weather