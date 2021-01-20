import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import './deleteSong.css'

function DeleteSong(props) {
    const [errorMessage, setErrorMessage] = useState(undefined)
    const song_id = props.id

    function confirmRemove() {
        axios.delete(`/api/project/song/delete/${song_id}`).then(res => {
            console.log(res)
            props.setDeleteSong(false)
        }).catch(err => {
            setErrorMessage(err.response.data)
        })
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className='delete-container'>
            <h3>Are You Sure Want to delete the song<h1>{props.title}</h1> from your project?</h3>
            <h4>This will delete all song data including: conversations, comments, and associated song files.</h4>
            <h4>This cannot be undone</h4>
            <div>
                <button onClick={() => confirmRemove()} className='confirm-button'>Delete</button>
                <button onClick={() => props.setDeleteSong(false)} className='cancel-button'>Cancel</button>
            </div>
            {errorMessage && <h1 id='song-delete-error-message'>{errorMessage}</h1>}
        </motion.div>
    )
}

export default withRouter(DeleteSong)