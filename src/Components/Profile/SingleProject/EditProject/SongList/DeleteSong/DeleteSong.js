import React from 'react'
import { withRouter } from 'react-router-dom'
import { motion } from 'framer-motion'
import './deleteSong.css'

function DeleteSong(props) {

    function confirmRemove() {

    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className='delete-container'>
            <h3>Are You Sure Want to delete<h1>{props.title}</h1> from your project?</h3>
            <h3>This will delete all song data and associated files.</h3>
            <div>
                <button className='confirm-button'>Delete</button>
                <button onClick={() => props.setDeleteSong(false)} className='cancel-button'>Cancel</button>
            </div>
        </motion.div>
    )
}

export default withRouter(DeleteSong)