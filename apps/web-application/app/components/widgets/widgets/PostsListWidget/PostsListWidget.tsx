'use client';
import {FC} from "react";
import {Post} from "typescript-types";
import './PostsListWidget.styles.scss'
// import PromotionPostListCard from "@components/includes/cards/postsCards/PromotionPostListCard";

interface PropTypes {
    viewType?: string,
    posts?: Post[],
    uniqueData?: {
        speed: number;
        posts: Post[],
        sliderEffect: string,
        spaceBetween: number,
        totalCount: number
    }
    widgetId?: string,
    isSidebar?: boolean,
    index?: number,
    cardWidthDesktop?: number,
}

//Might be Removed
const PostsListWidget: FC<PropTypes> = ({uniqueData}) => {

    return (
        <div className={'postsListWidget'}>

            {/*{uniqueData?.posts?.map((post,index) => {*/}
            {/*    return <PromotionPostListCard post={post} index={index}/>*/}
            {/*})}*/}
        </div>
    )
};
export default PostsListWidget;