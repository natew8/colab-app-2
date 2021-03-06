import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { motion } from 'framer-motion'
import moment from 'moment'
import './projects.css'

function Projects() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    // const [open, setOpen] = useState(false)

    useEffect(() => {
        axios.get('/api/projects').then(res => {
            setProjects(res.data)
            setLoading(false)
        }).catch(err => {
            console.log(err)
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
                <h1 className='team-projects-title'>Team Projects</h1>
                <div className='team-project-line'></div>
            </div>
            {loading ?
                <div className='loading-dot-box'>
                    <h1 className='loading-text'>Finding your Projects</h1>
                    <div className='loading-dot-1'></div>
                    <div className='loading-dot-2'></div>
                    <div className='loading-dot-3'></div>
                </div> :
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    {projectsMapped}
                </motion.div>
            }
        </div>
    )
}

export default withRouter(Projects)