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
    const {parts} = props
    const part = parts.map((part, i) => <Part name={part.name} exercises={part.exercises}/>)
    const total = (arr) => {
        let sum = 0
        for(let i = 0; i < arr.length; i++){
            sum += arr[i].exercises;
        }
        return sum
    }

    return (
        <>
        {part}
        <h4>total of {total(parts)} exercises</h4>
        </>
        
    )
}

const Course = (props) => {
    const {course} = props;
    return (
            <>
                <Header title={course.name} />
                <Content parts={course.parts} />
            </>
        
    )
}

const App = () => {
    const course = {
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
    }

    return <Course course={course} />
}

export default App