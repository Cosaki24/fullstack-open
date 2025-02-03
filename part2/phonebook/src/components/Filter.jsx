const Filter = (props) => {
    return (
        <>
            <p>
                filter shown with <input value={props.keyword} onChange={props.handleFilter} />
            </p>
        </>
    )
}

export default Filter