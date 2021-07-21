import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import Login
 from '../components/Login/Login';
const Home = (props) => 
{
    const [test, setTestMessage] = useState("loading")

    useEffect(() => 
    {
        axios.get('http://localhost:5000/').then(res => 
        {
           setTestMessage(res.data)
           console.log('Data received from server: ' + res.data)
        })
    });

    return (
        
        <Login/>
        
    )
}

export default Home
