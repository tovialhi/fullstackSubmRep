import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {

    addVote(state, action) {
      const id = action.payload.id
      const anecToVote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecToVote,
        votes: anecToVote.votes + 1
      }
    return state.map(anec =>
      anec.id !== id ? anec : votedAnecdote 
      ).sort((a,b) => b.votes - a.votes)
    },

    addAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    }

  }
})


export const { addVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAnecdotes()
    console.log(anecdotes)
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnec = await anecdoteService.createNewAnec(content)
    dispatch(addAnecdote(newAnec))
  }
}

export const voteAnec = id => {
  return async dispatch => {
    const anecToVote = await anecdoteService.vote(id)
    dispatch(addVote(anecToVote))
  }
}

export default anecdoteSlice.reducer
