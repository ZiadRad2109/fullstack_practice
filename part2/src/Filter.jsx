import React from 'react'

const Filter = (props) => {

    return (
        <div>
            <form onSubmit={props.filterByName}>
                <p>Search By Name: </p>
                <input
                    value={props.filterName}
                    onChange={props.handleFilterNameChange} />
                <button type="submit">Filter</button>
            </form>
        </div>
    )
}

export default Filter