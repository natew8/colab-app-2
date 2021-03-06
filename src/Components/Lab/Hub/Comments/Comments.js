import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { motion } from 'framer-motion'
import moment from 'moment'
import './comments.css'

function Comments(props) {
    //Conversation States
    const [title, setTitle] = useState('')
    const [song_version, setSong_Version] = useState('')
    const [time, setTime] = useState('')
    const [body, setBody] = useState('')
    const [date, setDate] = useState('')
    const [user, setUser] = useState('')
    const [profilePic, setProfilePic] = useState('')
    //Comment Sates
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState(undefined)

    useEffect(() => {
        axios.get(`/api/project/song/conversation/${props.convoId}`).then(res => {
            setTitle(res.data.subject_line)
            setSong_Version(res.data.song_version)
            setTime(res.data.song_time)
            setBody(res.data.body)
            setDate(res.data.convo_created)
            setProfilePic(res.data.profile_pic)
            setUser(res.data.username)
            setComment('')
        })
    }, [props.convoId, props.match.params.song_id])

    useEffect(() => {
        axios.get(`/api/project/song/conversation/comments/${props.convoId}`).then(com => {
            setComments(com.data)
        })
    }, [props.convoId, props.song_id], comment)

    function postComment() {
        if (!comment) {
            return null
        } else {
            axios.post(`/api/project/song/conversation/newComment/${props.convoId}`, { comment }).then(newCom => {
                setComment('')
                setComments(newCom.data)
            })
        }

    }

    const commentsMapped = comments.map((comment, index) => {
        return (
            <div className='comment-box'>
                <img className={comment.profilePic ? 'comment-pic' : 'comment-default-pic'} src={comment.profile_pic ? comment.profile_pic : 'https://colab-image-assets.s3-us-west-1.amazonaws.com/defProfilePic.png'} alt='user' />
                <div className='content-box'>
                    <div className='info-box'>
                        <h4 className='comment-user-info'>{comment.username}</h4>
                        <h4 className='comment-user-info-date'>{moment(comment.date_created).fromNow()}</h4>
                    </div>
                    <p className='body-body'>{comment.comment}</p>
                </div>
            </div>
        )
    })
    return (
        <div className='comments-container'>
            <div className='comments-header'>
                <h4>{title}</h4>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className='main-comment-container'>
                <img className={profilePic ? 'comm-profile-pic' : 'comm-default-pic'} src={profilePic ? profilePic : 'https://colab-image-assets.s3-us-west-1.amazonaws.com/defProfilePic.png'} alt='user' />
                <div className='content-box'>
                    <div className='info-box'>
                        <h4 className='comment-user-info'>{user}</h4>
                        <h4 className='comment-user-info-date'>{moment(date).format('L')}</h4>
                    </div>
                    <p className='body-body'>{body}</p>
                </div>
            </motion.div>
            <div className='message-line'></div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className='comment-map-container'>
                {commentsMapped}
            </motion.div>
            <div className='message-input-footer'>
                <img className={props.profilePic ? 'comment-compose-img' : 'comment-compose-default'} src={props.profilePic ? props.profilePic : 'https://colab-image-assets.s3-us-west-1.amazonaws.com/defProfilePic.png'} alt='user' />
                <form onSubmit={() => postComment()} className='comment-form'>
                    <input onChange={(e) => setComment(e.target.value)} className='comment-input-field' value={comment} type='text' placeholder='write a comment...' />
                </form>
            </div>
        </div>
    )
}

function mapStateToProps(reduxState) {
    return {
        username: reduxState.username,
        profilePic: reduxState.profilePic
    }
}

export default withRouter(connect(mapStateToProps)(Comments))