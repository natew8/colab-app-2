import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { logOut } from '../../dux/userReducer'
import { Link, NavLink, withRouter } from 'react-router-dom'
import axios from 'axios'
//dependencies

//styling
import './lab.css'
//Components
import LabView from './LabView/LabView'


function Lab(props) {
    const [songList, setSongList] = useState([])
    // const [title, setTitle] = useState('')
    // const [artist, setArtist] = useState('')

    useEffect(() => {
        axios.get(`/api/project/songList/${props.match.params.project_id}`).then(res => {
            setSongList(res.data)
        })
    }, [props.match.params.project_id])

    function logOutUser() {
        axios.post('/api/auth/logout').then(() => {
            props.logOut()
            props.history.push('/')
        })
    }
    const mappedSongList = songList.map((element, index) => {
        return (
            <h2 key={element.id} className='song-list-nav'>
                <NavLink className='song-list-nav' exact={true} style={{ textDecoration: 'none' }} to={`/user/profile/Lab/${element.id}/${props.match.params.project_id}`} activeClassName='active-nav'>
                    {element.song_title}
                </NavLink>
            </h2>
        )
    })
    return (
        <span className='page'>
            <div className='page'>
                <header className='lab-header'>
                    <img className='lab-header-logo' src='https://colab-image-assets.s3-us-west-1.amazonaws.com/ColabAlogo.png' alt='Logo' />
                    <div className='songList-container'>
                        {mappedSongList}
                    </div>
                    <img className={props.profilePic ? 'profile-pic' : 'lab-default-pic'} src={props.profilePic ? props.profilePic : 'https://colab-image-assets.s3-us-west-1.amazonaws.com/defProfilePic.png'} alt='Profile_pic' />
                    <div className='lower-nav-container'>
                        <Link style={{ textDecoration: 'none' }} to='/user/profile'>
                            <h2 id='home'>Home</h2>
                        </Link>
                        <h2 onClick={() => logOutUser()} id='home'>Logout</h2>
                    </div>
                </header>
                <div className='audio-control-container-2' />
                <LabView />
            </div>
        </span>
    )
}

function mapStateToProps(reduxState) {
    return {
        username: reduxState.username,
        profilePic: reduxState.profilePic
    }
}
export default withRouter(connect(mapStateToProps, { logOut })(Lab))