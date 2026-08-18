import React from 'react'

const StatisticLine = ({ text, value }) => {

  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  )
}

export default StatisticLine