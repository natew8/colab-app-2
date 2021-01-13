import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Waveform from '../Waveform/Waveform'
import SongDeets from '../SongDeets/SongDeets'
import Hub from '../Hub/Hub'
import './labview.css'

function LabView(props) {
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [convoView, setConvoView] = useState(true)

    useEffect(() => {
        axios.get(`/api/project/song/${props.match.params.song_id}`).then(res => {
            setTitle(res.data.title)
            setArtist(res.data.artist)
        })
    }, [props.match.params.song_id])

    function setView(bool) {
        setConvoView(bool)
    }
    return (
        // <h1>Hey</h1>
        <div className='lab-view'>
            <Waveform artist={artist} title={title} />
            <React.Fragment>
                <React.Fragment>
                    <div className='lab-nav-bar'>
                        <h2 onClick={() => setView(true)} className={convoView ? 'current-lab-nav-item' : 'lab-nav-item'}>Hub</h2>
                        <h2 onClick={() => setView(false)} className={!convoView ? 'current-lab-nav-item' : 'lab-nav-item'}>Song Details</h2>
                    </div>
                    {convoView ?
                        <Hub song_id={props.match.params.song_id} />
                        :
                        <SongDeets song_id={props.match.params.song_id} />
                    }
                </React.Fragment>
            </React.Fragment>
        </div>
    )
}

export default withRouter(LabView)