import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

const Header = () => {
  const course = 'Half Stack application development'
  return (
    <>
      <h1>{course}</h1>
    </>
  );
}

const Content = () => {
  const part1 = 'Fundamentals of React'
  const part2 = 'Using props to pass data'
  const part3 = 'State of a component'
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14

  return (
    <>
      <Part title={part1} exercises={exercises1} />
      <Part title={part2} exercises={exercises2} />
      <Part title={part3} exercises={exercises3} />
    </>
  );
}

const Total = () => {
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14

  return (
    <>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </>
  );
}

const Part = ({title, exercises}) => {
  return (
    <p>
      {title} {exercises}
    </p>
  )
}

const Counter = (props) => {
  const [ counter, setCounter ] = useState(0)

  const handleClick = () => {
    setCounter(counter + 1)
  }

  const setToValue = (value) => setCounter(value)

  // setTimeout(
  //   () => setCounter(counter + 1),
  //   1000
  // )

  return (
    <div>
      <p>Counter: {counter}</p>
      <button onClick={handleClick}>
        Plus
      </button>
      <Button
        onClick={() => setToValue(counter - 1)}
        text='minus'
      />
      <button onClick={() => setCounter(0)}> 
        zero
      </button>
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const LeftRight = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      <div>
        {left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {right}
        <p>{allClicks.join('-')}</p>
      </div>
    </div>
  )
}

const App = () => {  
  return (
    <>
      <Header />
      <Content />
      <Total />
      <Counter />
      <LeftRight />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
