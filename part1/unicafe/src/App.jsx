import { useState } from 'react'

const Header = () => {
  return (
    <>
      <h1>give feedback</h1>
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
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <div>
        <h1>statistics</h1>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
        <div>all {allStats}</div>
        <div>average {allStats != 0 ? (average / allStats) : 0}</div>
        <div>positive {allStats != 0 ? (good / allStats) * 100 : 0} %</div>
      </div>
    </div>
  )
}

export default App