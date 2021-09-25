import React from 'react'
import {useHistory} from 'react-router'

const Landing = (props) => 
{
    const history=useHistory()

    function onCreateButtonPress()
    {
        history.push('/create')
    }
    return (
        <div className="landingWrapper">
            <div className="landingHeader">
            <span className="anonPollsLogo">Anon<span className="pollsPart">Polls</span></span>
            </div>

            <div className="pollsView">
                <div className="pollsViewTitle">Active Polls</div>
                <div className="pollsViewDesc">Here's the list of all active polls.</div>
            </div>

            <div className="pollViewWrapper">


                <div className="bottomRight">
                    <input type="button" className="btnAddQuiz" value="+" onClick={onCreateButtonPress}/>
                    
                </div>

            </div>
        </div>
    )
}

export default Landing
