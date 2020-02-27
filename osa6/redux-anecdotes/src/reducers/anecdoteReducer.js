import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW':
      return [...state, action.data]
    case 'INIT':
      return action.data
    case 'VOTE':
      const id = action.data.id
      const anecToChange = state.find(a => a.id === id)
      const updated = {
        ...anecToChange,
        votes: anecToChange.votes + 1
      }
      return state.map(anec =>
        anec.id !== id ? anec : updated
      )
    default:
      return state
  }
}

export const create = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW',
      data: newAnecdote,
    })
  }
}

export const initialize = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes,
    })
  }
}

export const voteFor = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default reducer