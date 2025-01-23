import './weather.css'
import humidityIcon from './assets/humidity.png';
import windIcon from './assets/wind.png';
function WeatherDetails({icon,temp,city,country,lat,long,humidity,wind}){

    return(
        <>
            <div className='image'>
                <img src={icon} alt="clearSky" />
            </div>
            <div className='temp'>{temp}℃</div>
            <div className='city'>{city}</div>
            <div className='country'>{country}</div>
            <div className='cord'>
                <div>
                    <span className='lat'>latitude</span>
                    <span>{lat}</span>
                </div>
                <div>
                    <span className='long'>longtitude</span>
                    <span>{long}</span>
                </div>
            </div>
            <div className='data-container'>
                <div className='element'>
                    <img src={humidityIcon} alt="humidity"/>
                    <div className='data'>
                        <div className='humidity-percent'>{humidity}%</div>
                        <div className='text'>humidity</div>
                    </div>
                </div>
                <div className='element'>
                    <img src={windIcon} alt="wind"/>
                    <div className='data'>
                        <div className='wind-percent'>{wind}km/h</div>
                        <div className='text'>wind</div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default WeatherDetails