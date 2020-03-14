//import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW':
      return [...state, action.data]
    case 'INIT':
      return action.data
    case 'LIKE':
      console.log('action data: ', action.data)
      const id = action.data.id
      return state.map(blog => 
        blog.id !== id ? blog : action.data
      )
    case 'DELETE':
      console.log('delete this: ', action.data)
      return state.filter(blog => blog.id !== action.data.id)
    default:
      return state
  }
}

export const initialize = (blogs) => {
  return {
    type: 'INIT',
    data: blogs,
  }
  // return async dispatch => {
  //   const blogs = await blogService.getAll()
  //   dispatch({
  //     type: 'INIT',
  //     data: blogs,
  //   })
  // }
}

export const create = (blog) => {
  return {
    type: 'NEW',
    data: blog,
  }
}

export const like = (updatedBlog) => {
  return {
    type: 'LIKE',
    data: updatedBlog,
  }
}

export const remove = (removable) => {
  return {
    type: 'DELETE',
    data: removable
  }
}

export default blogReducer