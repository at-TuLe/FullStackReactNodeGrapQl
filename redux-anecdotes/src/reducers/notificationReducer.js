const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NEW-NOTIFI':
      return action.message
    case 'REMOVE-NOTIFI':
      return null
    default:
      return state
  }
}

export const setNotification = (message) => {
  return {
    type: 'NEW-NOTIFI',
    message: message
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE-NOTIFI'
  }
}

export default notificationReducer
