import React from 'react'
import { useHistory, withRouter } from 'react-router-dom'


function Error(props) {
    const history = useHistory()
    function goHome() {
        history.push('/')
    }
    return (
        <div>
            <h1>Oops! Looks like you got lost. Lets get you back on track.</h1>
            <h1 onClick={() => goHome()}>Click here to be redirected.</h1>
        </div>
    )
}

export default withRouter(Error)