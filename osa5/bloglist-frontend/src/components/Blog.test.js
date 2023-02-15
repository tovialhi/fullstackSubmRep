import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Title of the blog component'

  }

  render(<Blog blog={blog} />)

  const elementTitle = screen.getAllByText('Title of the blog component')
  expect(elementTitle).toBeDefined()
})

test('after clicking button, children are displayed', async () => {
  const blog = {
    title: 'Title of the blog component',
    url: 'Url of the blog component',
    author: 'Author of the component',
    likes: 3
  }

  render(<Blog blog={blog}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const elementTitle = screen.getAllByText('Title of the blog component')
  const elementUrl = screen.getAllByText('Url of the blog component')
  const elementAuthor = screen.getAllByText('Author of the component')
  const elementLikes = screen.getAllByText('likes 3')

  expect(elementTitle).toBeDefined()
  expect(elementUrl).toBeDefined()
  expect(elementAuthor).toBeDefined()
  expect(elementLikes).toBeDefined()
})

test('after clicking like button twice, likes increase by 2', async () => {
    const blog = {
      title: 'Title of the blog component',
      url: 'Url of the blog component',
      author: 'Author of the component',
      likes: 3
    }

    const mockHandler = jest.fn()
  
    render(<Blog blog={blog} handleLike={mockHandler}/>)
  
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
  