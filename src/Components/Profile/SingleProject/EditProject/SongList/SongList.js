import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { motion } from 'framer-motion'
import moment from 'moment'
import axios from 'axios'
import './songList.css'
import DeleteSong from './DeleteSong/DeleteSong'

function SongList(props) {
    const [songList, setSongList] = useState([])
    const [deleteSong, setDeleteSong] = useState(false)
    const [songName, setSongName] = useState('')
    const [songId, setSongId] = useState(0)
    const [addSong, setAddSong] = useState(false)

    let project_id = props.match.params.projectId
    useEffect(() => {
        axios.get(`/api/project/songList/${project_id}`).then(res => {
            if (res.data.length) {
                setSongList(res.data)
                setSongName(res.data.song_title)
            } else {
                setAddSong(true)
            }
        })
    }, [])

    function removeSong(title) {
        setSongName(title.song_title)
        setSongId(title.id)
        setDeleteSong(!deleteSong)
    }

    const mappedSongList = songList.map(song => {
        return (
            <div key={song.id} className='edit-song-container'>
                <div className='edit-title-artist-container'>
                    <h2 className='project-title'>{song.song_title}</h2>
                    <h2 className='artist-name'>{song.artist_name}</h2>
                </div>
                <h3>Created: <h2>{moment(song.created).format('L')}</h2></h3>
                <h3>Key:<h2>{song.song_key}</h2></h3>
                <h3>Bpm:<h2>{song.song_bpm}</h2></h3>
                <h3>Status:<h2>{song.status}</h2></h3>
                <img onClick={() => removeSong(song)} src='https://colab-image-assets.s3-us-west-1.amazonaws.com/61848.png' alt='delete' className='delete-song-icon' />
            </div >
        )
    })

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className='edit-mapped-songList'>
            {addSong ?
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    <h1>No songs in project<br></br>Click<h1>Add Song</h1> below to add a song to this project.</h1>
                </motion.div>
                :
                <>
                    {deleteSong ?
                        <DeleteSong setDeleteSong={setDeleteSong} id={songId} title={songName} />
                        :
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} id='mapped-div'>
                            {mappedSongList}
                        </motion.div>
                    }
                </>
            }
        </motion.div >
    )
}

export default withRouter(SongList)