import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { motion } from 'framer-motion'
import './hub.css'
import Conversations from './Conversations/Conversations'
import TeamDisplay from './TeamDisplay/TeamDisplay'
import Versions from './Versions/Versions'

function Hub(props) {



    return (
        <div className='hub-view'>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} id='view-outline'>
                {/* <TeamDisplay /> */}
                {/* <div className='dividing-line'></div> */}
                <Conversations />
                <div className='dividing-line'></div>
                <Versions setVersion={props.setVersion} />
            </motion.div>
        </div>
    )
}

function mapStateToProps(reduxState) {
    return {
        username: reduxState.username,
        profilePic: reduxState.profilePic
    }
}

export default withRouter(connect(mapStateToProps)(Hub))