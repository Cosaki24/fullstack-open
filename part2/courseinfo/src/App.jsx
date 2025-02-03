const Header = (props) => {
    return (
        <>
            <h1>{props.title}</h1>
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
    const part = parts.map((part, i) => <Part name={part.name} exercises={part.exercises} />)
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
            <>
                <Header title={course.name} />
                <Content parts={course.parts} />
            </>
        )
    })
    return (
        <>
        {course}
        </>
    )
}

const App = () => {
    const course = [{
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            },
            {
                name: 'Redux',
                exercises: 11,
                id: 4
            }
        ]
    },
    {
        name: 'Node.js',
        id: 2,
        parts: [
            {
                name: 'Routing',
                exercises: 3,
                id: 1
            },
            {
                name: 'Middlewares',
                exercises: 7,
                id: 2
            }
        ]
    }
    ]

    return <Course courses={course} />
}

export default App