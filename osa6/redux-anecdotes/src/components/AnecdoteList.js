import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { notify, erase } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({anecdotes, filter}) => {
    if (filter === '') {
      return anecdotes
    } else {
      return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    }

  })

  const notifyWith = (message) => {
    dispatch(notify(message))
    setTimeout(() => {
      dispatch(erase())
    }, 5000)
  }

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteFor(id))
    const anecdote = anecdotes.filter(a => a.id === id)
    notifyWith(`you voted '${anecdote[0].content}'`)
    
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
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList