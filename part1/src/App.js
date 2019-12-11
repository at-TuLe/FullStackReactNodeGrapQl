import React from 'react';
import logo from './logo.svg';
import './App.css';

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  );
}

const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  return (
    <>
      <h1>Greetings</h1>
      <Hello name="George" />
      <Hello name="Daisy" />
      <Footer />
    </>
  );
}

const Footer = () => {
  return (
    <div>
      greeting app created by 
      <a href="https://github.com/mluukkai">mluukkai</a>
    </div>
  )
}

export default App;
