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

  const handleGoodClick = () =>{
    return setGood(good + 1)
  }

  const handleNeutralClick = () =>{
    return setNeutral(neutral + 1)
  }

  const handleBadClick = () =>{
    return setBad(bad + 1)
  }

  return (
    <div>
      <Header />
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <div>
        <h2>statistics</h2>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
      </div>
    </div>
  )
}

export default App