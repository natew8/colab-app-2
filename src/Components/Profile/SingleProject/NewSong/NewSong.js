import axios from 'axios'
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScaleLoader } from 'react-spinners'

import './newSong.css'

function NewSong(props) {
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    //Key Signature
    const [letter, setLetter] = useState('C')
    const [majMinor, setMajMinor] = useState('')
    // const [key, setKey] = useState('')
    //----
    const [bpm, setBpm] = useState('')
    const [time, setTime] = useState('0:00')
    const [status, setStatus] = useState('In Progress')
    const [notes, setNotes] = useState('')
    const [loading, setLoading] = useState(false)
    //project_id
    const project_id = props.match.params.projectId
    const project_creator_id = props.creatorId


    function createSong() {
        setLoading(true)
        const fullKey = `${letter}${majMinor}`
        axios.post('/api/project/addSong', { project_id, title, artist, key: fullKey, bpm, time, status, notes, project_creator_id }).then(res => {
            setLoading(false)
            props.newSong()
        })
    }


    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className='add-song-container'>
            {loading ?
                <div className='new-song-loading'>
                    <ScaleLoader />
                    <h1>Creating song...</h1>
                </div>
                :
                <>
                    <h1 className='add-song-title'>Create new Song
                    <h4 onClick={() => props.newSong()}>X</h4>
                    </h1>
                    <div className='team-project-line'></div>
                    <div className='new-song-inputs-container'>
                        <h2 id='input-label' >Song title / Artist name</h2>
                        <div className='inputs-box'>
                            <input onChange={(e) => setTitle(e.target.value)} id='title-input' type='text' placeholder='Song title' />
                            <input onChange={(e) => setArtist(e.target.value)} id='artist-input' type='text' placeholder='Artist' />
                        </div>
                    </div>
                    <div className='new-song-inputs-container'>
                        <h2 id='input-label' >Key / Bpm / Length</h2>
                        <div className='inputs-box'>
                            <div className='key-inputs'>
                                <label for='letter-list' id='letter-label'>
                                    Key
                            <select value={letter} onChange={(e) => setLetter(e.target.value)} id='letter-list'>
                                        <option value='C'>C</option>
                                        <option value='D'>D</option>
                                        <option value='E'>E</option>
                                        <option value='F'>F</option>
                                        <option value='G'>G</option>
                                        <option value='A'>A</option>
                                        <option value='B'>B</option>
                                        <option value='C#/Db'>C#/Db</option>
                                        <option value='D#/Eb'>D#/Eb</option>
                                        <option value='F#/Gb'>F#/Gb</option>
                                        <option value='G#/Ab'>G#/Ab</option>
                                        <option value='A#/Bb'>A#/Bb</option>
                                    </select>
                                </label>
                                <label for='maj-minor-list' id='maj-minor-label'>
                                    Major/Minor
                            <select value={majMinor} onChange={(e) => setMajMinor(e.target.value)} id='maj-minor-list'>
                                        <option value='major'>major</option>
                                        <option value='minor'>minor</option>
                                    </select>
                                </label>
                            </div>
                            <div className='bpm-barrier-line'></div>
                            <input onChange={(e) => setBpm(e.target.value)} id='bpm' type='text' placeholder='Bpm' />
                            <div className='bpm-barrier-line'></div>
                            <input onChange={(e) => setTime(e.target.value)} id='time' type='text' maxLength='4' placeholder='0:00' />
                        </div>
                    </div>
                    <div className='new-song-inputs-container' >
                        <h2 id='input-label' >Song Status / Notes</h2>
                        <label id='status-label' for='status-list'>Status:
                            <select value={status} onChange={(e) => setStatus(e.target.value)} name='status' id='status-list'>
                                <option value='In progress'>In Progress</option>
                                <option value='Complete'>Complete</option>
                            </select>
                        </label>
                        <textarea onChange={(e) => setNotes(e.target.value)} className='notes-text-area' placeholder='Notes' />
                    </div>
                    <button onClick={() => createSong()} className='add-song-button'>Add Song</button>
                </>
            }
        </motion.div >
    )
}

export default withRouter(NewSong)