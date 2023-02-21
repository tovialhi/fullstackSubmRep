import { useEffect } from 'react'
import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

const App = () => {

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App