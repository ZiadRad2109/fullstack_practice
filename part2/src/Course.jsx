const Header = ({ course }) => <h1>{course}</h1>
const Content = ({ parts }) => {
  return (<div>
    <ul>
      {parts.map(part => (<Part key={part.id} part={part} />))}
    </ul>
  </div>)
}
const Part = ({ part }) => (
  <li>{part.name} {part.exercises}</li>
)
const Total = ({ total }) => <p>Number of exercises {total}</p>

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts.reduce((acc, part) => acc + part.exercises, 0)} />
    </div>
  )
}

export default Course