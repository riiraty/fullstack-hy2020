import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW':
      return [...state, action.data]
    case 'INIT':
      return action.data
    case 'VOTE':
      const id = action.data.id
      return state.map(anec =>
        anec.id !== id ? anec : action.data
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

export const voteFor = (anecdote) => {
  const afterVote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  return async dispatch => {
    const updated = await anecdoteService.update(afterVote)
    dispatch({
      type: 'VOTE',
      data: updated,
    })
  }
}

export default reducer