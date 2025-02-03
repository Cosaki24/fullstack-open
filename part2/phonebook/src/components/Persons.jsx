const Person = (props) => {
    return (
        <>
        <div>{props.name} {props.number}</div>
        </>
    )
}

const Persons = (props) => {
    const people = props.people
    return(
        <>
            {
                people.map((person) => <Person key={person.name} name={person.name} number={person.number} />)
            } 
        </>
             
    )
}

export default Persons