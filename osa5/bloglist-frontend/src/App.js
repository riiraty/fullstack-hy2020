import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll().then(blogs => {
        setBlogs( blogs )
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user =JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async ({ username, password }) => {
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      console.log(user)
      notifyWith('succesfully logged in!')
    } catch (exception) {
      notifyWith('wrong username or password', 'error')
    }
  }

  const handleLike = async ({ blog }) => {
    try {
      const id = blog.id
      const newLikes = (blog.likes + 1)

      const updatedBlog = {
        user: id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: newLikes
      }

      await blogService.update(id, updatedBlog)
      notifyWith(`you liked blog titled ${blog.title}!`)
      setBlogs(await blogService.getAll())
    } catch (exception) {
      notifyWith('something went wrong...', 'error')
    }
  }

  const handleRemove = async ({ blog }) => {
    try {
      console.log(blog.id)

      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        notifyWith('succesfully deleted the blog')
      }

    } catch (exception) {
      notifyWith('could not remove blog', 'error')
    }
  }

  const logout = async () => {
    window.localStorage.clear()
    setUser(null)
    notifyWith('refresh page to complete logout')
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    console.log('adding new blog...')
    try {
      const blog = await blogService.create(blogObject)
      console.log(blog)
      setBlogs(await blogService.getAll())
      notifyWith(`a new blog ${blog.title} by ${blog.author} was added`)
    } catch (exception) {
      notifyWith('something went wrong, blog not saved', 'error')
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm handleSubmit={handleLogin}/>
    </Togglable>
  )

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable buttonLabel='save new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification notification={notification} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in
            &nbsp;
            <button onClick={logout}>logout</button>
          </p>
          {blogForm()}
        </div>
      }

      <div id='bloglist'>
        {blogs.sort((a, b) => {
          return b.likes - a.likes
        }).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleLike={handleLike}
            handleRemove={handleRemove}
          />
        )}
      </div>

    </div>
  )
}

export default App