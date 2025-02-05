const Results = ({ results }) => {
    const flagStyle = {
        maxWidth: '150px',
        border: '1px black solid'
    }

    if (results.length > 10) {
        return <div>Too many matches, specify another filter</div>
    } else if (results.length <= 0) {
        return <div>No entries found</div>
    } else {
        if (results.length === 1) {
            return (
                <>{
                    results.map(r =>
                        <div key={r.name.common}>
                            <h2>{r.name.common}</h2>
                            <div>capital {r.capital.map(c => c + " ")}</div>
                            <div>area {r.area}</div>
                            <h3>languages:</h3>
                            <ul>
                                {Object.values(r.languages).map((l, i) => <li key={i}>{l}</li>)}
                            </ul>
                            <img style={flagStyle} src={r.flags.png} alt={r.flags.alt} />
                        </div>
                    )
                }
                </>
            )
        } else {
            return (
                <>
                    {
                        results.map(r => <div key={r.name.common}>{r.name.common}</div>)
                    }
                </>
            )
        }

    }
}

export default Results