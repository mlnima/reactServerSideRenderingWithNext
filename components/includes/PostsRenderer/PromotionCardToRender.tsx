import {FC} from "react";
import dynamic from "next/dynamic";
const MobilePromotionCard = dynamic(() => import('../cards/mobile/MobilePromotionCard/MobilePromotionCard'))
const PromotionCardListSmall = dynamic(() =>
    import('../cards/desktop/PromotionTypeCard/PromotionCardListSmall'))
const PromotionTypeCard = dynamic(() => import('../cards/desktop/PromotionTypeCard/PromotionTypeCard'))

interface PromotionCardToRenderPropTypes {
    postProps:any,
    index?:number
}

const PromotionCardToRender: FC<PromotionCardToRenderPropTypes> = ({postProps,index}) => {
    if (postProps.elementSize === 'listSmall') {
        return <PromotionCardListSmall{...postProps} index={index}/>
    } else {
        if (postProps.isMobile) {
            return <MobilePromotionCard{...postProps} index={index}/>
        } else {
            return <PromotionTypeCard{...postProps} index={index}/>
        }
    }
};
export default PromotionCardToRender
