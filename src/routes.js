import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import Landing from './Components/Landing/Landing'
import Error from './Components/Error'
import Register from './Components/Auth/Register'
import Login from './Components/Auth/Login'
import Profile from './Components/Profile/Profile'
import Lab from './Components/Lab/Lab'
import { AnimatePresence } from 'framer-motion'

export default function Routes() {
    const location = useLocation()
    return (
        <AnimatePresence>
            <Switch location={location} key={location.key}>
                <Route exact path='/' component={Landing} />
                <Route path='/user/profile/lab/:song_id/:project_id' component={Lab} />
                <Route path='/user/profile' component={Profile} />
                <Route path='/register' component={Register} />
                <Route path='/login' component={Login} />
                <Route component={Error} />
            </Switch>
        </AnimatePresence>
    )
} 