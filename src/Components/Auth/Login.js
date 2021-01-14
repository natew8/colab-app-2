import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './auth.css'

function Login(props) {
    const [email, handleEmail] = useState('')
    const [password, handlePassword] = useState('')
    const [emptyError, handleEmptyError] = useState('')
    const [error, handleError] = useState('')
    const [loading, handleLoading] = useState(false)

    function userLogin() {
        if (email === '' || password === '') {
            return handleEmptyError('Missing required fields'), handleError('')
        } else {
            handleLoading(true)
            axios.post('/api/auth/login', { email, password }).then(res => {
                props.history.push('/user/profile')
                handleEmail('')
                handlePassword('')
                handleError('')
                handleLoading(false)
            }).catch(err => {
                console.log(err.response.data)
                handleLoading(false)
                handleError(err.response.data)
                handleEmptyError('')
            })
        }
    }

    const empty = <h6 className='required-field'>*</h6>

    return (
        <motion.div
            initial={{ x: '100vw' }}
            animate={{ x: 0 }}
            transition={{ type: 'tween', duration: .75 }}
            className='login-view' >

            {loading ? <h1 className='logging-in'>Retrieving your profile. <br></br> Think about how amazing you are</h1> : <div className='login-container'>
                <p className='back-arrow'>
                    <Link style={{ textDecoration: 'none' }} to='/'> &larr;</Link>
                </p>
                <img className='login-logo' src='https://colab-image-assets.s3-us-west-1.amazonaws.com/ColabLogoAllBlack.png' alt=' Logo' />
                <h1 className='welcome-message'>Welcome Back</h1>
                <form className='auth-reg-log-form' >
                    <input className={emptyError ? 'input-error' : 'input-field'} type='text' placeholder='email' value={email} onChange={(e) => handleEmail(e.target.value)} />
                    {emptyError && <h6 className='required-field'>*</h6>}
                    <input className={emptyError ? 'input-error' : 'input-field'} type='password' placeholder='password' value={password} onChange={e => handlePassword(e.target.value)} />
                    {emptyError && <h6 className='required-field'>*</h6>}
                    {emptyError && <p className='error-message'>{emptyError}</p>}
                    {error && <p className='error-message'>{error}</p>}
                    <button onClick={() => userLogin()}>Login</button>
                </form>
                <h4 className='link-to-login'>
                    <Link className='link-to-login' style={{ textDecoration: 'none' }} to='/register'>
                        Not a member yet? Sign Up!
                    </Link>
                </h4>
            </div>}
        </motion.div >
    )
}

export default Login