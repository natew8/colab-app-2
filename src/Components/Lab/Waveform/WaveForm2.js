import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { motion } from 'framer-motion'
import './waveform.css'

function Waveform(props) {
    const [wave, setWave] = useState(undefined)
    useEffect(() => {
    }, [])

    return (
        <div className='audio-control-container' >
            <div className='song-info-header'>
                <div className='lab-title-artist-container'>
                    <h1 className='song-title'>{props.title}</h1>
                    <h2 className='song-artist'>{props.artist}</h2>
                </div>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} id='waveDisplay-2'>
                <h1>Please upload a song file...</h1>
            </motion.div>
            <footer className='audio-footer'>
                <div className='controls-container'>
                    <div className='time-controllers'>
                        <img className='back-button' src='https://colab-image-assets.s3-us-west-1.amazonaws.com/forward.png' alt='skip-back' />
                        <h5 className='ten-seconds'>10sec</h5>
                        <img className='forward-button' src='https://colab-image-assets.s3-us-west-1.amazonaws.com/forward.png' alt='skip-forward' />
                    </div>
                    <img className='pause-button' src='https://colab-image-assets.s3-us-west-1.amazonaws.com/pauseButton.png' alt='pause' />
                    <img className='play-button' src='https://colab-image-assets.s3-us-west-1.amazonaws.com/playButton.png' alt='play' />
                    <img className='stop-button' src='https://colab-image-assets.s3-us-west-1.amazonaws.com/StopButton.png' alt='play' />
                    <div className='volume-controls-container'>
                        <input className='volume' value={{}} id="volume" type="range" min="0" max="1" step="0.01" />
                    </div>
                </div>
            </footer>
        </div >
    )
}

export default withRouter(Waveform)