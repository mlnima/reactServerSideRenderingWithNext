import {FC} from "react";
import styled from "styled-components";
import {Post} from "typescript-types";
import PromotionPostListCard from "@components/includes/cards/postsCards/PromotionPostListCard";

const Style = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  
  @media only screen and (min-width: 768px) {
    width: 320px;
  }
`;

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

const PostsList: FC<PropTypes> = ({uniqueData}) => {

    return (
        <Style className={'posts-list'}>
            {uniqueData?.posts?.map((post,index) => {


                return <PromotionPostListCard post={post} index={index}/>
            })}
        </Style>
    )
};
export default PostsList;