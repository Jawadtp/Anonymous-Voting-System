import React from 'react'
import LoginForm from './LoginForm'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Login = (props) => 
{
    const [mode, setMode]=useState("login")
    

    function switchMode()
    {
        console.log("Current state: "+mode)
        setMode(mode=="register"?"login":"register")
    }

    function onSubmitClick(email, password, username)
    {
       // console.log("Email: "+email+" Password: "+password)

        var details = {email:email, password:password, username: username}
        
        console.log('Current mode: '+mode)

        axios.post('http://localhost:5000/'+mode, details).then(
            (response) => {
                const token = response.data.access_token
                localStorage.setItem('token', response.data.access_token)
                console.log('Login successful, token received: '+token);
                props.initUser(token)
            },
            (error) => {
                console.log(error);
            }
        );
       /* var x = {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(details),
          }*/


         
      /*  axios.post('http://localhost:5000/login', x)
        .then((response) => 
        {
            console.log(response.data)
        });
 */
     /*   axios.get('http://localhost:5000/').then(res => 
        {
           console.log('argh')
        }) */
    }
    useEffect(() => 
    {
        console.log('Login component loaded.')
      //  console.log('Page loaded, token: '+localStorage.getItem('token'))
    },[]);

    return (
    <div className="loginWrapper container">
        <div className="modeBtns">
            <span onClick={switchMode} className={`modeLoginBtn text-center ${mode==="register"?"unselected":""}`}><div className="text">LOGIN</div></span>
            <span onClick={switchMode} className={`modeRegBtn text-center ${mode==="login"?"unselected":""}`}><div className="text">REGISTER</div></span>
        </div>

        <LoginForm mode={mode} onSubmitClick={onSubmitClick}/>
    </div>

    )
}

export default Login
