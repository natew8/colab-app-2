import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { motion } from 'framer-motion'
import moment from 'moment'
import axios from 'axios'
import './editInfo.css'

function EditInfo(props) {
    const [project_title, setProject_title] = useState(props.title)
    const [deadline, setDeadline] = useState(props.deadline)
    const [updating, setUpdating] = useState(false)
    const [error, setError] = useState(undefined)
    const [change, setChange] = useState(false)
    const project_id = props.match.params.projectId
    const project_creator_id = props.creatorId


    function setNewTitle(val) {
        setProject_title(val)
        setChange(true)
    }

    function setNewDeadline(val) {
        setDeadline(val)
        setChange(true)
    }

    function updateInfo(val) {
        setUpdating(true)
        axios.put(`/api/project/update/${project_id}/${project_creator_id}`, { project_title, deadline }).then(res => {
            setUpdating(false)
            props.setEdit(false)
        }).catch(err => {
            setUpdating(false)
            setError(err.response.data)
        })
    }
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className='edit-project-info-box'>
            {updating ?
                <h1>Updating Project Info...</h1>
                :
                <>
                    <h1 onClick={() => props.setEdit(false)}>X</h1>
                    {error && <h1 id='error-message-edit'>{error}<h4 onClick={() => setError(undefined)}>X</h4></h1>}
                    <label forHtml='title-input'>Project title:
                    <input onChange={(e) => setNewTitle(e.target.value)} id='title-input' type='text' value={project_title} placeholder='title' />
                    </label>
                    <label forHtml='title-input'>Project Deadline:
                    <input onChange={(e) => setNewDeadline(e.target.value)} type='date' value={deadline} placeholder='title' />
                    </label>
                    {change && <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        onClick={() => updateInfo()}
                    >update</motion.button>}
                </>
            }
        </motion.div>
    )
}

export default withRouter(EditInfo)