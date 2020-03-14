const userReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET':
      console.log('SET logged in user')
      console.log(state)
      return action.data
  case 'UNSET':
      return action.data
    default:
      return state
  }
}

export const login = (user) => {
  return {
    type: 'SET',
    data: user
  }
}

export const logout = () => {
  return {
    type: 'UNSET',
    data: null
  }
}

export default userReducer