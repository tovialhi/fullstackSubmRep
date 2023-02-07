const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'blogname1',
        author: 'authorname1',
        url: 'url1.com',
        likes: 11
    },
    {
        title: 'blogname2',
        author: 'authorname2',
        url: 'url2.com',
        likes: 22
    },
  ]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', url: 'remove.com' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}