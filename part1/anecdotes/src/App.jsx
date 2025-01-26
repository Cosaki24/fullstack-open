import {useState} from 'react'

const Anecdote = (props) => {
  return (
    <>
      <h1>{props.title}</h1>
      <div>{props.anecdote}</div>
      <div>has {props.votes} votes</div>
    </>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.action}>{props.text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const votes = new Array(anecdotes.length).fill(0)

  const [selected, setSelected] = useState(0)
  const [voteCount, setVoteCount] = useState(votes)
  const [mostVoted, setMostVoted] = useState(0)
  

  const chooseRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const addVote = () => {
    const copy = [...voteCount]
    copy[selected] += 1
    setMostVoted(maxIndex(copy))
    setVoteCount(copy)
  }

  // find the index of a max item in an array
  const maxIndex = (arr) => {
    const maxValue = Math.max(...arr)
    return arr.indexOf(maxValue)
  }

  return (
    <>
      <Anecdote title="Anecdote of the day" anecdote={anecdotes[selected]} votes={voteCount[selected]} />
      <Button action={addVote} text="vote" />
      <Button action={chooseRandomAnecdote} text="next anecdote" />
      <Anecdote title="Anecdote with most votes" anecdote={anecdotes[mostVoted]} votes={voteCount[mostVoted]}  />
    </>
  )
    
}

export default App