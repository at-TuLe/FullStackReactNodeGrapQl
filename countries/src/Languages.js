import React from 'react';

const Languages = ({languages}) => {

  return (
    <div>
      <h3>Languages</h3>
      <ul>
        {
          languages.map(language => 
              <li key={language.iso639_1}>{language.name}</li>
          )
        }
      </ul>
    </div>
  )
}

export default Languages;
