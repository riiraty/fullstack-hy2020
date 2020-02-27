import React from 'react'
import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { notify, erase } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const notifyWith = (message) => {
    dispatch(notify(message))
    setTimeout(() => {
      dispatch(erase())
    }, 5000)
  }

  const addNew = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(create(content))
    notifyWith('new anecdote added!')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm