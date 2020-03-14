import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  console.log(useSelector(state => state))
  const notification = useSelector(state => state.notification)
  console.log(notification)
  if (notification === null) {
    return null
  }

  return (
    <div className={notification.type}>
      {notification.message}
    </div>
  )
}

export default Notification