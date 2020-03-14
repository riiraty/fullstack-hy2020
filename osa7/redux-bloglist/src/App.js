import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notify, erase } from './reducers/notificationReducer'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { initialize, create, like, remove } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'

// import {
//   BrowserRouter as Router,
//   Switch, Route, Link
// } from "react-router-dom"

// const Home = () => (
//   <div> <h2>This is homepage</h2> </div>
// )

// const Bloglist = () => (
//   <div><h2>List of blogs</h2></div>
// )

// const Users = () => (
//   <div> <h2>Users</h2> </div>
// )

const App = () => {
  const dispatch = useDispatch()

  //const [blogs, setBlogs] = useState([])
  const blogs = useSelector(state => state.blogs)
  //const [notification, setNotification] = useState(null)
  //const [user, setUser] = useState(null)
  const user = useSelector(state => state.user)

  // useEffect(() => {
  //   blogService
  //     .getAll().then(blogs => {
  //       setBlogs( blogs )
  //     })
  // }, [])
  useEffect(() => {
    blogService
      .getAll().then(blogs => dispatch(initialize(blogs)))
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user =JSON.parse(loggedUserJSON)
      dispatch(login(user))
      //setUser(user)
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const notifyWith = (message, type='success') => {
    dispatch(notify({ message, type }))
    setTimeout(() => {
      dispatch(erase())
    }, 5000)
    // setNotification({ message, type })
    // setTimeout(() => {
    //   setNotification(null)
    // }, 5000)
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
      dispatch(login(user))
      //setUser(user)
      console.log(user)
      notifyWith('succesfully logged in!')
    } catch (exception) {
      notifyWith('wrong username or password', 'error')
    }
  }

  const handleLike = async ({ blog }) => {
    console.log(blog)
    try {
      const id = blog.id
      const newLikes = (blog.likes + 1)

      const updatedBlog = {
        id: id,
        user: blog.user.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: newLikes
      }
      console.log('updatedBlog: ', updatedBlog)
      await blogService.update(id, updatedBlog)
      dispatch(like(updatedBlog))
      notifyWith(`you liked blog titled ${blog.title}!`)
      //setBlogs(await blogService.getAll())
    } catch (exception) {
      notifyWith('something went wrong...', 'error')
    }
  }

  const handleRemove = async ({ blog }) => {
    try {
      console.log(blog.id)

      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        await blogService.remove(blog.id)
        dispatch(remove(blog))
        //setBlogs(blogs.filter(b => b.id !== blog.id))
        notifyWith('succesfully deleted the blog')
      }

    } catch (exception) {
      notifyWith('could not remove blog', 'error')
    }
  }

  const handleLogout = async () => {
    window.localStorage.clear()
    dispatch(logout())
    //setUser(null)
    notifyWith('You logged out')
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    console.log('adding new blog...')
    try {
      const blog = await blogService.create(blogObject)
      console.log(blog)
      dispatch(create(blog))
      //setBlogs(await blogService.getAll())
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

  const padding = { padding: 5 }

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification />

      {/* <Router>
        <div>
          <Link ></Link>
        </div>

      </Router> */}

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in
            &nbsp;
            <button onClick={handleLogout}>logout</button>
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