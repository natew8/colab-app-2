import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import Comments from '../Comments/Comments'
import './conversations.css'

function Conversations(props) {
    const [conversations, setConversations] = useState([])
    const [newConvo, setNewConvo] = useState(false)
    const [convoId, setConvoId] = useState(0)
    const [noConvo, setNoConvo] = useState(false)

    const [subject, setSubject] = useState('')
    const [time, setTime] = useState('0:00')
    const [body, setBody] = useState('')
    const [song_version, setSong_Version] = useState('')

    useEffect(() => {
        axios.get(`/api/project/song/conversations/${props.match.params.song_id}`).then(res => {
            if (!res.data.length) {
                setConversations([])
                setNoConvo(true)
                setConvoId(0)
            } else {
                setConversations(res.data)
                setNoConvo(false)
                setConvoId(res.data[0].id)
            }
        })
    }, [props.match.params.song_id, newConvo])


    function closeConvo() {
        setNewConvo(false)
        setTime('0:00')
    }
    function postConvo() {
        axios.post(`/api/project/song/newConvo/${props.match.params.song_id}`, { subject, time, song_version, body }).then(res => {
            setConversations([...conversations, res.data])
            setNewConvo(false)
            setNoConvo(false)
            setTime('0:00')
        })
    }
    const mappedConvo = conversations.map((convo, index) => {
        return (
            <div key={convo.id} onClick={() => setConvoId(convo.id)} className='con-container'>
                <img className='con-profile-pic' src={convo.profile_pic ? convo.profile_pic : 'https://colab-image-assets.s3-us-west-1.amazonaws.com/defProfilePic.png'} alt='User' />
                <div className='con-date-title'>
                    <h3 className='con-subject-line'>{convo.subject_line}</h3>
                    <p className='con-body-sample'>{convo.body}</p>
                    <h4 className='con-date'>{moment(convo.convo_created).format('L')}</h4>
                </div>
            </div>
        )
    })

    return (
        <React.Fragment>
            <div className='conversations-container'>
                <h4 className='con-header'>Conversations</h4>
                {noConvo && !newConvo ?
                    <h1 className='mapped-conversations'>Click below to start a new conversation</h1>
                    :
                    <>
                        {newConvo ?
                            <form className='new-con-form'>
                                <label>Subject</label>
                                <input onChange={(e) => setSubject(e.target.value)} type='text' placeholder='Subject Line' />
                                <label>Song time</label>
                                <input onChange={(e) => setTime(e.target.value)} maxLength='4' value={time} type='text' />
                                <input list='version-list' />
                                <select value={song_version} onChange={(e) => setSong_Version(e.target.value)} id='version-list'>
                                    {''}
                                </select>
                                <label>body</label>
                                <textarea onChange={(e) => setBody(e.target.value)} className='con-body-input' type='paragraph' placeholder='Message' />
                                <button onClick={() => postConvo()} className='post-button'>Post</button>
                            </form>
                            :
                            <div className='mapped-conversations'>
                                {mappedConvo}
                            </div>
                        }
                    </>
                }
                <div className='con-footer'>
                    {!newConvo ?
                        <button onClick={() => setNewConvo(true)} className='new-convo-button'>new</button>
                        :
                        <React.Fragment>
                            <h1 onClick={() => closeConvo()} className='exit-new-convo'>X</h1>
                        </React.Fragment>
                    }
                </div>
            </div>
            <Comments convoId={convoId} />
        </React.Fragment>

    )
}

export default withRouter(Conversations)