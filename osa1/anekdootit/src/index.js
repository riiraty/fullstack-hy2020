import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Best = ({votes, anecdotes}) => {
    var max = Math.max(...votes)
    for (let i = 0; 1 < 6; i++) {
        if (votes[i] === max) {
            return (
                <>
                  {anecdotes[i]} <br/>
                  has {votes[i]} votes
                </>
            )
        }
    }
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(6).fill(0))

  const handleClick = () => {
      setSelected(Math.round(Math.random() * 5))
  }

  const handleVote = () => {
      let newVotes = votes.concat()
      newVotes[selected] += 1
      setVotes(newVotes)
  }

  return (
    <>
    <h1>Anecdote of the day</h1>  
    <div>
      {props.anecdotes[selected]} <br/>
      has {votes[selected]} votes <br/>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
    </div>
    <h1>Anecdote with most votes</h1>
    <div>
      <Best votes={votes} anecdotes={anecdotes} />
    </div>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
