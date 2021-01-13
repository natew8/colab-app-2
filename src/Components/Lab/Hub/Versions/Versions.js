import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { v4 as randomString } from 'uuid'
import './versions.css'

function Versions(props) {
    const [isUploading, setIsUploading] = useState(false)
    const [url, setUrl] = useState('url')

    function getSignedRequest([file]) {
        setIsUploading(true)
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`
        setIsUploading(false)
        axios.get('/api/s3', {
            params: {
                'file-name': fileName,
                'file-type': file.type,
            }
        }).then(res => {
            console.log(res.data)
            const { signedRequest, url } = res.data
            uploadFile(file, signedRequest, url)
        }).catch(err => {
            console.log(err.response.data)
        })
    };

    function uploadFile(file, signedRequest, url) {
        const options = {
            headers: {
                'Content-Type': file.type
            }
        }
        axios.put(signedRequest, file, options).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }


    return (
        <div className='versions-container'>
            <h4 className='version-header'>Song Files</h4>
            {isUploading ? <h1>Loading... </h1> : <h1>Upload</h1>}
            <h3>{url}</h3>
            <input
                multiple
                onChange={(e) => getSignedRequest(e.target.files)}
                type='file'
                accept='audio/*'
                capture='file' />
        </div>
    )
}

export default withRouter(Versions)