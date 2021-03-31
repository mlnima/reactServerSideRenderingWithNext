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


    const onImportHandler = async () => {
        const data = urlsElement.current.value.split(/\r?\n/)
        const ids = data.map(url => url.split('?v=')[1])

        for await (let url of data){
            if (url.includes('http')) {
                contextData.dispatchState({
                    ...contextData.state,
                    loading:true
                })
                youtubeDataScrapper(url).then(async res => {
                    //  console.log(res.data.videos)
                    for await (let video of res.data.videos){
                        if (video.id){
                            const videoData = {
                                title: video.title ?video.title:'',
                                quality:video.raw.contentDetails?video.raw.contentDetails.definition === 'hd' ? '1080p' : '480p':'1080',
                                //quality:'1080',
                                mainThumbnail: video.thumbnails.medium ? video.thumbnails.medium.url: '' ,
                                duration: video.duration? durationToString(video.duration):'00:00',
                                videoEmbedCode: `https://www.youtube.com/embed/${ video.id }`,
                                description: video.description?video.description:'',
                                postType: 'video',
                                downloadLink: url,
                                status: 'draft',
                                lastModify: Date.now(),
                                likes:0,
                                disLikes:0,
                                views:0
                            }

                            await savePost(videoData, window.location.origin).then(()=>{
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
                        }
                    }

                    contextData.dispatchState({
                        ...contextData.state,
                        loading:false
                    })
                    contextData.dispatchAlert({
                        ...contextData.alert,
                        active:true,
                        alertMessage:'done',
                        type:'info'
                    })
                }).catch(err=>{
                    contextData.dispatchState({
                        ...contextData.state,
                        loading:false
                    })
                })
            }
        }
    }






    const videoSaver = (videoInfo)=>{

        console.log(videoInfo)

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
        getSetting('youtubeApiKey',  window.location.origin,false,'youtubeImporter').then(res => {
            const apiKeyData = res.data.setting ? res.data.setting.data.apiKey : ''
            setState({
                ...state,
                apiKey: apiKeyData
            })
        })
    }, []);

    return (
        <>
            <div className='admin-import-page-youtube-api-key'>
                <h2>Youtube API KEY</h2>
                <input name='apiKey' value={ state.apiKey } onChange={ e => onChaneHandler(e) }/>
                <button onClick={ () => onSaveApiKeyHandler() } className='saveBtn'>Save API Key</button>
            </div>
            <div className='admin-import-page-youtube'>
                <h1>Youtube Importer</h1>
                <textarea ref={ urlsElement } />
                <button className='saveBtn' onClick={ () => onImportHandler() }>Import</button>
                <button className='saveBtn' onClick={ () => onSetDataForTest() }>setTestData</button>
            </div>
        </>
    );
};
export default withRouter(youtube);
