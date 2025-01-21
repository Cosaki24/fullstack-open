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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header title={course} />
      <Content 
        pt1 = {part1}
        ex1 = {exercises1}
        pt2 = {part2}
        ex2 = {exercises2}
        pt3 = {part3}
        ex3 = {exercises3}
      />
      <Total 
        first={exercises1}
        second={exercises2}
        third={exercises3}
      />
    </div>
  )
}

export default App