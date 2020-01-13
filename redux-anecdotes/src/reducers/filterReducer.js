const filterReducer = (state = '', action) => {
    switch (action.type) {
      case 'NEW-FILTER':
        return action.message
      case 'REMOVE-FILTER':
        return ''
      default:
        return state
    }
  }
  
  export const setFilter = (message) => {
    return {
      type: 'NEW-FILTER',
      message: message
    }
  }
  
  export const removeFilter = () => {
    return {
      type: 'REMOVE-FILTER'
    }
  }
  
  export default filterReducer
  