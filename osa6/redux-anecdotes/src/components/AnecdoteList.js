import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { notify, erase } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

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

  const vote = async (id) => {
    console.log('vote', id)
    const anecdote = anecdotes.find(a => a.id === id)
    const afterVote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    await anecdoteService.update(afterVote)
    dispatch(voteFor(id))
    notifyWith(`you voted '${anecdote.content}'`)
    
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