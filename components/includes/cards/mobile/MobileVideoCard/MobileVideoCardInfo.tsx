import _qualityConvertor from "../../asset/_qualityConvertor";
import dynamic from "next/dynamic";
import {FC} from "react";
const CardQuality = dynamic(() => import('../../asset/CardQuality/CardQuality'))
const CardDuration = dynamic(() => import('../../asset/CardDuration/CardDuration'))


interface VideoCardInfoPropType {
    quality:string,
    duration:string,
}

const MobileVideoCardInfo:FC<VideoCardInfoPropType> = ({quality,duration}) =>{

    return(
        <>
            {quality ? <CardQuality quality={_qualityConvertor(quality)} className={'video-card-quality video-card-info-data'}/> :null }
            {duration ?   <CardDuration duration={duration} className={'video-card-duration video-card-info-data'}/> :null }
        </>
    )
}

export default MobileVideoCardInfo