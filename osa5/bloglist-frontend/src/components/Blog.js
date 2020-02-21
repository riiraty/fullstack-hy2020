import React, { useState } from 'react'

let saverId = null
let currentUserId = null

const Blog = ({ blog, user, handleLike, handleRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showAll, setShowAll] = useState(false)

  if (blog.user) {
    saverId = blog.user.id
  }
  if (user) {
    currentUserId = user.id
  }

  const like = (event) => {
    handleLike({ blog })
  }

  const remove = (event) => {
    handleRemove({ blog })
  }

  const wholeBlog = () => {
    return (
      <div style={blogStyle} className='blog'>
        {blog.title}
        &nbsp;
        <button onClick={() => setShowAll(false)}>
          hide</button> <br/>
        {blog.author} <br/>
        likes {blog.likes}
        &nbsp;
        <button onClick={like} className='likeButton'>
          like</button> <br/>
        {blog.url} <br/>
        {saverId === currentUserId ?
          removeButton : <p></p>}
      </div>
    )
  }

  const partialBlog = (
    <div style={blogStyle} className='blog'>
      {blog.title}
      &nbsp;
      <button onClick={() => setShowAll(true)} className='viewButton'>
        view</button>
    </div>
  )

  const removeButton = (
    <button onClick={remove}>remove</button>
  )

  return (
    (showAll) ? wholeBlog() : partialBlog
  )
}

export default Blog
