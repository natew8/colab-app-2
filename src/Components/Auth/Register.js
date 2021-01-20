import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUser } from '../../dux/userReducer'
// import Logo from '../../orangeScarlet-blackText.png'
import axios from 'axios'

function Register(props) {
    const [email, handleEmail] = useState('')
    const [role, handleRole] = useState('Role')
    const [username, handleUsername] = useState('')
    const [password, handlePassword] = useState('')
    const [confirmPass, handleConfirmPass] = useState('')
    const [passError, handlePassError] = useState('')
    const [emptyError, handleEmptyError] = useState('')
    const [error, handleError] = useState('')
    const [loading, handleLoading] = useState(false)

    function userRegister() {
        if (email === '' || username === '' || password === '' || confirmPass === '') {
            return handleEmptyError('Missing required fields')
        }
        if (password !== confirmPass) {
            return handlePassError('Passwords do not match.')
        }
        handleLoading(true)
        axios.post('/api/auth/register', { username, email, password, role }).then(res => {
            console.log(res.data)
            props.updateUser(res.data)
            handleEmail('')
            handleRole('')
            handleUsername('')
            handlePassword('')
            handleConfirmPass('')
            handleLoading(false)
            props.history.push('/user/profile')
        }).catch(err => {
            console.log(err)
            handleLoading(false)
            handleError(err.response.data)
            handleEmptyError('')
            handlePassError('')
        })
    }


    return (
        <div className='login-view' >
            {loading ? <h1 className='logging-in'>Creating your profile. <br></br> Welcome to Colab!</h1>
                :
                <motion.div
                    initial={{ x: '100vw' }}
                    animate={{ x: 0 }}
                    transition={{ type: 'tween', duration: .75, ease: 'easeInOut' }}
                    exit={{ x: '-100vw' }}
                    className='register-container'>
                    <p className='back-arrow'>
                        <Link style={{ textDecoration: 'none' }} to='/'>&larr;</Link>
                    </p>
                    <img className='login-logo' src='https://colab-image-assets.s3-us-west-1.amazonaws.com/ColabLogoAllBlack.png' alt='Logo' />
                    <h1 className='welcome-message'>Welcome!</h1>
                    <h5 className='link-to-login-top'>
                        <Link className='link-to-login-top' style={{ textDecoration: 'none' }} to='/login'>
                            Already a member? Sign In!
                         </Link>
                    </h5>
                    <form className='auth-reg-log-form'>
                        <input
                            className={emptyError ? 'input-error' : 'input-field'}
                            type='text'
                            placeholder='email' value={email}
                            onChange={(e) => handleEmail(e.target.value)} />
                        {emptyError && <h6 className='required-field'>*</h6>}
                        <input
                            className={emptyError ? 'input-error' : 'input-field'}
                            type='text'
                            placeholder='username'
                            value={username}
                            onChange={(e) => handleUsername(e.target.value)} />
                        {emptyError && <label className='required-field'>*</label>}
                        <input
                            className={emptyError || passError ? 'input-error' : 'input-field'}
                            type='password'
                            placeholder='password'
                            value={password}
                            onChange={e => handlePassword(e.target.value)} />
                        {emptyError && <h6 className='required-field'>*</h6>}
                        {passError && <h6 className='required-field'>*</h6>}
                        <input
                            className={emptyError || passError ? 'input-error' : 'input-field'}
                            type='password'
                            placeholder='confirm password'
                            value={confirmPass}
                            onChange={e => handleConfirmPass(e.target.value)} />
                        {emptyError && <h6 className='required-field'>*</h6>}
                        {passError && <h6 className='required-field'>*</h6>}
                        <select id='select-input-field' onChange={(e) => handleRole(e.target.value)}>
                            <option value='' disabled selected >Please Select Interest...</option>
                            {/* <option value='Singer'>Producer</option> */}
                            <option value='Songwriter'>Songwriter</option>
                            <option value='Producer'>Producer</option>
                            <option value='Mixing/Mastering'>Mixing/Mastering</option>
                            <option value='Management'>Management</option>
                            <option value='Artist'>Artist</option>
                            <option value='Other'>Other</option>
                        </select>
                        {emptyError && <p className='error-message'>{emptyError}</p>}
                        {passError && <p className='error-message'>{passError}</p>}
                        {error && <p className='error-message'>{error}</p>}
                        <button onClick={() => userRegister()}>signup</button>
                    </form>
                    <h5 className='link-to-login'>
                        <Link className='link-to-login' style={{ textDecoration: 'none' }} to='/login'>
                            Already a member? Sign In!
                         </Link>
                    </h5>
                </motion.div>}
        </div >
    )
}

export default connect(null, { updateUser })(Register)