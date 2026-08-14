import React from 'react'
import Part from './Part'

const Content = ({parts}) => {
    const partsarray = parts.map(value=>(<Part key={value.name} name = {value.name} exercise={value.exercises}/>))
    return (
        <div >    
            {partsarray}

            {/* <Part name={props.part1.name} exercise={props.part1.exercises} />

            <Part name={props.part2.name} exercise={props.part2.exercises} />
            
            <Part name={props.part3.name} exercise={props.part3.exercises} /> */}
            </div>
    )
}

export default Content