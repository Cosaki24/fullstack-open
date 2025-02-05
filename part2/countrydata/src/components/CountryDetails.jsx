const CountryDetails = ({detail}) => {
    const flagStyle = {
        maxWidth: '150px',
        border: '1px black solid'
    }
    return (
        <>
            <h2>{detail.name.common}</h2>
            <div>capital {detail.capital.map(c => c + " ")}</div>
            <div>area {detail.area}</div>
            <h3>languages:</h3>
            <ul>
                {Object.values(detail.languages).map((l, i) => <li key={i}>{l}</li>)}
            </ul>
            <img style={flagStyle} src={detail.flags.png} alt={detail.flags.alt} />
        </>
    )
}

export default CountryDetails