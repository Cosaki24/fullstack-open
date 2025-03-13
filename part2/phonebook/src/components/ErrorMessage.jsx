const ErrorMessage = ({errorMessage}) => {
    const style = {
        color: "white",
        backgroundColor: "red",
        maxWidth: "500px",
        border: 0
    }

    return (
        <div className={errorMessage} style={style}>{errorMessage}</div>
    )
}

export default ErrorMessage