import React from 'react'
import { withRouter } from 'react-router-dom'

function NewSong(props) {
    return (
        <div className='new-song-container'>
            <input type='text' placeholder='Title' />
            <input type='text' placeholder='Artist' />
        </div>
    )
}

export default withRouter(NewSong)