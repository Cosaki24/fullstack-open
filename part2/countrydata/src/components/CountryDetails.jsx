const CountryDetails = (props) => {
    const flagStyle = {
        maxWidth: '150px',
        border: '1px black solid'
    }

    const iconStyle = {
        background : "#9bd1e8",
        borderRadius: "20%"
    }
    if(props.weather){
        const icon = props.weather.current.weather[0].icon
        return (
            <>
                <h2>{props.detail.name.common}</h2>
                <div>capital {props.detail.capital.map(c => c + " ")}</div>
                <div>area {props.detail.area}</div>
                <h3>languages:</h3>
                <ul>
                    {Object.values(props.detail.languages).map((l, i) => <li key={i}>{l}</li>)}
                </ul>
                <img style={flagStyle} src={props.detail.flags.png} alt={props.detail.flags.alt} />
                <h2>Weather in {props.detail.capital[0]}</h2>
                <p>temperature {props.weather.current.temp} Celcius</p>
                <img style={iconStyle} src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
                <p>wind {props.weather.current.wind_speed} m/s</p>
            </>
        )
    }else{
        return (
            <>
                <h2>{props.detail.name.common}</h2>
                <div>capital {props.detail.capital.map(c => c + " ")}</div>
                <div>area {props.detail.area}</div>
                <h3>languages:</h3>
                <ul>
                    {Object.values(props.detail.languages).map((l, i) => <li key={i}>{l}</li>)}
                </ul>
                <img style={flagStyle} src={props.detail.flags.png} alt={props.detail.flags.alt} />
            </>
        )
    }
    
}

export default CountryDetails