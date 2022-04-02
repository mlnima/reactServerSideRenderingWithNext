import {FC} from "react";
import dynamic from "next/dynamic";
const ArticleTypeCard = dynamic(() => import('../cards/desktop/ArticleTypeCard/ArticleTypeCard'))
const MobileArticleCard = dynamic(() => import('../cards/mobile/MobileArticleCard/MobileArticleCard'))

interface ArticleCardToRenderPropTypes {
    postProps:any ,
    index?:number
}

const ArticleCardToRender: FC<ArticleCardToRenderPropTypes> = ({postProps,index} ) => {
    if (postProps.isMobile) {
        return <MobileArticleCard {...postProps} index={index}/>
    } else {
        return <ArticleTypeCard{...postProps} index={index}/>
    }
};
export default ArticleCardToRender
