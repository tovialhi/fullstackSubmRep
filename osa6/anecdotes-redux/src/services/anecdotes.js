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

const vote = async (id) => {
    const anecdotes = await getAnecdotes()
    const anecToVote = anecdotes.find(a => a.id === id)
    const votedAnec = {...anecToVote, votes: anecToVote.votes + 1}

    const res = await axios.put(`${baseUrl}/${votedAnec.id}`, votedAnec)
    return res.data
}

export default { getAnecdotes, createNewAnec, vote}