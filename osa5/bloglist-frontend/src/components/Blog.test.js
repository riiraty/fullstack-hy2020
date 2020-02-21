import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const mockLiker = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'title for testing',
      author: 'Test Author',
      url: 'test.org'
    }
    component = render(
      <Blog blog={blog} handleLike={mockLiker} />
    )
  })
  test('renders title', () => {
    expect(component.container).toHaveTextContent(
      'title for testing'
    )
  })

  test('does not render author or url or likes before button click', () => {
    expect(component.container).not.toHaveTextContent(
      'Test Author'
    )
    expect(component.container).not.toHaveTextContent(
      'test.org'
    )
    expect(component.container).not.toHaveTextContent(
      'likes'
    )
  })

  test('shows author, url and likes affter button clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'Test Author'
    )
    expect(component.container).toHaveTextContent(
      'test.org'
    )
    expect(component.container).toHaveTextContent(
      'likes'
    )
  })

  test('when like is pressed twice, event handler function is called twice', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockLiker.mock.calls.length).toBe(2)
  })
})