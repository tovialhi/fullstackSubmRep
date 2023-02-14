import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateNewForm from './components/CreateNewForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [createNewVisible, setCreateNewVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const getBlogsByUsername = (username) => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs.filter(blog => blog.user.username === username))
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      getBlogsByUsername(username)

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    blogService.setToken(null)
    setBlogs([])
  }

  const handleCreateNewBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title, author, url
    }

    try {
      const res = await blogService.create(blog)

      setErrorMessage(`a new blog ${res.title} by ${res.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')

      getBlogsByUsername(user.username)

    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification message={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogForm = () => {
    const hideWhenVisible = { display: createNewVisible ? 'none' : '' }
    const showWhenVisible = { display: createNewVisible ? '' : 'none' }

    return (
      <div>
        <h2>blogs</h2>
        <Notification message={errorMessage} />
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

        <div style={hideWhenVisible}>
          <button onClick={() => setCreateNewVisible(true)}>new blog</button>
        </div>

        <div style={showWhenVisible}>
          <CreateNewForm
            title={title}
            author={author}
            url={url}
            handleSubmit={handleCreateNewBlog}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
          />
          <button onClick={() => setCreateNewVisible(false)}>cancel</button>
        </div>

        {blogs.sort((a,b) => b.likes-a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove}/>
        )}
      </div>
    )}

  const handleLike = async (blog) => {
    const newBlog = {
      id: blog.id,
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url }
    try {
      await blogService.put(newBlog)

      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(blog.id)
        setErrorMessage(`Blog ${blog.title} by ${blog.author} deleted`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )
      } catch (error) {
        setErrorMessage(error.message)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }



  return (
    <>
      {!user && loginForm()}
      {user && blogForm()}
    </>
  )


}

export default App