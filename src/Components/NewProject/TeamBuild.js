import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import './teamBuild.css'

function TeamBuild(props) {
    const [users, setUsers] = useState([])
    const [team, setTeam] = useState([])
    const [filter, setFilter] = useState('')
    const [loading, setLoading] = useState(true)
    const project_id = props.projectId
    const project_creator_id = props.creatorId

    useEffect(() => {
        axios.get('/api/auth/users').then(res => {
            setUsers(res.data)
            setLoading(false)
        })
    }, [team])


    useEffect(() => {
        axios.get(`/api/project/team/${project_id}`).then(res => {
            setTeam(res.data)
        })
    }, [])


    function addUser(users_id) {
        axios.post(`/api/project/invite/${project_id}`, { users_id, project_creator_id }).then(res => {
            setTeam([...team, res.data])
        })
        console.log(team)
    }

    function removeUser(users_id) {
        console.log(users_id)
        axios.delete(`/api/project/remove/${users_id}/${props.projectId}/${props.creatorId}`).then(res => {
            const newArr = [...team]
            const targetI = newArr.findIndex((userObj) => {
                return userObj.id === users_id
            })
            newArr.splice(targetI, 1)
            setTeam(newArr)
        }).catch(err => {
            console.log(err.response.data)
        })
    }

    function handleFilter(filter) {
        // console.log(filter)
        setFilter(filter)

    }

    const filteredUsers = users.filter((element, index) => {
        return element.username.includes(filter.toLocaleLowerCase())
    }).map((element, index) => {
        return (
            <div key={element.id} className='user-container'>
                <div className='build-team-user'>
                    <img
                        className={element.profile_pic ? 'build-team-profile-pic' : 'build-team-default-pic'}
                        src={element.profile_pic ? element.profile_pic : 'https://colab-image-assets.s3-us-west-1.amazonaws.com/defProfilePic.png'}
                        alt='user' />
                    <h3 className='build-team-display-username'>{element.username}</h3>
                </div>
                <h4 className='build-role'>{element.role}</h4>
                <img onClick={() => addUser(element.id)} alt='add' className='add-user-icon' src='https://colab-image-assets.s3-us-west-1.amazonaws.com/add.png'></img>
            </div >
        )
    })

    const mappedTeam = team.map((element, index) => {
        return (
            <div key={element.id} className='user-container'>
                <div className='build-team-user'>
                    <img
                        className={element.profile_pic ? 'new-team-profile-pic' : 'new-team-default-pic'}
                        src={element.profile_pic ? element.profile_pic : 'https://colab-image-assets.s3-us-west-1.amazonaws.com/defProfilePic.png'}
                        alt='user'
                    />
                    <h3 className='build-team-display-username'>{element.username}</h3>
                </div>
                <h4 className='build-role'>{element.role}</h4>
                <img onClick={() => removeUser(element.id)} alt='remove' className='remove-user-icon' src='https://colab-image-assets.s3-us-west-1.amazonaws.com/Minus.png'></img>
            </div>
        )
    })

    // console.log(mappedTeam)
    return (
        <div className='team-build-container'>
            {loading ?
                <div className='loading-dot-box'>
                    <h1 className='loading-text'>loading</h1>
                    <div className='loading-dot-1'></div>
                    <div className='loading-dot-2'></div>
                    <div className='loading-dot-3'></div>
                </div>
                :
                <React.Fragment>
                    <div className='build-team-header'>
                        <h1 className='build-team-title'>build your team...</h1>
                        {/* <div className='team-project-line'></div> */}
                    </div>
                    <input onChange={(e) => handleFilter(e.target.value)} type='text' className='filter-users-input' placeholder='Search Users' />
                    <div className='team-build'>
                        <div className='user-map-container'>
                            <h3 className='user-map-header'>User List</h3>
                            {filteredUsers}
                        </div>
                        <div className='team-container'>
                            <h3 className='user-map-header'>Team List</h3>
                            <React.Fragment>{mappedTeam}</React.Fragment>
                        </div>
                    </div>
                </React.Fragment>
            }
        </div>
    )
}
export default withRouter(TeamBuild)