import React from 'react'
import Part from './Part'

const Content = (props) => {
    return (
        <div>    

            <Part name={props.part1} exercise={props.exercises1} />

            <Part name={props.part2} exercise={props.exercises2} />
            
            <Part name={props.part3} exercise={props.exercises3} />
            </div>
    )
}

export default Content