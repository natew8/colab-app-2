import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { logOut } from '../../../dux/userReducer'
import { Link, withRouter } from 'react-router-dom'
import './userInfo.css'


function UserInfo(props) {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        setDate(new Date())
    }, [])

    function logOutUser() {
        axios.post('/api/auth/logout').then(() => {
            props.logOut()
            props.history.push('/')
        })
    }

    return (
        <div className='user-info-box'>
            <div className='info-container'>
                <img className='profile-pic' src={props.profilePic ? props.profilePic : 'https://colab-image-assets.s3-us-west-1.amazonaws.com/defProfilePic.png'} alt='Profile' />
                <h1 className='username-info'>{props.username}</h1>
                <div className='user-info-line'></div>
                <h2 className='date'>{date.toLocaleDateString()}</h2>
                <div className='icon-text-container'>
                    <img className='icon' src='https://colab-image-assets.s3-us-west-1.amazonaws.com/settings.png' alt='logout' />
                    <h2 className='logout-link'><Link className='logout-link' to='/user/profile/edit' style={{ textDecoration: 'none' }}> Edit Profile</Link></h2>
                </div>
                <div className='icon-text-container'>
                    <img className='icon' src='https://colab-image-assets.s3-us-west-1.amazonaws.com/free-exit-logout-icon-2857-thumb.png' alt='logout' />
                    <h2 onClick={() => logOutUser()} className='logout-link'>Logout</h2>
                </div>
                <Link to='/user/profile/newProject'><button id='user-info-new-project-button'>New Project</button></Link>
            </div>
        </div>
    )
}

function mapStateToProps(reduxState) {
    return {
        profilePic: reduxState.profilePic,
        username: reduxState.username
    }
}

export default withRouter(connect(mapStateToProps, { logOut })(UserInfo))