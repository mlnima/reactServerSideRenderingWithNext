import {FC} from "react";
import dynamic from "next/dynamic";
const LearnTypeCard = dynamic(() => import('../cards/desktop/LearnTypeCard/LearnTypeCard'))
const MobileLearnCard = dynamic(() => import('../cards/mobile/MobileLearnCard/MobileLearnCard'))

interface LearnCardToRenderPropTypes {
    postProps:any ,
    index?:number
}

const LearnCardToRender: FC<LearnCardToRenderPropTypes> = ({postProps,index}) => {
    if (postProps.isMobile) {
        return <MobileLearnCard {...postProps} index={index}/>
    } else {
        return <LearnTypeCard {...postProps} index={index} />
    }
};
export default LearnCardToRender