import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import notificationReducer, { notify, erase } from './reducers/notificationReducer'
//import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import './App.css'
import { Table, Form, Button } from 'react-bootstrap'

import { initialize, create, like, comment, remove } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'

import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams
} from "react-router-dom"

const User = ({ users, blogs }) => {
  const id = useParams().id
  const user = users.find(u => u.id === String(id))
  console.log(blogs)
  const usersBlogs = blogs.filter(b => b.user.id === String(id))
  console.log(usersBlogs)
  if(!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>blogs added by user</h3>
      <ul>
        {usersBlogs.map(blog => 
          <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

const Blog = ({ blogs, handleLike, handleComment }) => {
  const [comment, setComment] = useState('')

  const id = useParams().id
  const blog = blogs.find(b => b.id === String(id))
  //const comments = blogs.find(b => b.id === String(id)).comments
  //let comments = blog ? blog.comments : null
  //console.log('comments:', comments)

  console.log('blog, ', blog)

  const like = () => {
    handleLike({ blog })
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const commentBlog = (comment) => {
    console.log(comment)
    const newComments = blog.comments.concat(comment.comment)
    const updated = {
      ...blog,
      comments: newComments
    }
    console.log('updated after comment: ', updated)
    handleComment(updated)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    commentBlog({ comment })

    setComment('')
  }

  if(!blog) {
    return null
  }

  if (!blog.comments) {
    window.location.reload()
    //return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a> <br/>
        {blog.likes} likes <Button variant='warning' onClick={like}>like</Button> <br/>
        added by {blog.user.username} <br/>
        <h4>comments</h4>
        <Form onSubmit={onSubmit}>
          <Form.Group>
          <Form.Control
            type='text'
            name='comment'
            onChange={handleCommentChange}
          />
          <Button variant='primary' name='comment-button' type="submit">add comment</Button>
          </Form.Group>
        </Form>
        <ul>
        {blog.comments.map(comment => 
          <li key={comment}>{comment}</li>)}
        </ul>
      </div>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()

  //const [blogs, setBlogs] = useState([])
  const blogs = useSelector(state => state.blogs)
  //const [notification, setNotification] = useState(null)
  //const [user, setUser] = useState(null)
  const user = useSelector(state => state.user)
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService
      .getAll().then(users => {
        setUsers( users )
      })
  }, [])

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
        likes: newLikes,
        comments: blog.comments
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

  const handleComment = async (withNewComment) => {
    console.log(withNewComment)
    try{
      const id = withNewComment.id
      await blogService.comment(id, withNewComment)
      dispatch(comment(withNewComment))
      notifyWith('you added a comment')
    } catch (exception) {
      notifyWith('could not comment', 'error')
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

  const bloglist = () => {
    return (
      <div id='bloglist'>
        <Table striped>
          <tbody>
            {blogs.sort((a, b) => {
              return b.likes - a.likes
            }).map(blog =>
              <tr kery={notificationReducer.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </tr>
              //<Blog blog={blog} />
              // <Blog
              //   key={blog.id}
              //   blog={blog}
              //   user={user}
              //   handleLike={handleLike}
              //   handleRemove={handleRemove}
              // />
            )}
          </tbody>
        </Table>
      </div>
    )
  }

  const userlist = () => {
    return (
      <div>
        <h2>Users</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
            {users.map(user => 
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }

  const padding = { padding: 5 }

  return (
    <div className="container">
    <Router>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user === null ? null : <em>{user.name} logged in </em>}
        {user === null ? loginForm() : <Button variant='secondary' onClick={handleLogout}>logout</Button>}
      </div>

      <h1>Blog-app</h1>
      <Notification />



      <Switch>
        <Route path="/users/:id">
          <User users={users} blogs={blogs}/>
        </Route>
        <Route path="/users">
          {userlist()}
        </Route>
        <Route path="/blogs/:id">
          <Blog blogs={blogs} handleLike={handleLike} handleComment={handleComment}/>
        </Route>
        <Route path="/">
          {blogForm()}
          {bloglist()}
        </Route>
      </Switch>
     

      {/* <div id='bloglist'>
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
      </div> */}

    </Router>
    </div>
  )
}

export default App