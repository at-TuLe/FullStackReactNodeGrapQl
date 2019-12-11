import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

const Result = ({ good, neutral, bad }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Good:</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral:</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad:</td>
            <td>{bad}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad
  let average = 0.00
  let positive = 0.00
  if (sum > 0) {
    average = (good - bad) / sum
    positive = good * 100 / sum
  }

  return (
    <div>
      <h1>Statistics</h1>
      {sum === 0
        ? (<p >No feedback given</p>)
        : (<div>
          <Result good={good} neutral={neutral} bad={bad} />
          <table>
            <tbody>
              <tr>
                <td>all:</td>
                <td>{sum}</td>
              </tr>
              <tr>
                <td>average:</td>
                <td>{average}</td>
              </tr>
              <tr>
                <td>positive:</td>
                <td>{positive} %</td>
              </tr>
            </tbody>
          </table>
        </div>)
      }
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedbacks</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
