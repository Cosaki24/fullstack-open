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
      <p>{props.part} {props.exercise}</p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.pt1} exercise={props.ex1} />
      <Part part={props.pt2} exercise={props.ex2} />
      <Part part={props.pt3} exercise={props.ex3} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.first + props.second + props.third}</p>
    </>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }

  const part2 = {
    name: "Using props to pass data",
    exercises: 7

  }

  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header title={course} />
      <Content 
        pt1 = {part1.name}
        ex1 = {part1.exercises}
        pt2 = {part2.name}
        ex2 = {part2.exercises}
        pt3 = {part3.name}
        ex3 = {part3.exercises}
      />
      <Total 
        first={part1.exercises}
        second={part2.exercises}
        third={part3.exercises}
      />
    </div>
  )
}

export default App