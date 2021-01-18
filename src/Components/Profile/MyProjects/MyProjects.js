import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import moment from 'moment'
import './myProjects.css'

function MyProjects() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        axios.get('/api/projects/user').then(res => {
            setProjects(res.data)
            setLoading(false)

        }).catch(err => {
            console.log(err.response)
        })
    }, [])



    const projectsMapped = projects.map((element) => {
        return (
            <Link key={element.id} style={{ textDecoration: 'none' }} to={`/user/profile/viewProject/${element.id}/${element.project_title}`}>
                <div className='project-container'>
                    <h2 className='project-title'>{element.project_title}</h2>
                    <h4 id='my-project-date'>Deadline: {moment(element.deadline).format('L')}</h4>
                </div >
            </Link>
        )
    })

    return (
        <div className='projects-container'>
            <div className='team-projects-header'>
                <h1 className='team-projects-title'>My Projects</h1>
                <div className='team-project-line'></div>
            </div>
            {loading ?
                <div className='loading-dot-box'>
                    <h1 className='loading-text'>Finding your Projects</h1>
                    <div className='loading-dot-1'></div>
                    <div className='loading-dot-2'></div>
                    <div className='loading-dot-3'></div>
                </div>
                :
                projectsMapped
            }
            {loading ? null :
                <div className='project-footer'>
                    <div className='project-footer-left'>
                        <Link style={{ textDecoration: 'none' }} Link to='/user/profile/newProject'><h4 className='footer-nav-item-2'> + New Project</h4></Link>
                    </div>
                </div>}
        </div >
    )
}

export default withRouter(MyProjects)