import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import Login
 from '../components/Login/Login';
const Home = (props) => 
{
    const [test, setTestMessage] = useState("loading") 
    const [user, setUser] = useState({}) 


    function initUser(token)
    {
        const opts = 
        {
            headers: 
            {
                Authorization: 'Bearer ' + token
            }
        }
        axios.get('http://localhost:5000/protected', opts).then((response)=>
        {
            console.log(response.data)
            console.log('Token found. Setting user..')
            setUser(response.data)
        })
    }

    useEffect(() => 
    {
     
        const token = localStorage.getItem('token')

        console.log('Page loaded. token: '+token)

        if(token && token!=undefined && Object.keys(user).length===0) //User's session is saved. Hence, obtain user data.
            initUser(token)

        else if(Object.keys(user).length===0) //User session not found. User is thus shown the login form.
            setUser({'username':'null'})
        

    },[]);

    return (
        <>
        {!Object.keys(user).length?'Loading':user.username==='null'?<Login initUser={initUser}/>:'Hi '+user.username}
        </>
    )
}

export default Home
