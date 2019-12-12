import React from 'react';
import Part from './Part';

const Content = ({parts}) => {
  const total = parts.reduce( (sum, part) => {
    return sum + part.exercises
  }, 0)

  return (
    <div>
      {
        parts.map(part => 
          <Part part={part} />
        )
      }
      <h3>Total of {total} exercises</h3>
    </div>
  )
}

export default Content;
