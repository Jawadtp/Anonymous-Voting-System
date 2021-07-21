import React from 'react'
import { useParams } from 'react-router'

const Poll = () => 
{
    const {id} = useParams()
    return (
        <div>
            <h1>Poll ID: </h1>
            {id}
        </div>
    )
}

export default Poll
