import React from 'react'
import LoginForm from './LoginForm'
import { useState } from 'react'
import axios from 'axios'

const Login = () => 
{
    const [mode, setMode]=useState("login")
    

    function switchMode()
    {
        console.log("Current state: "+mode)
        setMode(mode=="register"?"login":"register")
    }

    function onSubmitClick(email, password)
    {
        console.log("Email: "+email+" Password: "+password)

        var details = {email:email, password:password}
        var x = {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(details),
          }


          fetch('http://127.0.0.1:5000/api/', x)
            .then(res => 
                {
                    console.log(res.json)
                })
        
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
