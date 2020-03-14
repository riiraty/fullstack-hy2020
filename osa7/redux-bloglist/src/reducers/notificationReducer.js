const notificationReducer = (state = null, action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'ERASE':
      return action.data
    default:
      //console.log(state)
      return state
  }
}

export const notify = (notification) => {
  console.log('notify: ', notification)
  return {
    type: 'SET_NOTIFICATION',
    data: notification,
  }
}

export const erase = () => {
  return {
    type: 'ERASE',
    data: null
  }
}

export default notificationReducer