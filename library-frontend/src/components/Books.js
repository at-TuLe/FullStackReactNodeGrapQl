import React from 'react'
// import { useApolloClient } from '@apollo/react-hooks'


const Books = (props) => {
  if (!props.show) {
    return null
  }
  if (props.books.loading) {
    return <div>loading...</div>
  }
  // const client = useApolloClient()
  console.log(props.books)

  const books = props.books.data.allBooks
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books