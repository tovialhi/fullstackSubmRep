import { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove }) => {
  const [showAllInfo, setInfoVisible] = useState(false)

  const hideWhenVisible = {
    display: showAllInfo ? 'none' : '',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5 }
  const showWhenVisible = {
    display: showAllInfo ? '' : 'none',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5 }

  return (
    <>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={() => setInfoVisible(true)}>view</button>
      </div>

      <div style={showWhenVisible} className="togglableContent">
        <p>{blog.title} <button onClick={() => setInfoVisible(false)}>hide</button></p>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button></p>
        <p>{blog.author}</p>
        <button onClick={() => handleRemove(blog)}>remove</button>
      </div>
    </>
  )

}

export default Blog