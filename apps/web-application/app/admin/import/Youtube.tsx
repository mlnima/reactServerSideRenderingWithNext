'use client';
import React, { useState, useRef, ChangeEvent } from 'react';
import { useAppDispatch } from '@store/hooks';
import { loading } from '@store/reducers/globalStateReducer';
import './Youtube.scss';
import dashboardUpdateSettings from '@lib/actions/database/settings/dashboardUpdateSettings';


const Youtube = () => {

  const dispatch = useAppDispatch();
  const urlsElement = useRef(null);
  const [state, setState] = useState({
    apiKey: '',
    scrapedVideos: [],
  });
// @ts-ignore
//     const durationToString = duration => {
//         const hours = duration.hours === 0 ? '' :
//             duration.hours < 10 ? '0' + duration.hours.toString() + ':' :
//                 duration.hours.toString() + ':'
//
//
//         const min = duration.minutes === 0 ? '' :
//             duration.minutes < 10 ? '0' + duration.minutes.toString() + ':' :
//                 duration.minutes.toString() + ':'
//
//
//         const sec = duration.seconds < 10 ?
//             '0' + duration.seconds.toString() :
//             duration.seconds.toString()
//
//         return hours + min + sec
//     }


  const onImportHandler = async () => {
    // @ts-ignore
    const data = urlsElement.current.value.split(/\r?\n/);
    // @ts-ignore
    const ids = data.map(url => url.split('?v=')[1]);

    for await (let url of data) {
      if (url.includes('http')) {
        // dispatch(getYoutubeDataScrapperAction(url));
//                 dispatch(setLoading(true))
//                 youtubeDataScrapper(url).then(async res => {
// // @ts-ignore
//                     for await (let video of res.data.videos) {
//                         if (video.id) {
//                             const videoData = {
//                                 title: video.title ? video.title : '',
//                                 quality: video.raw.contentDetails ? video.raw.contentDetails.definition === 'hd' ? '1080p' : '480p' : '1080',
//                                 //quality:'1080',
//                                 mainThumbnail: video.thumbnails.medium ? video.thumbnails.medium.url : '',
//                                 duration: video.duration ? durationToString(video.duration) : '00:00',
//                                 videoEmbedCode: `https://www.youtube.com/embed/${video.id}`,
//                                 description: video.description ? video.description : '',
//                                 postType: 'video',
//                                 downloadLink: url,
//                                 status: 'draft',
//                                 likes: 0,
//                                 disLikes: 0,
//                                 views: 0
//                             }
//                             // @ts-ignore
//                             dispatch(adminSaveNewPost(videoData,null))
//                             // await savePost(videoData).then(() => {
//                             //
//                             // }).catch(err => {
//                             //     console.log(err?.response?.data?.error)
//                             //     dispatch(setAlert({message: err.response.data.error + ' => ' + videoData.title, type: 'error', active: true}))
//                             // })
//                         }
//                     }
//
//                     dispatch(setLoading(false))
//                     dispatch(setAlert({message: 'Done', type: 'success', active: true}))
//
//
//                 }).catch(err => {
//                     dispatch(setLoading(false))
//                 })
      }
    }
  };

  const onSaveApiKeyHandler = async () => {
    dispatch(loading(true));

    try {
      await dashboardUpdateSettings({
        type: 'youtubeApiKey',
        data: { apiKey: state.apiKey },
      });
    } catch (error) {
    }
  };

  const onChaneHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //     // @ts-ignore
  //     getSetting('youtubeApiKey', window.location.origin, false, 'youtubeImporter').then(res => {
  //         // @ts-ignore
  //         const apiKeyData = res.data.setting ? res.data.setting.data.apiKey : ''
  //         setState({
  //             ...state,
  //             apiKey: apiKeyData
  //         })
  //     })
  // }, []);

  return (
    <div className={'youtubeImporter'}>
      <div className="admin-import-page-youtube-api-key">
        <h2>Youtube API KEY</h2>
        <input name="apiKey" value={state.apiKey} onChange={e => onChaneHandler(e)} />
        <button onClick={() => onSaveApiKeyHandler()} className="saveBtn greenActionBtn">Save API Key</button>
      </div>
      <div className="admin-import-page-youtube">
        <h1>Youtube Importer</h1>
        <textarea ref={urlsElement} />
        <button className="saveBtn greenActionBtn" onClick={() => onImportHandler()}>Import</button>
      </div>
    </div>
  );
};

export default Youtube;
