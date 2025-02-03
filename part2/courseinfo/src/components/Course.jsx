const Header = (props) => {
    return (
        <>
            <h2>{props.title}</h2>
        </>
    )
}

const Part = (props) => {
    return (
        <>
            <p>{props.name} {props.exercises}</p>
        </>
    )
}

const Content = (props) => {
    const { parts } = props
    const part = parts.map((part, i) => <Part key={i} name={part.name} exercises={part.exercises} />)
    const total = parts.reduce((acc, curr) => acc += curr.exercises, 0)

    return (
        <>
            {part}
            <h4>total of {total} exercises</h4>
        </>
    )
}

const Course = (props) => {
    const { courses } = props;
    const course = courses.map((course, i) => {
        return (
            <div key={i} >
                <Header title={course.name} />
                <Content parts={course.parts} />
            </div>
                
        )
    })
    return (
        <>
            {course}
        </>
    )
}

export default Course