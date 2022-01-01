import _qualityConvertor from "../asset/_qualityConvertor";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faEye} from "@fortawesome/free-regular-svg-icons";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";

interface VideoCardInfoPropType {
    views:number,
    rating:number,
    quality:string,
    duration:string,
}

const VideoCardInfo = (props:VideoCardInfoPropType)=>{

    return(
        <>
            <p className={'video-card-quality video-card-info-data'}>
                {props.quality ? _qualityConvertor(props.quality) : ''}
            </p>
            <p className={'video-card-duration video-card-info-data'}>
                {props.duration ? <>
                    {props.duration}
                    <FontAwesomeIcon icon={faClock} className={'icon'}/>
                </> : null }
            </p>
            <p className={'video-card-views video-card-info-data'}>
                {props.views ?
                    <>
                        <span>{props.views}</span>
                        <FontAwesomeIcon icon={faEye} className={'icon'}/>
                    </>
                    : null
                }
            </p>
            <p className={'video-card-rating video-card-info-data'}>
                <FontAwesomeIcon icon={faThumbsUp} className={'icon thumbs-up'}/>
                <span>{props.rating || 0}%</span>
            </p>
        </>
    )
}

export default VideoCardInfo