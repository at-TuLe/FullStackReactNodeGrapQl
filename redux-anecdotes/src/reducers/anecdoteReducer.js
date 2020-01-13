import anecdotesService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

const sortByVotes = (state) => {
  console.log(state)
  return state.sort((a, b) => (a.votes > b.votes) ? 1 : ((b.votes > a.votes) ? -1 : 0));
}

// const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      // return state.map(s => s.id !== action.id ? s : s.votes = s.votes + 1)
      // let updateAnecdote = state.find(s => s.id === action.data.id)
      // updateAnecdote.votes = updateAnecdote.votes + 1
      state = state.map(s => s.id !== action.data.id ? s : action.data)
      return sortByVotes(state)
    case 'NEW':
      // state.concat(asObject(action.data.content))
      // return sortByVotes(state)
      return state.concat(action.anecdote)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return sortByVotes(state)
  }
}

export const initialState = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const increaseVote = (anecdote) => {
  anecdote.votes = anecdote.votes + 1
  return async dispatch => {
    const votedAnecdote = await anecdotesService.update(anecdote.id, anecdote)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdotesService.createNew(content)
    dispatch({
      type: 'NEW',
      anecdote
    })
  }
}

export default reducer
