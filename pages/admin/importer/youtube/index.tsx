import {useEffect, useState, useRef, ChangeEvent} from 'react';
import {getSetting, youtubeDataScrapper} from '../../../../_variables/ajaxVariables'
import withRouter from 'next/dist/client/with-router';
import {savePost} from '../../../../_variables/ajaxPostsVariables'
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {setAlert, setLoading} from "../../../../store/actions/globalStateActions";
import {updateSetting} from "../../../../store/actions/settingsActions";
import {wrapper} from "../../../../store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

let StyledDiv = styled.div`
  .admin-import-page-youtube {
    display: flex;
    flex-direction: column;

    textarea {
      background-color: white;
      min-width: 50vw;
      min-height: 300px;
    }
  }

  .admin-import-page-youtube-api-key {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    background-color: #33373c;
    max-width: 300px;
    padding: 10px;
    border-radius: 5px;

    input {
      background-color: white;
      width: 100%;
    }
  }
`
const youtube = () => {

    const dispatch = useDispatch()
    const urlsElement = useRef(null)
    const [state, setState] = useState({
        apiKey: '',
        scrapedVideos: []
    });
// @ts-ignore
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
        // @ts-ignore
        const data = urlsElement.current.value.split(/\r?\n/)
        // @ts-ignore
        const ids = data.map(url => url.split('?v=')[1])

        for await (let url of data) {
            if (url.includes('http')) {
                dispatch(setLoading(true))
                youtubeDataScrapper(url).then(async res => {
// @ts-ignore
                    for await (let video of res.data.videos) {
                        if (video.id) {
                            const videoData = {
                                title: video.title ? video.title : '',
                                quality: video.raw.contentDetails ? video.raw.contentDetails.definition === 'hd' ? '1080p' : '480p' : '1080',
                                //quality:'1080',
                                mainThumbnail: video.thumbnails.medium ? video.thumbnails.medium.url : '',
                                duration: video.duration ? durationToString(video.duration) : '00:00',
                                videoEmbedCode: `https://www.youtube.com/embed/${video.id}`,
                                description: video.description ? video.description : '',
                                postType: 'video',
                                downloadLink: url,
                                status: 'draft',
                                lastModify: Date.now(),
                                likes: 0,
                                disLikes: 0,
                                views: 0
                            }

                            await savePost(videoData, window.location.origin).then(() => {

                            }).catch(err => {
                                console.log(err.response.data.error)
                                dispatch(setAlert({message: err.response.data.error + ' => ' + videoData.title, type: 'error', active: true}))
                            })
                        }
                    }

                    dispatch(setLoading(false))
                    dispatch(setAlert({message: 'Done', type: 'success', active: true}))


                }).catch(err => {
                    dispatch(setLoading(false))
                })
            }
        }
    }

    const onSaveApiKeyHandler = () => {
        dispatch(setLoading(true))
        const data = {
            apiKey: state.apiKey
        }

        dispatch(updateSetting('youtubeApiKey', {
            apiKey: state.apiKey
        }))
    }

    const onChaneHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setState({...state, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        // @ts-ignore
        getSetting('youtubeApiKey', window.location.origin, false, 'youtubeImporter').then(res => {
            // @ts-ignore
            const apiKeyData = res.data.setting ? res.data.setting.data.apiKey : ''
            setState({
                ...state,
                apiKey: apiKeyData
            })
        })
    }, []);

    return (
        <StyledDiv>
            <div className='admin-import-page-youtube-api-key'>
                <h2>Youtube API KEY</h2>
                <input name='apiKey' value={state.apiKey} onChange={e => onChaneHandler(e)}/>
                <button onClick={() => onSaveApiKeyHandler()} className='saveBtn greenActionBtn'>Save API Key</button>
            </div>
            <div className='admin-import-page-youtube'>
                <h1>Youtube Importer</h1>
                <textarea ref={urlsElement}/>
                <button className='saveBtn greenActionBtn' onClick={() => onImportHandler()}>Import</button>
                {/*<button className='saveBtn greenActionBtn' onClick={() => onSetDataForTest()}>setTestData</button>*/}
            </div>
        </StyledDiv>
    );
};


export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})
export default withRouter(youtube);
