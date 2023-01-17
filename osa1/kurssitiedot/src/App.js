




const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )

}

const Content = (props) => {
  console.log(props)
  return (
    <>
      {props.course.parts.map((part, i) =>
        <Part id={i} text={part.name} ex={part.exercises} />
      )}
    </>
  )
}

const Part = (props) => {
  return (
    <p key={props.id}>
      {props.text} {props.ex}
    </p>
  )
}

const Total = (props) => {
  console.log(props)
  let e = 0
  props.course.parts.forEach(part => {
    e += part.exercises
  })
  return (
    <p>
      Number of exercises {e}
    </p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App