import React from 'react'
import { withRouter } from 'react-router-dom'

function DeleteProject(props) {
    const project_id = props.match.params.projectId
    const project_creator_id = props.creatorId

    return (
        <h1>{project_id}</h1>
    )
}

export default withRouter(DeleteProject)