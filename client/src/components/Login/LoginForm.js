import React from 'react'

const LoginForm = (props) => {

    function onSubmitClick()
    {
        var email = document.getElementById("emailid").value
        var username = 'login'
        if(props.mode==='register')
            username=document.getElementById("username").value
        var password = document.getElementById("password").value
        props.onSubmitClick(email, password, username)
    }
    return (
            <form className="loginForm">
                
                {props.mode==="register"?
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username"/>
                </div>:''}

                <div className="mb-3">
                    <label htmlFor="emailid" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="emailid" aria-describedby="emailHelp" />
                </div>

               
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" />
                </div>
                
                <div className="text-center">
                    <button type="button" onClick={onSubmitClick} className="btn btn-primary btn-signin">{props.mode=="login"?"LOGIN":"REGISTER"}</button>
                </div>

            </form>
    )
}

export default LoginForm
