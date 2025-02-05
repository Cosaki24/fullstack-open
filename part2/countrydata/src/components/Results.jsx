import CountryDetails from "./CountryDetails"

const Results = ({ results, showCountry }) => {
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
                            <CountryDetails detail={r} />
                        </div>
                    )
                }
                </>
            )
        } else {
            return (
                <>
                    {
                        results.map(r => <div key={r.name.common}>{r.name.common} <button onClick={() => showCountry(r)}>show</button></div>)
                    }
                </>
            )
        }

    }
}

export default Results