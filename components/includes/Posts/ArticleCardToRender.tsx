import {FC} from "react";
import dynamic from "next/dynamic";
const ArticleTypeCard = dynamic(() => import('../cards/desktop/ArticleTypeCard/ArticleTypeCard'))
const MobileArticleCard = dynamic(() => import('../cards/mobile/MobileArticleCard/MobileArticleCard'))

interface ArticleCardToRenderPropTypes {
    postProps:any
}

const ArticleCardToRender: FC<ArticleCardToRenderPropTypes> = ({postProps}) => {
    if (postProps.isMobile) {
        return <MobileArticleCard {...postProps}/>
    } else {
        return <ArticleTypeCard{...postProps}/>
    }
};
export default ArticleCardToRender
