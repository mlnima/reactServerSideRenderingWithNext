import styled from "styled-components";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import React, {FC, useMemo} from "react";
import convertDurationStringToIso8601 from "@_variables/clientVariables/convertDurationStringToIso8601";
import convertDateToIso from "@_variables/clientVariables/convertDateToIso";

const VideoPlayerStyledDiv = styled.div`
  margin: 0 auto;
  position: relative;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  max-width: 1300px;
  .responsive-player {
    overflow: hidden;
    position: relative;
    padding-bottom: 56.30%;
    margin-bottom: 20px;
    height: 0;
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    margin-bottom: 50px;
    padding: 0 !important;
  }

  .video-player-video-type {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    margin-bottom: 50px;
    outline: none;
    border-radius: 10px;
  }
  
`

interface PropTypes{
    descriptionRef:React.Ref<HTMLDivElement>
}

const VideoPlayer :FC<PropTypes> = ({descriptionRef}) => {

  const {title,
      _id,
      description,
      duration,
      videoUrl,
      actors,
      mainThumbnail,
      videoEmbedCode,

      createdAt,
      updatedAt,
      videoScriptCode
  } = useSelector(({posts}:StoreTypes)=>posts.post)



      const uploadDate = useMemo(()=>convertDateToIso(updatedAt || createdAt),[createdAt,updatedAt])


    const playerSchemaData = useMemo(()=>{
        return {
            mainThumbnail:  mainThumbnail?.includes('http') ?
                            mainThumbnail :
                            `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${mainThumbnail}`,
            // uploadDate: updatedAt || createdAt ? (new Date(updatedAt || createdAt)).toISOString() :null

        }
    },[createdAt,updatedAt])

    return (
        <VideoPlayerStyledDiv className='video-player'>
            {!!title &&   <meta itemProp="name" content={title}/>}
            {/*//@ts-ignore*/}
            {(!!descriptionRef?.current && !!descriptionRef?.current?.textContent)&&   <meta itemProp="description" content={descriptionRef?.current?.textContent}/>}
            {!!duration &&   <meta itemProp="duration" content={ convertDurationStringToIso8601(duration)}/>}
            {!!playerSchemaData.mainThumbnail &&    <meta itemProp="thumbnailUrl" content={playerSchemaData.mainThumbnail}/>}
            {!!(videoUrl || videoEmbedCode) &&    <meta itemProp="embedURL" content={videoUrl || videoEmbedCode}/>}
            {!!uploadDate && <meta itemProp="uploadDate" content={uploadDate}/>}
            {!!actors?.length && actors?.map(actor=>{
                return(
                    <meta key={actor._id} itemProp="actor" content={actor.name}/>
                )
            })}
            <div className="responsive-player">
                {videoUrl ?
                    <video className='video-player-video-type' controls controlsList=" nodownload" poster={mainThumbnail} preload="none">
                        <source src={videoUrl}/>
                    </video>
                    : videoEmbedCode && !videoUrl ?
                        <iframe className={_id} allow="fullscreen" title={title} src={videoEmbedCode}  frameBorder="0" width='640' height='360' />
                        : !videoUrl && !videoEmbedCode && videoScriptCode ?
                            videoScriptCode :
                            null
                }
            </div>

        </VideoPlayerStyledDiv>

    );
};
export default VideoPlayer;