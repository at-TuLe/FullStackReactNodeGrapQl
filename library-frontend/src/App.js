import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'


const ALL_BOOKS = gql`
{
  allBooks  {
    title
    author {
      name
    }
    published
  }
}
`
const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
const ADD_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      genres
      published
      id
      author {
        name
      }
    }
  }
`
const UPDATE_AUTHOR_BIRTHDAY = gql`
  mutation updateAuthor($name: String!, $setBornTo: Int) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
    }
  }
`
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
const BOOK_ADDED = gql`
  subscription BookAdded {
    bookAdded {
      title
      published
      genres
      author {
        name
      }
    }
  }
`
const App = (props) => {
  const [page, setPage] = useState('books')
  const [errorMessage, setErrorMessage] = useState(null)
  const results_all_books = useQuery(ALL_BOOKS)
  const results_all_authors = useQuery(ALL_AUTHORS)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('library-user-token')
    if (loggedUserJSON) {
      setToken(loggedUserJSON)
    }
  }, [])

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }


  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      alert(`${addedBook.title} added`)
    }
  })

  const [addBook] = useMutation(ADD_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })

  const [editAuthor] = useMutation(UPDATE_AUTHOR_BIRTHDAY, {
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    // client.resetStore()
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        
        {!token
        ? <button onClick={() => setPage('login')}>login</button>
        : <div>
            <button onClick={logout}>log out</button>
            <button onClick={() => setPage('add')}>add book</button>
          </div>
        }
      </div>
      {errorMessage &&
        <div style={{ color: 'red' }}>
          {errorMessage}
        </div>
      }
      <Authors
        show={page === 'authors'}
        authors={results_all_authors}
        onEditAuthor={editAuthor}
      />

      <Books
        show={page === 'books'}
        books={results_all_books}
      />

      <NewBook
        show={page === 'add'}
        onCreateBook={addBook}
      />

      <LoginForm
        show={page === 'login'}
        login={login}
        setToken={(token) => setToken(token)}
        setBooksPage={() => setPage('books')}
      />
    </div>
  )
}

export default App