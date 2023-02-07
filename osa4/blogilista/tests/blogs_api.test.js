const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

  
beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})


test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('identifying with id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('blog can be added', async () => {
    const newBlog = {
        title: 'testBlogName',
        author: 'testAuthorName',
        url: 'testurl.com',
        likes: 1337
    }
    await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('testBlogName')
})

test('default likes is 0', async () => {
    const newBlog = {
        title: 'testBlogName',
        author: 'testAuthorName',
        url: 'testurl.com'
    }
    await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blog = response.body.find(r => r.title === 'testBlogName')
    expect(blog.likes).toBe(0)
})

test('adding invalid blog', async () => {
    const newBlog = {
        author: 'testAuthorName',
        likes: 123
    }

    await api.post('/api/blogs')
    .send(newBlog)
    .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
  
    const titles = blogsAtEnd.map(r => r.title)
  
    expect(titles).not.toContain(blogToDelete.title)
  })

test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const blogUpdate = {
        title: 'updatedTitle',
        author: 'updatedAuthor',
        likes: 111
    }

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogUpdate)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]
    expect({
            title: updatedBlog.title,
            author: updatedBlog.author,
            likes: updatedBlog.likes
        }).toEqual(blogUpdate)
})

afterAll(async () => {
  await mongoose.connection.close()
})