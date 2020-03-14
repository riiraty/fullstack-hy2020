import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux' 
import './index.css'
import App from './App'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: userReducer
})

const store = createStore(reducer)
// console.log(store.getState())
// store.dispatch({type: 'SET_NOTIFICATION', data: {message: 'test', type: 'error'}})
// console.log(store.getState())


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))