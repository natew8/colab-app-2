import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUser } from '../../../dux/userReducer'
import './editProfile.css'

function EditProfile(props) {
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('')
    const [email, setEmail] = useState('')
    const [profile_pic, setProfile_Pic] = useState('')


    const [upload, setUpload] = useState(false)
    const [editEmail, setEditEmail] = useState(false)
    const [editUsername, setEditUsername] = useState(false)
    const [editRole, setEditRole] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('/api/auth/me').then(res => {
            setEmail(res.data.email)
            setUsername(res.data.username)
            setRole(res.data.role)
            setProfile_Pic(res.data.profile_pic)
            setLoading(false)
        })
    }, [editEmail, editRole, editUsername])


    function updateUserInfo() {
        console.log(email, username, role, profile_pic)
        axios.put('/api/user/update', { email, username, role, profile_pic }).then((res) => {
            console.log(res.data)
            props.updateUser(res.data)
            setUpload(false)
            setEditEmail(false)
            setEditUsername(false)
            setEditRole(false)
        }).catch(err => {
            console.log(err.response.data)
        })
    }

    // function exitEmailEdit() {
    //     setEmail()
    // }


    return (
        <div className='info-edit-container'>
            <div className='team-projects-header'>
                <h1 className='team-projects-title'>Edit User Info</h1>
                <div className='team-project-line'></div>
            </div>
            {loading ? <h1>Finding Info...</h1>
                :
                <>
                    <div className='pic-update-container'>
                        <img className='edit-profile-pic' src={profile_pic ? profile_pic : 'https://colab-image-assets.s3-us-west-1.amazonaws.com/defProfilePic.png'} alt='Profile' />
                        <img onClick={() => setUpload(!upload)} className='add-icon' src='https://colab-image-assets.s3-us-west-1.amazonaws.com/add.png' alt='add' />
                        {!upload ? null :
                            <div>
                                <label className='upload-input' for='file'>
                                    {/* Click here to change profile picture */}
                                    <input onChange={(e) => setProfile_Pic(e.target.value)} type='file' id='file' name='profile_pic' accept='.png, .jpg, .jpeg' />
                                </label>
                            </div>}
                    </div>
                    <form className='input-fields-container'>
                        <div className='edit-info-container'>
                            <h2 className='label'>Email:</h2>
                            {!editEmail ?
                                <h3 className='current-info'>{email}</h3>
                                :
                                <input onChange={(e) => setEmail(e.target.value)} className='edit-info-input' value={email} type='text' placeholder={email} />
                            }
                            {editEmail ?
                                <div className='input-and-exit'>
                                    <h4 className='cancel-x' onClick={() => setEditEmail(false)}>&#10006;</h4>
                                </div>
                                : <h4 className='edit-on-click' onClick={() => setEditEmail(true)}>Edit</h4>}
                        </div>
                        <div className='edit-info-container'>
                            <h2 className='label'>Username:</h2>
                            {!editUsername ?
                                <h3 className='current-info'>{username}</h3>
                                :
                                <input onChange={(e) => setUsername(e.target.value)} className='edit-info-input' value={username} type='text' placeholder={username} />
                            }
                            {editUsername ?
                                <div className='input-and-exit'>
                                    <h4 className='cancel-x' onClick={() => setEditUsername(false)}>&#10006;</h4>
                                </div>
                                : <h4 className='edit-on-click' onClick={() => setEditUsername(true)}>Edit</h4>}
                        </div>
                        <div className='edit-info-container'>
                            <h2 className='label'>Role:</h2>
                            {!editRole ?
                                <h3 className='current-info'>{role}</h3>
                                :
                                <input onChange={(e) => setRole(e.target.value)} className='edit-info-input' value={role} type='text' placeholder={role} />
                            }
                            {editRole ?
                                <div className='input-and-exit'>
                                    <h4 className='cancel-x' onClick={() => setEditRole(false)}>&#10006;</h4>
                                </div>
                                : <h4 className='edit-on-click' onClick={() => setEditRole(true)}>Edit</h4>}
                        </div>
                        {editEmail || editUsername || editRole || profile_pic ?
                            <button
                                onClick={() => updateUserInfo()}
                                className='update-button'>
                                Update
                    </button>
                            : null}
                    </form>
                </>
            }
        </div >
    )
}

function mapStateToProps(reduxState) {
    return {
        username: reduxState.username,
        profilePic: reduxState.profilePic
    }
}
export default withRouter(connect(mapStateToProps, { updateUser })(EditProfile))