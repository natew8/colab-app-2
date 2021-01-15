import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import WaveSurfer from 'wavesurfer.js'
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min";
import './waveform.css'

class Waveform extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTrack: 'https://colab-user-song-version.s3-us-west-1.amazonaws.com/b498abb2-6eca-4eac-88e6-89e52f8db9f3-Moment-(Acoustic-Version).mp3',
            play: false,
            currentTime: 0,
            volume: .8
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
            interact: true,
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
        this.wavesurfer.load(this.props.version ? this.props.version : this.state.currentTrack)
        this.setState({
            volume: this.wavesurfer.setVolume(.8)
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.song_id !== this.props.match.params.song_id) {
            this.wavesurfer.load(this.state.currentTrack)

            this.setState({
                play: false
            })
        }
        if (prevProps.version != this.props.version) {
            this.wavesurfer.load(this.props.version ? this.props.version : this.state.currentTrack)
        }
    }

    componentWillUnmount() {
        this.wavesurfer.destroy()
    }

    play = () => {
        this.wavesurfer.play()
    }
    pause = () => {
        this.wavesurfer.pause()
    }
    changeSong = (val) => {
        this.setState({
            currentTrack: val,
            play: false
        })
        this.wavesurfer.load(val)
    }

    scrub = () => {
        this.wavesurfer.on('interaction', function () {
            this.wavesurfer.play()
        })
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
                <div onClick={() => this.setState({ play: false })} id='waveDisplay'>
                    <p className='version-title'>Version Title</p>
                    {/* <p>{this.state.currentTime}</p> */}
                </div>
                <div id='wave-timeline' />
                <footer className='audio-footer'>
                    <div className='controls-container'>
                        <div className='time-controllers'>
                            <img onClick={() => this.back()} className='back-button' src='https://colab-image-assets.s3-us-west-1.amazonaws.com/forward.png' alt='skip-back' />
                            <h5 className='ten-seconds'>10sec</h5>
                            <img onClick={() => this.forward()} className='forward-button' src='https://colab-image-assets.s3-us-west-1.amazonaws.com/forward.png' alt='skip-forward' />
                        </div>
                        <img className='pause-button' onClick={() => this.pause()} src='https://colab-image-assets.s3-us-west-1.amazonaws.com/pauseButton.png' alt='pause' />
                        <img className='play-button' onClick={() => this.play()} src='https://colab-image-assets.s3-us-west-1.amazonaws.com/playButton.png' alt='play' />
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
