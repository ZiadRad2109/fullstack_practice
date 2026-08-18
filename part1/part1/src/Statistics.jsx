import React from 'react'
import StatisticLine from './StatisticLine'

const Statistics = ({ good, neutral, bad, total, calculateAvg, calculatePositive }) => {
  if (total === 0)
    return (
      <div>
        <p>Give Feedback</p>
      </div>
    )
  else
    return (
      <>


        <table>
          <thead><tr><th>Statistics</th></tr></thead>
          <tbody><tr> <StatisticLine text={"Good"} value={good} /></tr>
            <tr> <StatisticLine text={"Neutral"} value={neutral} /></tr>
            <tr> <StatisticLine text={"Bad"} value={bad} /></tr>
            <tr> <StatisticLine text={"All"} value={total} /></tr>
            <tr> <StatisticLine text={"Average"} value={calculateAvg()} /></tr>
            <tr><StatisticLine text={"Positive Percentage"} value={`${calculatePositive()}%`} /></tr>
          </tbody>
        </table>
      </>
    )
}

export default Statistics