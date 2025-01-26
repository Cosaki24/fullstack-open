import { useState } from 'react'

const Header = () => {
  return (
    <>
      <h1>give feedback</h1>
    </>
  )
}

const Statistics = (props) => {
  if(props.allStats > 0){
    return (
      <div>
        <h1>statistics</h1>
        <div>good {props.good}</div>
        <div>neutral {props.neutral}</div>
        <div>bad {props.bad}</div>
        <div>all {props.allStats}</div>
        <div>average {props.allStats != 0 ? (props.average / props.allStats) : 0}</div>
        <div>positive {props.allStats != 0 ? (props.good / props.allStats) * 100 : 0} %</div>
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
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
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