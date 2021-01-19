import React, { useState } from 'react'
import axios from 'axios'
import { NavLink, Route, Switch, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../../dux/userReducer'
import moment from 'moment'
import Header from '../Header/Header'
import './profile.css'
import UserInfo from './UserInfo/UserInfo'
import TeamDisplay from './TeamDisplay/TeamDisplay'
import Projects from './Projects/Projects'
import EditProfile from './EditProfile/EditProfile'
import NewProject from '../NewProject/NewProject'
import MyProjects from './MyProjects/MyProjects'
import Project from './SingleProject/project'

function Profile(props) {
    const [burger, setBurger] = useState(false)

    function logOutUser() {
        axios.post('/api/auth/logout').then(() => {
            props.logOut()
            props.history.push('/')
        })
    }

    return (
        <>
            <div className='profile'>
                <Header />
                <div onClick={() => setBurger(true)} className='burger-menu'>
                    <div className='burger-bar'></div>
                    <div className='burger-bar'></div>
                    <div className='burger-bar'></div>
                </div>
                <img src='https://colab-image-assets.s3-us-west-1.amazonaws.com/ColabLogoWhite.png' alt='logo' className='ipad-logo' />
                <div className='nav-container'>
                    <div className='nav-list'>
                        <NavLink className='nav-item' style={{ textDecoration: 'none' }} activeClassName='is-active' exact={true} to='/user/profile'> My Projects</NavLink>
                        <NavLink className='nav-item' style={{ textDecoration: 'none' }} activeClassName='is-active' exact={true} to='/user/profile/teamProjects'> Team Projects</NavLink>
                        <NavLink className='nav-item' style={{ textDecoration: 'none' }} activeClassName='is-active' exact={true} to='/user/profile/newProject'>New Project</NavLink>
                    </div>
                </div>
                <div className='profile-view'>
                    <div id='div-line-decor'></div>
                    <div className='side-bar'>
                        <UserInfo />
                        <TeamDisplay />
                    </div>
                    <Switch>
                        <Route exact path='/user/profile/teamProjects' component={Projects} />
                        <Route exact path='/user/profile/newProject' component={NewProject} />
                        <Route exact path='/user/profile/edit' component={EditProfile} />
                        <Route exact path='/user/profile/viewProject/:projectId/:project_title' component={Project} />
                        <Route exact path='/user/profile' component={MyProjects} />
                    </Switch>
                    <div id='div-line-decor-right'></div>
                </div>
                <div className='profile-bottom-line'></div>
            </div>
            <div className={burger ? 'burger-menu-right' : 'burger-menu-hidden'}>
                <h1 onClick={() => setBurger(false)} className='close-burger'>X</h1>
                <div className='burger-user-info'>
                    <img className={props.profilePic ? 'burger-profile-pic' : 'burger-default-pic'} src={props.profilePic ? props.profilePic : 'https://colab-image-assets.s3-us-west-1.amazonaws.com/defProfilePic.png'} />
                    <h4>{props.username}</h4>
                </div>
                <div className='burger-info-line'></div>
                <NavLink className='burger-nav-item' style={{ textDecoration: 'none' }} activeClassName='burger-is-active' exact={true} to='/user/profile'> My Projects</NavLink>
                <NavLink className='burger-nav-item' style={{ textDecoration: 'none' }} activeClassName='burger-is-active' exact={true} to='/user/profile/teamProjects'> Team Projects</NavLink>
                <NavLink className='burger-nav-item' style={{ textDecoration: 'none' }} activeClassName='burger-is-active' exact={true} to='/user/profile/newProject'>New Project</NavLink>
                <div className='burger-user-nav'>
                    <h6>{moment().format('L')}</h6>
                    <div className='icon-text-container'>
                        <img className='icon' src='https://colab-image-assets.s3-us-west-1.amazonaws.com/settings.png' alt='logout' />
                        <h2 className='logout-link'><Link className='logout-link' to='/user/profile/edit' style={{ textDecoration: 'none' }}> Edit Profile</Link></h2>
                    </div>
                    <div className='icon-text-container'>
                        <img className='icon' src='https://colab-image-assets.s3-us-west-1.amazonaws.com/free-exit-logout-icon-2857-thumb.png' alt='logout' />
                        <h2 onClick={() => logOutUser()} className='logout-link'>Logout</h2>
                    </div>
                </div>
            </div>
        </>
    )
}
function mapStateToProps(reduxState) {
    return {
        username: reduxState.username,
        profilePic: reduxState.profilePic,
        id: reduxState.id
    }
}
export default connect(mapStateToProps, { logOut })(Profile)