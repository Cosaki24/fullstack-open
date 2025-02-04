const Person = (props) => {
    return (
        <>
        <div>{props.name} {props.number} <button onClick={props.handleDelete}>delete</button></div>
        </>
    )
}

const Persons = (props) => {
    const people = props.people
    const deleteContact = props.handleDelete
    return(
        <>
            {
                people.map((person) => <Person key={person.name} name={person.name} number={person.number} handleDelete={() => deleteContact(person.id)}/>)
            } 
        </>
             
    )
}

export default Persons