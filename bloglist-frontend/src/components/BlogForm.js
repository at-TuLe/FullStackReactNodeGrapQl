import React, { useState } from 'react'
import { useField } from '../hooks'

const BlogForm = ({ onAddNewBlog }) => {
  // const [newTitle, setNewTitle] = useState('')
  // const [newAuthor, setNewAuthor] = useState('')
  // const [newUrl, setNewUrl] = useState('')
  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')

  const submit = (event) => {
    event.preventDefault()
    if (!newTitle || !newAuthor) {
      alert('please enter name and number!')
    } else {
      const newBlog = {
        title: newTitle.value,
        author: newAuthor.value,
        url: newUrl.value
      }

      onAddNewBlog(newBlog)
      // setNewTitle('')
      // setNewAuthor('')
      // setNewUrl('')
      newTitle.reset()
      newAuthor.reset()
      newUrl.reset()
    }
  }

  // const handleChangeNewTitle = (event) => {
  //   setNewTitle(event.target.value)
  // }

  // const handleChangeNewAuthor = (event) => {
  //   setNewAuthor(event.target.value)
  // }

  // const handleChangeNewUrl = (event) => {
  //   setNewUrl(event.target.value)
  // }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Title: <input value={newTitle.value} onChange={newTitle.onChange} />
        </div>
        <div>
          Author: <input value={newAuthor.value} onChange={newAuthor.onChange} />
        </div>
        <div>
          URL: <input value={newUrl.value} onChange={newUrl.onChange} />
          {/* URL: <input {...newUrl} /> */}
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
