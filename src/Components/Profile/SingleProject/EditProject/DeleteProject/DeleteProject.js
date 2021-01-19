import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScaleLoader } from 'react-spinners'
import axios from 'axios'
import './deleteProject.css'

function DeleteProject(props) {
    const project_id = props.match.params.projectId
    const project_creator_id = props.creatorId
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined)

    function confirmDeleteProject() {
        setLoading(true)
        axios.delete(`/api/project/${project_id}/${project_creator_id}`).then(res => {
            props.history.push('/user/profile')
        }).catch(err => {
            setLoading(false)
            setErrorMessage(err.response.data)
        })
    }

    return (
        <>
            {loading ?
                <>
                    <ScaleLoader />
                    <h1>Deleting Project</h1>
                </>
                :
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className='delete-project-box' >
                    <h3>Are You Sure Want to delete<h1>{props.match.params.project_title}</h1> from you projects?</h3>
                    <h2>This will delete all project data including songs, associated song files, and conversations.</h2>
                    <h2>This cannot be undone</h2>
                    <h3>Continue?</h3>
                    <div>
                        <button onClick={() => confirmDeleteProject()} className='confirm-button'>Delete</button>
                        <button onClick={() => props.setDeleteProject(false)} className='cancel-button'>Cancel</button>
                    </div>
                    {errorMessage && <h1 className='project-delete-error-message'>{errorMessage}</h1>}
                </motion.div >
            }
        </>
    )
}

export default withRouter(DeleteProject)