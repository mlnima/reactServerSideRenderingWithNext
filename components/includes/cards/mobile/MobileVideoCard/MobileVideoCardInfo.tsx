import _qualityConvertor from "../../asset/_qualityConvertor";
import dynamic from "next/dynamic";
const CardViews = dynamic(() => import('../../asset/CardViews/CardViews'))
const CardRating = dynamic(() => import('../../asset/CardRating/CardRating'))
const CardQuality = dynamic(() => import('../../asset/CardQuality/CardQuality'))
const CardDuration = dynamic(() => import('../../asset/CardDuration/CardDuration'))


interface VideoCardInfoPropType {
    views:number,
    rating:number,
    quality:string,
    duration:string,
}

const MobileVideoCardInfo = (props:VideoCardInfoPropType) =>{

    return(
        <>
            {props.quality ? <CardQuality quality={_qualityConvertor(props.quality)} className={'video-card-quality video-card-info-data'}/> :null }
            {props.duration ?   <CardDuration duration={props.duration} className={'video-card-duration video-card-info-data'}/> :null }
            {props.views ?   <CardViews views={props.views} className={'video-card-views video-card-info-data'}/> :null }
            {props.rating ?  <CardRating rating={props.rating} className={'video-card-rating video-card-info-data'}/> :null }
        </>
    )
}

export default MobileVideoCardInfo