const notificationReducer = (state = '', action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'ERASE':
      return ''
    default:
      console.log(state)
      return state
  }
}

export const notify = notification => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
  }
}

export const erase = () => {
  return {
    type: 'ERASE',
    data: ''
  }
}

export default notificationReducer