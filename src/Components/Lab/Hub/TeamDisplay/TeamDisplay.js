import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import './teamdisplay.css'


function TeamDisplay(props) {
    const [team, setTeam] = useState([])
    useEffect(() => {
        axios.get(`/api/project/team/${props.match.params.project_id}`).then(res => {
            setTeam(res.data)
        })
    }, [props.match.params.project_id])


    const mappedTeam = team.map((user, index) => {
        return (
            <div key={user.id} className='member-container'>
                <img className={user.profile_pic ? 'team-profile-pic' : 'team-default-pic'}
                    src={user.profile_pic ? user.profile_pic : 'https://colab-image-assets.s3-us-west-1.amazonaws.com/defProfilePic.png'} alt='user' />
                <h3 className='team-display-username'>{user.username}</h3>
            </div>
        )
    })


    return (
        <div className='project-team-container'>
            <h4 className='team-header'>Team</h4>
            {mappedTeam}
        </div>
    )
}

export default withRouter(TeamDisplay)