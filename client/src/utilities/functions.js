import axios from 'axios'


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
        console.log('Token found. Setting user...     :) ')
        console.log(response.data)
        return response.data
        //setUser(response.data)
    })
}

export function fetchTokenFromLocalStorage(user) 
{
    const token = localStorage.getItem('token')

    console.log('Page loaded. token: '+token)

    if(token && token!=undefined && Object.keys(user).length===0)
    {
        console.log('here xdddddddddddddd')
        return initUser(token)
    } //User's session is saved. Hence, obtain user data.
        

    else if(Object.keys(user).length===0) //User session not found. User is thus shown the login form.
     {
         console.log('else if herehehhehehehe')  
         return {'username':'null'}
     }
     return {}
}

