import React from 'react'

const Notification = ({message}) => {
    const styling = {
        color:'black',
        background:'lightgrey',
        fontStyle:'bold',
        fontSize:20,
        borderStyle:'solid',
        borderRadius:5,
        padding:10,
        marginBottom:10

    }

    if (message === null){
        return null
    }
  return (
    <div style={styling}>{message}</div>
  )
}

export default Notification