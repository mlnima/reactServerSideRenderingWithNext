import _qualityConvertor from "../asset/_qualityConvertor";
import CardViews from "../asset/CardViews/CardViews";
import CardRating from "../asset/CardRating/CardRating";
import CardQuality from "../asset/CardQuality/CardQuality";
import CardDuration from "../asset/CardDuration/CardDuration";

interface VideoCardInfoPropType {
    views:number,
    rating:number,
    quality:string,
    duration:string,
}

const VideoCardInfo = (props:VideoCardInfoPropType) =>{

    return(
        <>
            <CardQuality quality={_qualityConvertor(props.quality)} className={'video-card-quality video-card-info-data'}/>
            <CardDuration duration={props.duration} className={'video-card-duration video-card-info-data'}/>
            <CardViews views={props.views} className={'video-card-views video-card-info-data'}/>
            <CardRating rating={props.rating} className={'video-card-rating video-card-info-data'}/>
        </>
    )
}

export default VideoCardInfo