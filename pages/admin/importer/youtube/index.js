import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../../components/layouts/AdminLayout';
import { updateSetting, getSetting, youtubeDataScrapper } from '../../../../_variables/ajaxVariables'
import withRouter from 'next/dist/client/with-router';
import { savePost } from '../../../../_variables/ajaxPostsVariables'
import { AppContext } from '../../../../context/AppContext'

const youtube = props => {
    const contextData = useContext(AppContext);
    const urlsElement = useRef(null)
    const [ state, setState ] = useState({
        apiKey: '',
        scrapedVideos: []
    });

    const onImportHandler = () => {
        const data = urlsElement.current.value.split(/\r?\n/)
        const ids = data.map(url => url.split('?v=')[1])

        data.forEach(url => {
            if (url.includes('http')) {
                contextData.dispatchState({
                    ...contextData.state,
                    loading:true
                })
                youtubeDataScrapper(url).then(res => {
console.log(res.data.video )
                    const durationToString = duration => {
                        const hours = duration.hours === 0 ? '' :
                            duration.hours < 10 ? '0' + duration.hours.toString() + ':' :
                                duration.hours.toString() + ':'


                        const min = duration.minutes === 0 ? '' :
                            duration.minutes < 10 ? '0' + duration.minutes.toString() + ':' :
                                duration.minutes.toString() + ':'


                        const sec = duration.seconds < 10 ?
                            '0' + duration.seconds.toString() :
                            duration.seconds.toString()

                        return hours + min + sec
                    }


                    const videoData = {
                        title: res.data.video.title,
                        quality: res.data.video.raw.contentDetails.definition === 'hd' ? '1080p' : '480p',
                        mainThumbnail:  res.data.video.thumbnails.standard.url ,
                        duration: durationToString(res.data.video.duration),
                        videoEmbedCode: `https://www.youtube.com/embed/${ res.data.video.id }`,
                        description: res.data.video.description,
                        postType: 'video',
                        downloadLink: url,
                        status: 'draft',
                        lastModify: Date.now(),
                        likes:0,
                        disLikes:0,
                        views:0
                    }
                    savePost(videoData, window.location.origin).then(()=>{
                        console.log( 'saved')
                    }).catch(err=>{
                        console.log( err.response.data.error )
                        contextData.dispatchAlert({
                            ...contextData.alert,
                            active:true,
                            alertMessage:err.response.data.error + ' => ' + videoData.title,
                            type:'error'
                        })
                    })
                    // console.log(videoData)
                    // console.log(res.data.video)
                    contextData.dispatchState({
                        ...contextData.state,
                        loading:false
                    })
                }).catch(err=>{

                    contextData.dispatchState({
                        ...contextData.state,
                        loading:false
                    })
                })
            }
        })

    }

    const onSetDataForTest = () => {
        urlsElement.current.value =
            'https://youtu.be/aStiz9p0LGM?list=RDNYhxaZXXwsg' + '\n'
    }

    const onSaveApiKeyHandler = () => {
        const data = {
            apiKey: state.apiKey
        }
        updateSetting('youtubeApiKey', data).then(() => {
            props.router.push({ pathname: props.router.pathname, query: { ...props.router.query } })
        })
    }

    const onChaneHandler = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        getSetting('youtubeApiKey', false, window.location.origin).then(res => {
            const apiKeyData = res.data.setting ? res.data.setting.data.apiKey : ''
            setState({
                ...state,
                apiKey: apiKeyData
            })
        })
    }, []);

    return (
        <AdminLayout>
            <div className='admin-import-page-youtube-api-key'>
                <h2>Youtube API KEY</h2>
                <input name='apiKey' value={ state.apiKey } onChange={ e => onChaneHandler(e) }/>
                <button onClick={ () => onSaveApiKeyHandler() } className='saveBtn'>Save API Key</button>
            </div>
            <div className='admin-import-page-youtube'>
                <h1>Youtube Importer</h1>
                <textarea ref={ urlsElement }/>
                <button className='saveBtn' onClick={ () => onImportHandler() }>Import</button>
                <button className='saveBtn' onClick={ () => onSetDataForTest() }>setTestData</button>
            </div>

        </AdminLayout>
    );
};
export default withRouter(youtube);
//https://www.youtube.com/watch?v=a_aFiYJhIjU
// https://www.youtube.com/watch?v=lh1f4eL9BWI