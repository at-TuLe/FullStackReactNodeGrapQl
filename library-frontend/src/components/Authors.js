import React, { useState } from 'react'
import Select from 'react-select'

// import { useQuery } from '@apollo/react-hooks'
// import { gql } from 'apollo-boost'

// const ALL_AUTHORS = gql`
//   {
//     allAuthors {
//       name
//       born
//       bookCount
//     }
//   }
// `
const Authors = (props) => {
  // const results = useQuery(ALL_AUTHORS)
  // const [nameEdit, setNameEdit] = useState('')
  const [born, setBorn] = useState('')
  const [selected, setSelected] = useState(null)
  if (!props.show) {
    return null
  }

  if (props.authors.loading) {
    return <div>loading...</div>
  }
  // const client = useApolloClient()
  const authors = props.authors.data.allAuthors

  const editAuthor = async (e) => {
    e.preventDefault()
    await props.onEditAuthor({
      variables: { name: selected.value, setBornTo: Number(born)}
    })
    // setNameEdit('')
    // setBorn('')
  }

  // const setAuthorEdit = (author) => {
  //   console.log(author)
  //   setNameEdit(author.name)
  //   setBorn(author.born || '')
  // }

  const options = authors.map( a => {
    return {value: a.name, label: a.name}
  })

  const handleSelectChange = (selected) => {
    setSelected(selected)
    const author = authors.find(a => a.name === selected.value)
    setBorn(author.born || '')
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(author =>
            // <tr key={author.name} onClick={() => setAuthorEdit(author)}>
            <tr key={author.name}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* {!!nameEdit && */}
        <form onSubmit={editAuthor}>
          <div>
            Name:
            {/* <input value={nameEdit} onChange={({ target }) => setNameEdit(target.value)}/> */}
            <Select
              value={selected}
              onChange={handleSelectChange}
              options={options}
            />
          </div>
          <div>
            Born:
            <input value={born} onChange={({ target }) => setBorn(target.value)}/>
          </div>
          <button type='submit'>Update</button>
        </form>

    </div>
  )
}

export default Authors