import axios from 'axios'
import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import './songDeets.css'

function SongDeets(props) {
    // const [title, setTitle] = useState('')
    // const [artist, setArtist] = useState('')
    // const [key, setKey] = useState('')
    // const [bpm, setBpm] = useState('')
    // const [time, setTime] = useState('0:00')

    useEffect(() => {
        axios.get(`/api/project/song/${props.match.params.song_id}`).then(song => {
            console.log(song.data)
            // setTitle(song.data.title)
            // setArtist(song.data.artist)
            // setKey(song.data.key)
            // setBpm(song.data.bpm)
            // setTime(song.data.bpm)
        })
    }, [props.match.params.song_id])


    return (
        <div className='deets-view'>
            <div id='view-outline'>
            </div>
        </div>
    )
}

export default withRouter(SongDeets)