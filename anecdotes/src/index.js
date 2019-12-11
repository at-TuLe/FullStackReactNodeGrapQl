import React, {useState} from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

const Votes = ({vote}) => {
  return (
    <div>
      has {vote} votes
    </div>
  )
}

const Anecdote = ({text, vote}) => {
  return (
    <div>
      <p>{text}</p>
      <Votes vote={vote} />
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVotes] = useState([0,0,0,0,0,0])
  const copy = [...vote]
  const [mostVoteIndex, setMostIndex] = useState(0)

  const increment = () => {
    copy[selected] += 1
    setVotes(copy);
    setMostIndex(copy.indexOf(Math.max(...copy)));
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={props.anecdotes[selected]} vote={copy[selected]}/>
      <button onClick={increment}>Vote</button>
      <button onClick={() => setSelected(selected - 1)}>Pre anecdote</button>
      <button onClick={() => setSelected(selected + 1)}>Next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <Anecdote text={props.anecdotes[mostVoteIndex]} vote={copy[mostVoteIndex]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
