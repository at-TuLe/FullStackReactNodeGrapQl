import React from 'react';
import { increaseVote } from '../reducers/anecdoteReducer';
import { setNotification, removeNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  // const filter = props.filter
  // const anecdotes = props.anecdotes

const vote = (anecdote) => {
  props.increaseVote(anecdote)
  props.setNotification('you voted!')
  setTimeout(() => {
    props.removeNotification()
  }, 3000)
}

return (
  <div>
    {
      props.visibleanecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )
    }
  </div>
)
}

const anecdotesCanShow = (state) => {
  return state.anecdotes.filter(anec => anec.content.includes(state.filter))
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    visibleanecdotes: anecdotesCanShow(state)
  }
}

const mapDispatchToProps = {
  setNotification,
  removeNotification,
  increaseVote
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
