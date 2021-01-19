import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { motion } from 'framer-motion'
import TeamEdit from '../TeamEdit/TeamEdit'
import './editProject.css'
import SongList from './SongList/SongList'
import DeleteProject from './DeleteProject/DeleteProject'

function EditProject(props) {
    const [projectTitle, setProjectTitle] = useState('')
    const [projectDeadline, setProjectDeadline] = useState('')
    const [projectCreated, setProjectCreated] = useState('')
    const [projectCreator, setProjectCreator] = useState('')
    const [projectCreatorId, setProjectCreatorId] = useState(0)
    const [deleteProject, setDeleteProject] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`/api/projects/project/${props.match.params.projectId}`).then(res => {
            setProjectTitle(res.data.title)
            setProjectDeadline(res.data.deadline)
            setProjectCreated(res.data.created)
            setProjectCreator(res.data.project_creator)
            setProjectCreatorId(res.data.project_creator_id)
            setLoading(false)
        })
    })


    function goNewSong() {
        props.setEditProject(false)
        props.setNewSong(true)
    }
    return (
        <div className='projects-container'>

            {deleteProject ?
                <DeleteProject setDeleteProject={setDeleteProject} creatorId={projectCreatorId} />
                :
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className='team-projects-header'>
                        <h1 className='team-projects-title'>Project Info</h1>
                        <div className='edit-project-line'></div>
                    </motion.div>
                    {loading ?
                        <div className='loading-dot-box'>
                            <h1 className='loading-text'>Loading project info</h1>
                            <div className='loading-dot-1'></div>
                            <div className='loading-dot-2'></div>
                            <div className='loading-dot-3'></div>
                        </div>
                        :
                        <>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className='project-info-box'>
                                <h1>{projectTitle}</h1>
                                <h2>Created By:<h2>{projectCreator}</h2></h2>
                                <h2>Project Deadline:<h2>{moment(projectDeadline).format('L')}</h2></h2>
                                <h2>Created On:<h2>{moment(projectCreated).format('L')}</h2></h2>
                            </motion.div>
                            {/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className='edit-project-line'></motion.div> */}
                            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className='song-list-title'>Song List</motion.h1>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className='edit-song-window'>
                                <SongList />
                            </motion.div>
                            {/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className='edit-project-line'></motion.div> */}
                            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className='song-list-title'>Project Team</motion.h1>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className='edit-team-window'>
                                <TeamEdit creatorId={projectCreatorId} />
                            </motion.div>
                        </>
                    }
                    <motion.div className='edit-project-footer'>
                        <h4 onClick={() => goNewSong()}>Add Song</h4>
                        <h4 onClick={() => props.setEditProject(false)}>Close Window</h4>
                        <h4 onClick={() => setDeleteProject(true)}>Delete Project</h4>
                    </motion.div>
                </>
            }
        </div>
    )
}

export default withRouter(EditProject)