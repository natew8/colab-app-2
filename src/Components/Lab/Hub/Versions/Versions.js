import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { CircleLoader } from 'react-spinners'
import axios from 'axios'
import { v4 as randomString } from 'uuid'
import './versions.css'

function Versions(props) {
    const [newUpload, setNewUpload] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)


    useEffect(() => {

    }, [])

    function goNext(val) {
        setTitle(val)
    }

    function setClose() {
        setNewUpload(false)
        setTitle('')
        setUrl('')
        setError(false)
    }
    function getSignedRequest([file]) {
        setIsUploading(true)
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`
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
        console.log(file, signedRequest, url)
        const options = {
            headers: {
                'Content-Type': file.type
            }
        }
        console.log('hit2')
        axios.put(signedRequest, file, options).then(res => {
            console.log('hit3')
            // setUrl(res.url)
            // axios.post(`/api/project/song/addVersion/${props.match.params.song_id}`, { title, url: res.url }).then(ver => {
            //     setIsUploading(false)
            //     setUrl(ver.url)
            // }).catch(err => {
            //     console.log(err)
            // })
        }).catch(err => {
            console.log(err.response)
            setError(true)
            setIsUploading(false)
        })
    }


    return (
        <div className='versions-container'>
            <h4 className='version-header'>Song Files</h4>
            {newUpload ?
                <div className='version-loading-container'>
                    {isUploading ?
                        <CircleLoader />
                        :
                        <>
                            <h3 className='version-title-header'>Song Title...</h3>
                            <input className='version-title-input' onChange={(e) => goNext(e.target.value)} value={title} type='text' placeholder='Filename' />
                            {title !== '' ?
                                <label className='upload-input-label' htmlFor='version-upload-input'>
                                    File for upload...
                            <input
                                        id='version-upload-input'
                                        multiple
                                        onChange={(e) => getSignedRequest(e.target.files)}
                                        type='file'
                                        accept='audio/*'
                                        capture='file' />
                                </label>
                                :
                                null
                            }
                        </>
                    }
                </div>
                :
                <div className='version-loading-container'>
                    {isUploading ?
                        <h1>Loading...</h1>
                        :
                        <React.Fragment>
                            <h3>Mapped Versions</h3>
                        </React.Fragment>
                    }
                </div>
            }
            {error ? <h1>Upload failed, please try again.</h1> : null}
            <div className='version-footer'>
                {!newUpload ?
                    <button
                        onClick={() => setNewUpload(!newUpload)}
                        className='new-version-button'
                    >Upload</button>
                    :
                    <h1 onClick={() => setClose()} className='exit-new-convo'>X</h1>
                }
            </div>
        </div >
    )
}

export default withRouter(Versions)