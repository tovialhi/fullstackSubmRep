import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => 
    axios.get(baseUrl).then(response => response.data)


export const createAnecdote = newAnec => 
    axios.post(baseUrl, newAnec).then(response => response.data)


export const voteAnecdote = votedAnecdote => 
    axios.put(`${baseUrl}/${votedAnecdote.id}`, votedAnecdote).then(response => response.data)
