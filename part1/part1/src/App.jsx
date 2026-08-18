import { useState } from "react"
import Content from "./Content"
import Header from "./Header"
import Total from "./Total"
import Button from "./Button"
import Statistics from "./Statistics"

  const anectodes = [
    {text:'If it hurts, do it more often.', votes: 0},
    {text:'Adding manpower to a late software project makes it later!', votes: 0},
    {text:'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0},
    {text:'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0},
    {text:'Premature optimization is the root of all evil.', votes: 0},
    {text:'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0},
    {text:'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', votes: 0},
    {text:'The only way to go fast, is to go well.', votes: 0}
  ]
const App = () => {

  // const course = {
  //   title: 'Half Stack application development',
  //   parts: [
  //     {
  //       name: 'Fundamentals of React',
  //       exercises: 10
  //     }, {
  //       name: 'Using props to pass data',
  //       exercises: 7
  //     }, {
  //       name: 'State of a component',
  //       exercises: 14
  //     }

  //   ]
  // }

  // return (
  //   <div>
  //     <Header course={course} />
  //     <Content parts={course.parts} />
  //     <Total parts={course.parts} />
  //   </div>
  // )



  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [anectodePress, setAnectodePress] = useState(0)
  const [votes, setVotes] = useState(new Array(anectodes.length).fill(0))

  const handleGood = () => {
    let newGood = good + 1
    setGood(newGood)
  }

  const handleNeutral = () => {
    let newNeutral = neutral + 1
    setNeutral(newNeutral)
  }

  const handleBad = () => {
    let newBad = bad + 1
    setBad(newBad)
  }

  const total = good + neutral + bad
  const calculateAvg = () => {
    if (total === 0) {
      return 0
    }
    return ((good - bad) / total).toFixed(2)
  }
  const calculatePositive = () => {
    if (total === 0) {
      return 0
    }
    //round value to 2 decimal places
    return ((good / total) * 100).toFixed(2)
  }
  const handleAnectodePress = () => {
    //this handler function is used to generate a random number between 0 and (anectodes.length - 1)
    //this statement makes sure that the random number is not the same as the previous one
    let randomNum = Math.floor(Math.random() * (anectodes.length))
    //this condition is used to generate a new random number if the random number is the same as the previous one
    if (randomNum === anectodePress) {
      handleAnectodePress()
    }
    setAnectodePress(randomNum)
  }
  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[anectodePress] += 1
    setVotes(newVotes)
  }
  const mostVoted=()=>{
    let max =0
    let maxIdx = 0
    for (let i=0 ; i<votes.length ; i++){
      if (votes[i] > max) {
        max = votes[i]
        maxIdx = i
      }
    }
    return maxIdx
  }
  return (
    <>
      <h1>Give Feedback</h1>
      <Button onClick={(handleBad)} text={"Bad"}></Button>
      <Button onClick={(handleNeutral)} text={"Neutral"}></Button>
      <Button onClick={(handleGood)} text={"Good"}></Button>

      <Statistics good={good} neutral={neutral} bad={bad} total={total} calculateAvg={calculateAvg} calculatePositive={calculatePositive} />
      <div>
        <h1>Anecdotes</h1>
        <p>{anectodes[anectodePress].text}</p>
        <p>has {votes[anectodePress]} votes</p>
        <Button onClick={handleAnectodePress} text={"Next Anecdote"}></Button>
        <Button onClick={handleVote} text={"Vote"}></Button>
      
      </div>
      <div>
        <h1>Most Voted Anecdote</h1>
        <p>{anectodes[mostVoted()].text}</p>
        <p>has {votes[mostVoted()]} votes</p>
        
      </div>
      {/* {/* <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {total}</p>
      <p>Average: {calculateAvg()}</p>
      <p>+ve Percentage: {calculatePositive()} %</p> */}
    </>

  )
}

export default App