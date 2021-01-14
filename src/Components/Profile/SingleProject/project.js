import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './project.css'
import NewSong from './NewSong/NewSong'

function Project(props) {
    // const [projectInfo, setProjectInfo] = useState({})
    const [deadline, setDeadline] = useState('')
    const [creator, setCreator] = useState('')
    const [creatorId, setCreatorId] = useState(0)
    const [created, setCreated] = useState('')
    const [songs, setSongs] = useState([])
    //New Song State
    const [newSong, setNewSong] = useState(false)

    useEffect(() => {
        axios.get(`/api/projects/project/${props.match.params.id}`).then(res => {
            // setProjectInfo(res.data)
            setDeadline(res.data.deadline)
            setCreator(res.data.project_creator)
            setCreatorId(res.data.project_creator_id)
            setCreated(res.data.created)
            axios.get(`/api/project/songList/${props.match.params.id}`).then(res => {
                setSongs(res.data)
            })
        })
    }, [props.match.params.id, newSong])

    function goBack() {
        props.history.goBack()
    }



    const mappedSongs = songs.map((element) => {
        return (
            <Link key={element.id} style={{ textDecoration: 'none' }} to={`/user/profile/Lab/${element.id}/${props.match.params.id}`}>
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
        <div className='project-details-container'>
            <div id='header'>
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
            </div>
            {newSong ?
                <NewSong creatorId={creatorId} newSong={setNewSong} />
                :
                <React.Fragment>
                    {mappedSongs}
                </React.Fragment>
            }
            <div className='project-footer'>
                <div className='project-footer-left'>
                    <h4 onClick={() => setNewSong(!newSong)} className='footer-nav-item-2'>Add Song</h4>
                    <h4 className='footer-nav-item-2'>Edit Project Info</h4>
                </div>
                <div className='project-footer-right'>
                    <h4 className='footer-nav-item'>delete project</h4>
                </div>
            </div>
        </div >
    )
}

function mapStateToProps(reduxState) {
    return {
        username: reduxState.username,
        profilePic: reduxState.profilePic
    }
}
export default withRouter(connect(mapStateToProps)(Project))