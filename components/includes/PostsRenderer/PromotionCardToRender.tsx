import {FC} from "react";
import dynamic from "next/dynamic";
const MobilePromotionCard = dynamic(() => import('../cards/mobile/MobilePromotionCard/MobilePromotionCard'))
const PromotionCardListSmall = dynamic(() =>
    import('../cards/desktop/PromotionTypeCard/PromotionCardListSmall'))
const PromotionTypeCard = dynamic(() => import('../cards/desktop/PromotionTypeCard/PromotionTypeCard'))

interface PromotionCardToRenderPropTypes {
    postProps:any
}

const PromotionCardToRender: FC<PromotionCardToRenderPropTypes> = ({postProps}) => {
    if (postProps.elementSize === 'listSmall') {
        return <PromotionCardListSmall{...postProps}/>
    } else {
        if (postProps.isMobile) {
            return <MobilePromotionCard{...postProps}/>
        } else {
            return <PromotionTypeCard{...postProps}/>
        }
    }
};
export default PromotionCardToRender
