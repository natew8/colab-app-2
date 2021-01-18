import React, { Component } from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUser } from '../../dux/userReducer'
import Header from '../Header/Header'
import './profile.css'
import UserInfo from './UserInfo/UserInfo'
import TeamDisplay from './TeamDisplay/TeamDisplay'
import Projects from './Projects/Projects'
import EditProfile from './EditProfile/EditProfile'
import NewProject from '../NewProject/NewProject'
import MyProjects from './MyProjects/MyProjects'
import Project from './SingleProject/project'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }


    render() {
        return (
            <div className='profile'>
                <Header />
                <div className='nav-container'>
                    <div className='nav-list'>
                        <NavLink className='nav-item' style={{ textDecoration: 'none' }} activeClassName='is-active' exact={true} to='/user/profile'> My Projects</NavLink>
                        <NavLink className='nav-item' style={{ textDecoration: 'none' }} activeClassName='is-active' exact={true} to='/user/profile/teamProjects'> Team Projects</NavLink>
                        <NavLink className='nav-item' style={{ textDecoration: 'none' }} activeClassName='is-active' exact={true} to='/user/profile/newProject'>New Project</NavLink>
                    </div>
                </div>
                <div className='profile-view'>
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
                </div>
                <div className='profile-bottom-line'></div>
            </div>
        )

    }
}

export default connect(null, { updateUser })(Profile)