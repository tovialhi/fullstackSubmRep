const Header = ({ courseName }) => <h2>{courseName}</h2>

const Total = ({ sum }) => <b>total of {sum} exercises</b>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part} />)


const Course = ({course}) => 
  <>
    <Header courseName={course.name} />
    <Content parts={course.parts} />
    <Total sum={course.parts.reduce((sumAm, part) => sumAm + part.exercises, 0)} />
  </>

export default Course