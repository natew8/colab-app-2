import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { ScaleLoader } from 'react-spinners'
import { motion } from 'framer-motion'
import WaveSurfer from 'wavesurfer.js'
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min";
import './waveform.css'

class Waveform extends Component {
    constructor(props) {
        super(props)
        this.state = {
            volume: .8,
            loading: true
        }
    }
    componentDidMount() {
        this.wavesurfer = WaveSurfer.create({
            container: '#waveDisplay',
            audioCenterImmediately: true,
            // barWidth: 4,
            // barRadius: 3,
            waveColor: '#ff9505',
            progressColor: '#d7263d',
            hideScrollbar: true,
            cursorColor: '#c6c6c6',
            cursorWidth: 1,
            scrollParent: true,
            height: 200,
            normalize: true,
            plugins: [TimelinePlugin.create({
                container: '#wave-timeline',
                notchPercentHeight: 180,
                height: 30,
                secondaryColor: 'orange',
                timeInterval: 2,
                primaryLabelInterval: 1,
            })]
        })
        this.setState({
            loading: false
        })
        this.wavesurfer.stop()
        this.setState({
            volume: this.wavesurfer.setVolume(.8)
        })
    }

    componentDidUpdate(prevProps, prevState) {
        this.wavesurfer.stop()
        if (prevProps.match.params.song_id !== this.props.match.params.song_id) {
            this.wavesurfer.load(this.props.version)
        }
        if (prevProps.version !== this.props.version) {
            this.wavesurfer.load(this.props.version)
        }
    }

    componentWillUnmount() {
        this.wavesurfer.stop()
        this.wavesurfer.destroy()
    }

    play = () => {
        this.wavesurfer.play()
    }
    pause = () => {
        this.wavesurfer.pause()
    }
    stop = () => {
        this.wavesurfer.stop()
    }

    forward = () => {
        this.wavesurfer.skipForward(10)
        this.wavesurfer.play()
    }
    back = () => {
        this.wavesurfer.skipBackward(10)
        this.wavesurfer.play()
    }
    setVolume = (val) => {
        this.wavesurfer.setVolume(val)
    }

    render() {

        return (
            <div className='audio-control-container' >
                <div className='song-info-header'>
                    <div className='lab-title-artist-container'>
                        {/* <h1 className='song-title'>Truly</h1>
                        <h2 className='song-artist'>Jay Warren</h2> */}
                        <h1 className='song-title'>{this.props.title}</h1>
                        <h2 className='song-artist'>{this.props.artist}</h2>
                    </div>
                </div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} onClick={() => this.setState({ play: false })} id='waveDisplay'>
                    <p className='version-title'>{this.props.versionTitle}</p>
                    {this.state.loading && <> <ScaleLoader /> <h1>Building Waveform</h1></>}
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} id='wave-timeline' />
                <footer className='audio-footer'>
                    <div className='controls-container'>
                        <div className='time-controllers'>
                            <img onClick={() => this.back()} className='back-button' src='https://colab-image-assets.s3-us-west-1.amazonaws.com/forward.png' alt='skip-back' />
                            <h5 className='ten-seconds'>10sec</h5>
                            <img onClick={() => this.forward()} className='forward-button' src='https://colab-image-assets.s3-us-west-1.amazonaws.com/forward.png' alt='skip-forward' />
                        </div>
                        <img className='pause-button' onClick={() => this.pause()} src='https://colab-image-assets.s3-us-west-1.amazonaws.com/pauseButton.png' alt='pause' />
                        <img className='play-button' onClick={() => this.play()} src='https://colab-image-assets.s3-us-west-1.amazonaws.com/playButton.png' alt='play' />
                        <img className='stop-button' onClick={() => this.stop()} src='https://colab-image-assets.s3-us-west-1.amazonaws.com/StopButton.png' alt='play' />
                        <div className='volume-controls-container'>
                            <input className='volume' onChange={(e) => this.setVolume(e.target.value)} value={this.state.volume} id="volume" type="range" min="0" max="1" step="0.01" />
                        </div>
                    </div>
                </footer>
            </div >
        )
    }
}

export default withRouter(Waveform)
