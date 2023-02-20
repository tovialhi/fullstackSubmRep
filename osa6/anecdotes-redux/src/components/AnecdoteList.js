import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if (state.filter === 'ALL') return state.anecdotes
        return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter))
    })

    const vote = (id) => {
        console.log('vote', id)
        dispatch(addVote(id))
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
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
            )}
        </div>
    )
}

export default AnecdoteList