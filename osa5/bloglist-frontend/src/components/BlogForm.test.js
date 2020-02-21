import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
//import { prettyDOM } from '@testing-library/dom'

test('<BlogForm /> ', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'testing input for title' }
  })
  fireEvent.change(author, {
    target: { value: 'Test Author' }
  })
  fireEvent.change(url, {
    target: { value: 'test.org' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls.length).toBe(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing input for title' )
  expect(createBlog.mock.calls[0][0].author).toBe('Test Author' )
  expect(createBlog.mock.calls[0][0].url).toBe('test.org' )

})