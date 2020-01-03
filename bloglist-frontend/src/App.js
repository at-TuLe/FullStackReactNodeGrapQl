import React, { useState, useEffect } from 'react'
import Login from './components/login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'


function App() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  // const [ errorMessage, setErrorMessage ] = useState(null)
  const BlogFormRef = React.createRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedPersonAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      getBlogs()
    }
  }, [])

  const handleLogin = (user) => {
    console.log(user)
    setUser(user)
    getBlogs()
  }

  const getBlogs = async () => {
    const data = await blogService.getAll()
    setBlogs(data)
    // sortBlogsById()
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedPersonAppUser')
    setUser(null)
  }

  const addBlog = (newBlog) => {
    blogService.create(newBlog).then(() => {
      BlogFormRef.current.toggleVisibility()
      getBlogs()
    }).catch(error => {
      console.log(error)
    })
  }

  const handleUpdateBlog = async (updatedblog) => {
    // let copyBlogs = [...blogs]
    // copyBlogs.forEach(blog => {
    //   if(blog.id === updatedblog.id) {
    //     blog.likes = updatedblog.likes
    //   }
    // })
    // setBlogs(copyBlogs)

    await setBlogs(blogs.map(b => b.id !== updatedblog.id ? b : updatedblog))
    // sortBlogsById()
    // let index = blogs.findIndex(blog => blog.id === updatedblog.id)
    // blogs[index] = updatedblog

    // setBlogs([...blogs])
  }

  const hadleDeleteBlog = async (deleteblog) => {
    await blogService.remove(deleteblog.id)
    await setBlogs(blogs.filter(b => b.id !== deleteblog.id))
  }

  // const sortBlogsById = () => {
  //   setBlogs(blogs.sort((a,b) => (a.likes > b.likes) ? 1 : ((b.likes > a.likes) ? -1 : 0)))
  // }

  return (
    <div className="App">
      {user === null
        ? (
          <Toggleable buttonLabel="Login">
            <Login onSetUser={handleLogin} />
          </Toggleable>
        )
        : (
          <div>
            {`${user.name} logged in.`}<button onClick={logOut}>Logout</button>
            <h1>Blogs</h1>
            <Toggleable buttonLabel="Add New Blog" ref={BlogFormRef}>
              <BlogForm onAddNewBlog={addBlog} />
            </Toggleable>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} onUpdateBlog={handleUpdateBlog} onDeleteBlog={hadleDeleteBlog} user={user}/>
            )}
          </div>
        )
      }

    </div>
  )
}

export default App
