import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './myProjects.css'

function MyProjects() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [empty, setEmpty] = useState(false)


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
                    <h4>Deadline: {element.deadline}</h4>
                </div >
            </Link>
        )
    })

    return (
        <div className='projects-container'>
            <div className='team-projects-header'>
                <h1 className='team-projects-title'>Team Projects</h1>
                <div className='team-project-line'></div>
            </div>
            {loading ? <h1>Finding your Projects</h1> :
                projectsMapped
            }
            {loading ? null :
                <div className='project-footer'>
                    <div className='project-footer-left'>
                        <Link style={{ textDecoration: 'none' }} Link to='/user/profile/newProject'><h4 className='footer-nav-item-2'>New Project</h4> </Link>
                    </div>
                </div>}
            {/* {loading ? null : <Link Link to='/user/profile/newProject'>
                <button className='add-project-button'>New Project</button>
            </Link>} */}
            {/* {open && <div>
                <h4>Created By: {element.username}</h4>
                <div></div>
                <h4>Deadline: {element.deadline}</h4>
                <div></div>
                <h4>Date Created: {element.created}</h4>
            </div>} */}
        </div >
    )
}

export default withRouter(MyProjects)