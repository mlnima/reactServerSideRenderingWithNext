import {FC} from "react";
import dynamic from "next/dynamic";
const LearnTypeCard = dynamic(() => import('../cards/desktop/LearnTypeCard/LearnTypeCard'))
const MobileLearnCard = dynamic(() => import('../cards/mobile/MobileLearnCard/MobileLearnCard'))

interface LearnCardToRenderPropTypes {
    postProps:any
}

const LearnCardToRender: FC<LearnCardToRenderPropTypes> = ({postProps}) => {
    if (postProps.isMobile) {
        return <MobileLearnCard {...postProps}/>
    } else {
        return <LearnTypeCard {...postProps} />
    }
};
export default LearnCardToRender