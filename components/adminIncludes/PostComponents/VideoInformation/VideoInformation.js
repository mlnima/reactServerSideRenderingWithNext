import React, { useEffect, useState, useContext } from 'react';
import IsInSlideShow from "./IsInSlideShow/IsInSlideShow";
import Quality from "./Quality/Quality";
import './VideoInformation.scss'
import VideoUrls from "./VideoUrls/VideoUrls";
import VideoEmbedCode from "../VideoEmbedCode/VideoEmbedCode";
import Duration from "./Duration/Duration";
import ViewsLikesDisLikes from "./ViewsLikesDisLikes/ViewsLikesDisLikes";
import TextInputWithUploadBtn from "./TextInputWithUploadBtn/TextInputWithUploadBtn";
import { AppContext } from "../../../../context/AppContext";

const VideoInformation = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);
       if (contextData.editingPostData.format === 'video'){
           return (
               <div className='VideoInformation'>
                   <IsInSlideShow/>
                   <Quality/>
                   <TextInputWithUploadBtn name='VideoTrailerUrl' title='Video Url'/>
                   {/*<VideoUrls/>*/}
                   <VideoEmbedCode/>
                   <Duration/>
                   <ViewsLikesDisLikes name={'Views'}/>
                   <ViewsLikesDisLikes name={'Likes'}/>
                   <ViewsLikesDisLikes name={'DisLikes'}/>
                   <TextInputWithUploadBtn name='VideoTrailerUrl' title='Video Trailer Url'/>
                   <TextInputWithUploadBtn name='VideoTrailerUrl' title='Main thumbnail'/>
               </div>
           );
       }else {
           return (
               <h3>This Post Type Does not Support this Feature </h3>
           )
       }

};
export default VideoInformation;