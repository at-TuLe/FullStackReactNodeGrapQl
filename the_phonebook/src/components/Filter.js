import React from 'react'

const Filter = ({searchWord, handleFilter}) => {
  return (
    <div>
      Filter with: <input value={searchWord} onChange={handleFilter}/>
    </div>
  )
}

export default Filter;
