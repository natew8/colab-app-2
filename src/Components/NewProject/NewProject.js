import axios from 'axios'
import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { motion } from 'framer-motion'
import TeamBuild from './TeamBuild'
import './newProject.css'

function NewProject(props) {
    const [project_title, setProject_Title] = useState('')
    const [projectId, setProjectId] = useState(0)
    const [creatorId, setCreatorId] = useState(0)
    const [deadline, setDeadline] = useState('')
    const [next, setNext] = useState(false)


    function createProject() {
        console.log(project_title, deadline)
        axios.post('/api/project/create', { project_title, deadline }).then((res) => {
            console.log(res.data)
            setProjectId(res.data.id)
            setCreatorId(res.data.project_creator_id)
            setDeadline('')
            setNext(true)
        }).catch(err => {
            console.log(err.response.data)
        })
    }


    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }} className='new-project-container'>
            <div className='team-projects-header'>
                <h1 className='team-projects-title'>New Project</h1>
                <div className='team-project-line'></div>
            </div>
            <div className='inputs-container'>
                <div className='new-input-box'>
                    <h4 className='new-label'>
                        Project Title
                    </h4>
                    <input onChange={(e) => setProject_Title(e.target.value)} className='new-project-input' type='text' placeholder='Title' />
                </div>
                <div className='new-input-box'>
                    <h4 className='new-label'>
                        Project Deadline
                    </h4>
                    <input onChange={(e) => setDeadline(e.target.value)} className='new-project-input' type='date' placeholder='Title' />
                </div>
            </div>
            {deadline && project_title && !next ?
                <button onClick={() => createProject()} className='next-button'>Next</button>
                : null}
            {next ?
                <TeamBuild creatorId={creatorId} projectId={projectId} />
                : null}
            {next ?
                <div>
                    <Link to={`/user/profile/viewProject/${projectId}/${project_title}`}>
                        <button className='create-project-button'>Create Project</button>
                    </Link>
                </div>
                : null}

        </motion.div>
    )
}

export default withRouter(NewProject)