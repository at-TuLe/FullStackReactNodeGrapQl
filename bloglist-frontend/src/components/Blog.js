import React, { useState } from 'react'
import blogsService from '../services/blogs'

const Blog = ({ blog, onUpdateBlog, onDeleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginTop: 5
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = async () => {
    const updateBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    const updatedBlog = await blogsService.update(blog.id, updateBlog)
    onUpdateBlog(updatedBlog)
  }
  return (
    <div style={blogStyle}>
      <h1 onClick={toggleVisibility}>{blog.title}</h1>
      <div style={showWhenVisible}>
        <a href="/">{blog.url}</a><br />
        {`${blog.likes} likes `}<button onClick={addLike}>like</button>
        <p>Added by {blog.user.name}</p>
        {user && user.username === blog.user.username && <button onClick={() => onDeleteBlog(blog)}>Remove</button>}
      </div>
    </div>
  )
}

export default Blog
