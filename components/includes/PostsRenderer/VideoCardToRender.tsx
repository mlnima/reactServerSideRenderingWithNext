import {FC} from "react";
import dynamic from "next/dynamic";
const VideoCard = dynamic(() => import('../cards/desktop/VideoCard/VideoCard'))
const MobileVideoCard = dynamic(() => import('../cards/mobile/MobileVideoCard/MobileVideoCard'))
const VideoCardTypeList = dynamic(() => import('../cards/desktop/VideoCardTypeList/VideoCardTypeList'))

interface VideoCardToRenderPropTypes {
    postProps:any,
    index:number
}

const VideoCardToRender: FC<VideoCardToRenderPropTypes> = ({postProps,index}) => {

    if (postProps.elementSize === 'list') {
        return <VideoCardTypeList {...postProps} index={index} />
    } else {
        if (postProps.isMobile) {
            return <MobileVideoCard {...postProps} index={index}/>
        } else {

            return <VideoCard {...postProps} index={index}/>
        }
    }
};
export default VideoCardToRender
