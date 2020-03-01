const notificationReducer = (state = '', action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'ERASE':
      return action.notification
    default:
      console.log(state)
      return state
  }
}

export const notify = (notification, timeout) => {
  return async dispatch => {
    await dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    })
    setTimeout(() => {
      dispatch(erase())
    }, timeout * 1000)
  }
}

export const erase = () => {
  return {
    type: 'ERASE',
    notification: ''
  }
}

export default notificationReducer