import { useState } from 'react'


const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const ShowVotes = ({voteAm}) => <p>has {voteAm} votes</p>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [votes, setVotes] = useState(points[selected])
  const [index, setMostVotes] = useState(0)

  const randomIndex = () => {
    return (Math.floor(Math.random() * anecdotes.length))
  }

  const UpdateArray = () => {
    points[selected] += 1
    setVotes(UpdateVoteCount(selected))
    setMostVotes(MostVotes)
    console.log(points)
    return (points)
  }

  const UpdateVoteCount = () => {
    return (points[selected])
  }

  const UpdateAll = () => {
    setSelected(randomIndex)
    setVotes(UpdateVoteCount)
    setMostVotes(MostVotes)
  }


  const MostVotes = () => {
    let i = points.indexOf(Math.max(...points));
    return (i)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <ShowVotes voteAm={votes}/>
      <Button handleClick={() => setPoints(UpdateArray)} text="vote"/>
      <Button handleClick={UpdateAll} text="next anecdote" />

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[index]}</p>
      <p>has {points[index]} votes</p>

    </div>
  )
}

export default App