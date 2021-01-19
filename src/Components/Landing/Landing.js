import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { motion } from 'framer-motion'
import './landing.css'
const containerVariants = {
    exit: {
        x: '-100vw',
        transition: { ease: 'easeInOut' }
    }
}

const logoVariants = {
    initial: {
        opacity: 0,
        y: 70
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1
        }
    }
}

const h1Variant = {
    initial: {
        opacity: 0
    },
    visible: {
        scale: 1.2,
        opacity: 1,
        transition: {
            delay: .5,
            duration: 1
        }
    }
}

const h2Variant = {
    initial: {
        opacity: 0
    },
    visible: {
        scale: 1.2,
        opacity: 1,
        transition: {
            delay: 2,
            duration: 1
        }
    }
}


function Landing() {
    return (
        <div variants={containerVariants} exit='exit' className='landing'>
            <motion.div variants={containerVariants} exit='exit' className='welcome-banner'>
                <div className='welcome-banner'>
                    <motion.img
                        variants={logoVariants}
                        initial='initial'
                        animate='visible'
                        className='colab-logo'
                        src='https://colab-image-assets.s3-us-west-1.amazonaws.com/ColabLogoWhite.png'
                        alt='Logo' />
                    <div className='text-box'>
                        <motion.h1
                            variants={h1Variant}
                            initial='initial'
                            animate='visible'>
                            Welcome to Colab
                        </motion.h1>
                        <motion.h2
                            variants={h2Variant}
                            initial='initial'
                            animate='visible'>
                            Where creatives come together
                        </motion.h2>
                    </div>
                    <Link to='/register'>
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ scale: 1.2, opacity: 1 }}
                            transition={{ delay: 3.5, duration: .5, type: 'tween' }}
                            className='register-button'>
                            Signup
                    </motion.button>
                    </Link>
                    <Link to='/login'>
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ scale: 1.2, opacity: 1 }}
                            transition={{ delay: 3.5, duration: .5 }}
                            className='login-button'>Login
                    </motion.button>
                    </Link>
                    {/* <img className='landing-background' src='https://colab-image-assets.s3-us-west-1.amazonaws.com/Colab+Background+1.png' alt='background' /> */}
                </div>
            </motion.div>
        </div >
    )
}

export default withRouter(Landing)