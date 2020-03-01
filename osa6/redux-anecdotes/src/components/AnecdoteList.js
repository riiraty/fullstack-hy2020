import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({anecdotes, filter}) => {
    if (filter === '') {
      return anecdotes
    } else {
      return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    }

  })

  const vote = (anecdote) => {
    const id = anecdote.id
    console.log('vote', id)
    dispatch(voteFor(anecdote))
    dispatch(notify(`you voted '${anecdote.content}'`, 7))
    
  }

  return (
    <div>
    {anecdotes.sort((a, b) => {
      return b.votes - a.votes
    }).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList