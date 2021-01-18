import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Waveform from '../Waveform/Waveform'
import SongDeets from '../SongDeets/SongDeets'
import Hub from '../Hub/Hub'
import './labview.css'
import WaveForm2 from '../Waveform/WaveForm2'

function LabView(props) {
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [convoView, setConvoView] = useState(true)

    const [noVersion, setNoVersion] = useState(true)
    const [currentVersion, setCurrentVersion] = useState('')

    useEffect(() => {
        axios.get(`/api/project/song/${props.match.params.song_id}`).then(res => {
            setTitle(res.data.title)
            setArtist(res.data.artist)
            axios.get(`/api/project/song/versions/${props.match.params.song_id}`).then(res => {
                if (!res.data.length) {
                    setCurrentVersion('')
                } else {
                    setNoVersion(false)
                    setCurrentVersion(res.data[0].audio_file)
                }
            })
        })
    }, [props.match.params.song_id])

    function setVersion(url) {
        setCurrentVersion(url)
        setNoVersion(false)
    }


    function setView(bool) {
        setConvoView(bool)
    }
    return (
        <div className='lab-view'>
            {noVersion ?
                <WaveForm2 version={currentVersion} artist={artist} title={title} />
                :
                <Waveform version={currentVersion} artist={artist} title={title} />
            }
            <React.Fragment>
                <React.Fragment>
                    <div className='lab-nav-bar'>
                        <h2 onClick={() => setView(true)} className={convoView ? 'current-lab-nav-item' : 'lab-nav-item'}>Hub</h2>
                        <h2 onClick={() => setView(false)} className={!convoView ? 'current-lab-nav-item' : 'lab-nav-item'}>Song Details</h2>
                    </div>
                    {convoView ?
                        <Hub setVersion={setVersion} song_id={props.match.params.song_id} />
                        :
                        <SongDeets song_id={props.match.params.song_id} />
                    }
                </React.Fragment>
            </React.Fragment>
        </div>
    )
}

export default withRouter(LabView)