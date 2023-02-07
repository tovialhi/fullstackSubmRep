const lodash = require('lodash')

const dummy = (blogs) => {
    return (1)
  }


const totalLikes = (blogs) => {
    let likes = 0
    blogs.forEach(blog => {
        likes += blog.likes
    })
    return (likes)
}

const favoriteBlog = (blogs) => {
    let mostLiked = undefined
    blogs.forEach(blog => {
        if (mostLiked === undefined || blog.likes > mostLiked.likes) {
            mostLiked = blog
        }
    })
    return ({title: mostLiked.title, author: mostLiked.author, likes: mostLiked.likes})
}

const mostBlogs = (blogs) => {
    const grouped = lodash.groupBy(blogs, 'author')
    const most = grouped[Object.keys(grouped)[Object.keys(grouped).length - 1]]

    return ({author: most[0].author, blogs: most.length})
}

const mostLikes = (blogs) => {
    const groupedByAuth = lodash.groupBy(blogs, 'author')
    let likes = {}
    for (const [author, blogs] of Object.entries(groupedByAuth)) {
        blogs.forEach(blog => {
            if (likes[author] === undefined) likes[author] = blog.likes
            else likes[author] += blog.likes
        })
    }
    const mostLiked = Object.keys(likes).reduce((a,b) => likes[a] > likes[b] ? a : b)
    return ({author: mostLiked, likes: likes[mostLiked]})
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}