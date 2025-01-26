import { useState } from 'react'

// Header component
const Header = () => {
  return (
    <>
      <h1>give feedback</h1>
    </>
  )
}

// StatisticLine component to display individual stat
const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

// Statistics component to wrap all stats into a single component
const Statistics = (props) => {
  if(props.allStats > 0){
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.allStats} />
          <StatisticLine text="average" value={props.allStats != 0 ? (props.average / props.allStats) : 0} />
          <StatisticLine text="positive" value={`${props.allStats != 0 ? (props.good / props.allStats) * 100 : 0} %`} />
        </table>        
      </div>
    )
  }else{
    return(
      <div>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </div>
    )
  }  
}

// Button component
const Button = (props) => {
  return (
    <>
      <button onClick={props.action}>{props.feedback}</button>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allStats, setAllStats] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGoodClick = () =>{
    setAllStats(allStats + 1)
    setAverage(average + 1)  
    setGood(good + 1)
  }

  const handleNeutralClick = () =>{
    setAllStats(allStats + 1)
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAllStats(allStats + 1)
    setAverage(average - 1)
    setBad(bad + 1)
  }

  return (
    <div>
      <Header />
      <Button action={handleGoodClick} feedback="good" />
      <Button action={handleNeutralClick} feedback="neutral" />
      <Button action={handleBadClick} feedback="bad" />
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        average={average}
        allStats={allStats}
      />
    </div>
  )
}

export default App