import React from 'react'

const Total = ({parts}) => {
 // parts is an array of of objects containing 'name' -> string and 'exercises' -> integers
  const total = parts.reduce((sum,part)=>sum+part.exercises,0)
 return (
    //return the sum of elements within the parts array.exercises
    <p>Number of exercises = {total}</p>

  )
}

export default Total