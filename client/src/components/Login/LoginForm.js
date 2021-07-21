import React from 'react'

const LoginForm = (props) => {

    function onSubmitClick()
    {
        var email = document.getElementById("emailid").value;
        var password = document.getElementById("password").value;
        props.onSubmitClick(email, password)
    }
    return (
            <form className="loginForm">
                
                <div className="mb-3">
                    <label htmlFor="emailid" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="emailid" aria-describedby="emailHelp" />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" />
                </div>
                
                <div className="text-center">
                    <button type="button" onClick={onSubmitClick} type="submit" className="btn btn-primary btn-signin">{props.mode=="login"?"LOGIN":"REGISTER"}</button>
                </div>

            </form>
    )
}

export default LoginForm
