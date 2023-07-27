import styled from "styled-components";
import React, {FC, useRef} from "react";
import PostMeta from "./PostMeta";
import PostActor from "./PostActor";
import {capitalizeFirstLetters} from "custom-util";
import {useAppSelector} from "@store_toolkit/hooks";


const PostMetaStyledDiv = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;

  .title {
    font-weight: initial;
    font-size: initial;
  }

  .post-meta-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
  }


  .content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 8px;

    .post-meta-item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: var(--secondary-text-color, #ccc);
      background-color: var(--secondary-background-color, #ccc);
      text-decoration: none;

      p {
        word-break: keep-all;
      }

      .categories-logo, .tags-logo {
        margin-right: 5px;
        width: 14px;
        height: 14px;
        background-color: var(--secondary-text-color, #ccc);
      }
    }

    .actors {
      background-color: transparent;

      .item-image {
        padding: 0;
        margin-right: 4px;

        width: 33px;
        height: 33px;
        border-radius: 50%;
        object-fit: cover;
      }

      .actor-meta-svg {
        padding: 0 5px;
      }


    }
  }
`

interface PostMetaPropType {
    type: string,
}

const PostMetasRenderer: FC<PostMetaPropType> = ({type}) => {

    const containerRef = useRef<HTMLDivElement>()
    const post = useAppSelector(({posts}) => posts.post)
    //@ts-ignore
    const metas = type == 'all' ? [...post?.actors, ...post?.categories, ...post?.tags] : post?.[type]
    const filterMeta = metas?.length ? metas.filter(m => m.name?.length > 1) : []

    const renderData = filterMeta.map(item => item.type === 'actors' ?
        <PostActor key={item._id} item={item}/> :
        <PostMeta key={item._id} item={item}/>
    );

    if (filterMeta?.length) {
        return (

            <PostMetaStyledDiv className={`${type}-container post-meta sub-content`}
                //@ts-ignore
                               ref={containerRef}>
                {(type !== 'all' && !!type) && <h2 className={'title'}>{capitalizeFirstLetters(type)}</h2>}
                <div className="content">
                    {renderData}

                </div>
            </PostMetaStyledDiv>
        );
    } else return null

};

export default PostMetasRenderer;