import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';

const Home = (props) => 
{
    const [test, setTestMessage] = useState("loading")

    useEffect(() => 
    {
        axios.get('http://localhost:5000/').then(res => 
        {
           setTestMessage(res.data)
        })
    });

    return (
        <h1>
            {test}
        </h1>
    )
}

export default Home
