import React from 'react';

const Countries = ({countries, onShowDetail}) => { 
  return (
    <div>
      {
        countries.map(country => 
          (
            <div key={country.alpha2Code}>
              {country.name}
              <button onClick={() => onShowDetail(country.name)}>Show</button>
            </div>
          )
        )
      }
    </div>
  )
}

export default Countries;
