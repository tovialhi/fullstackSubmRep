import { useDispatch, useSelector } from 'react-redux'
import { voteAnec } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if (state.filter === 'ALL') return state.anecdotes
        return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter))
    })

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(voteAnec(anecdote.id))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
      }

    return (
        <div>
            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
            </div>
            )}
        </div>
    )
}

export default AnecdoteList