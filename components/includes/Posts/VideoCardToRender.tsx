import {FC} from "react";
import dynamic from "next/dynamic";
const VideoTypeCard = dynamic(() => import('../cards/desktop/VideoCard/VideoCard'))
const MobileVideoCard = dynamic(() => import('../cards/mobile/MobileVideoCard/MobileVideoCard'))
const VideoCardTypeList = dynamic(() => import('../cards/desktop/VideoCardTypeList/VideoCardTypeList'))

interface VideoCardToRenderPropTypes {
    postProps:any
}

const VideoCardToRender: FC<VideoCardToRenderPropTypes> = ({postProps}) => {

    if (postProps.elementSize === 'list') {
        return <VideoCardTypeList {...postProps}/>
    } else {
        if (postProps.isMobile) {
            return <MobileVideoCard {...postProps}/>
        } else {
            return <VideoTypeCard {...postProps} />
        }
    }
};
export default VideoCardToRender
