import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const createNewAnec = async (content) => {
    const object = { content, votes: 0 }
    const res = await axios.post(baseUrl, object)
    return res.data
}

export default { getAnecdotes, createNewAnec, }