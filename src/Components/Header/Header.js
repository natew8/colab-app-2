import React, { useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUser } from '../../dux/userReducer'
import './header.css'
import axios from 'axios'


function Header(props) {
    useEffect(() => {
        axios.get('/api/auth/me').then(res => {
            props.updateUser(res.data)
        })
    }, [])

    return (
        <header className='colab-header'>
            <img className='main-header-logo' src='https://colab-image-assets.s3-us-west-1.amazonaws.com/Asolo.png' alt='Logo' />
            <div className='main-user-info'>
                <h2 >
                    {props.username}
                </h2>
                <Link to='/user/profile'>
                    <img className={props.profilePic ? 'main-profile-pic' : 'default-pic'} src={props.profilePic ? props.profilePic : 'https://colab-image-assets.s3-us-west-1.amazonaws.com/defProfilePic.png'} alt='Profile_pic' />
                </Link>
            </div>
        </header >
    )
}

function mapStateToProps(reduxState) {
    return {
        username: reduxState.username,
        profilePic: reduxState.profilePic
    }
}

export default withRouter(connect(mapStateToProps, { updateUser })(Header))