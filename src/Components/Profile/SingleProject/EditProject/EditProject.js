import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { motion } from 'framer-motion'
import TeamEdit from '../TeamEdit/TeamEdit'
import './editProject.css'

function EditProject(props) {
    const [projectTitle, setProjectTitle] = useState('')
    const [projectDeadline, setProjectDeadline] = useState('')
    const [projectCreated, setProjectCreated] = useState('')
    const [projectCreator, setProjectCreator] = useState('')
    const [projectCreatorId, setProjectCreatorId] = useState(0)

    useEffect(() => {
        axios.get(`/api/projects/project/${props.match.params.projectId}`).then(res => {
            console.log(res.data)
            setProjectTitle(res.data.title)
            setProjectDeadline(res.data.deadline)
            setProjectCreated(res.data.created)
            setProjectCreator(res.data.project_creator)
            setProjectCreatorId(res.data.project_creator_id)
        })
    })
    return (
        <div className='projects-container'>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className='team-projects-header'>
                <h1 className='team-projects-title'>Project Info</h1>
                <div className='edit-project-line'></div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className='project-info-box'>
                <h1>{projectTitle}</h1>
                <h2>Created By:<h2>{projectCreator}</h2></h2>
                <h2>Project Deadline:<h2>{moment(projectDeadline).format('L')}</h2></h2>
                <h2>Created On:<h2>{moment(projectCreated).format('L')}</h2></h2>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className='edit-project-line'></motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className='edit-project-window'>
                <h1>mapped songlist</h1>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className='edit-project-window'>
                <TeamEdit creatorId={projectCreatorId} />
            </motion.div>
        </div>
    )
}

export default withRouter(EditProject)