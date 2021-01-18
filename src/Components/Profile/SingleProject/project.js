import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { motion } from 'framer-motion'
import './project.css'
import NewSong from './NewSong/NewSong'
import EditProject from './EditProject/EditProject'

function Project(props) {
    const [deadline, setDeadline] = useState('')
    const [creator, setCreator] = useState('')
    const [creatorId, setCreatorId] = useState(0)
    const [created, setCreated] = useState('')
    const [songs, setSongs] = useState([])
    //New Song State
    const [newSong, setNewSong] = useState(false)
    const [editProject, setEditProject] = useState(false)

    useEffect(() => {
        axios.get(`/api/projects/project/${props.match.params.projectId}`).then(res => {
            setDeadline(res.data.deadline)
            setCreator(res.data.project_creator)
            setCreatorId(res.data.project_creator_id)
            setCreated(res.data.created)
            axios.get(`/api/project/songList/${props.match.params.projectId}`).then(res => {
                setSongs(res.data)
            })
        })
    }, [props.match.params.id, newSong, editProject])

    function goBack() {
        props.history.goBack()
    }



    const mappedSongs = songs.map((element) => {
        return (
            <Link key={element.id} style={{ textDecoration: 'none' }} to={`/user/profile/Lab/${element.id}/${props.match.params.projectId}`}>
                <div className='song-container'>
                    <div className='title-artist-container'>
                        <h2 className='project-title'>{element.song_title}</h2>
                        <h2 className='artist-name'>{element.artist_name}</h2>
                    </div>
                    <h3>{element.status}</h3>
                </div >
            </Link>
        )
    })


    return (
        <>
            {editProject ?
                <EditProject newSong={newSong} setNewSong={setNewSong} setEditProject={setEditProject} />
                :
                <div className='projects-container'>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} id='header'>
                        <img onClick={() => goBack()} className='back-arrow-project' src='https://colab-image-assets.s3-us-west-1.amazonaws.com/backArrow.png' alt='back' />
                        <h1 className='single-title'>{props.match.params.project_title}</h1>
                        <div className='team-project-line'></div>
                        <div className='project-details-header'>
                            <h2 className='details-header-item'>Project Creator: {creator}</h2>
                            {/* <h2 className='details-header-item'>Project Creator: Blah</h2> */}
                            <div className='barrier-line'></div>
                            <h2 className='details-header-item'>Deadline: {deadline}</h2>
                            {/* <h2 className='details-header-item'>Deadline: 02/29/00</h2> */}
                            <div className='barrier-line'></div>
                            <h2 className='details-header-item'>Created On: {created}</h2>
                            {/* <h2 className='details-header-item'>Created On: 04/28/2020 </h2> */}
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5, duration: 1 }} className='new-mapped-song-container' >
                        {newSong ?
                            <NewSong creatorId={creatorId} newSong={setNewSong} />
                            :
                            <div className='mapped-songs-box'>{mappedSongs}</div>
                        }
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .75, duration: 1 }} className='project-footer'>
                        <h4 onClick={() => setNewSong(!newSong)} className='footer-nav-item-2'>Add Song</h4>
                        <h4 onClick={() => setEditProject(true)} className='footer-nav-item'>Edit Project Info</h4>
                    </motion.div>
                </div >
            }
        </>
    )
}

function mapStateToProps(reduxState) {
    return {
        username: reduxState.username,
        profilePic: reduxState.profilePic,
        id: reduxState.id
    }
}
export default withRouter(connect(mapStateToProps)(Project))