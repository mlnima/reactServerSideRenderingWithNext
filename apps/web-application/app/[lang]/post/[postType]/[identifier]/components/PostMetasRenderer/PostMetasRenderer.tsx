import React, {FC} from "react";
import {capitalizeFirstLetters} from "@repo/utils";
import './PostMetasRenderer.scss';
import {IMeta} from "@repo/typescript-types";
import PostActor from "./PostActor";
import PostMeta from "./PostMeta";

interface PostMetaPropType {
    type: string,
    metas: IMeta[] | undefined,
    dictionary: {
        [key: string]: string
    },
}

const PostMetasRenderer: FC<PostMetaPropType> = ({type, metas,dictionary}) => {
    if (metas?.length) {
        return (
            <div className={`post-meta`}>
                {(type !== 'all' && !!type) &&
                    <h2 className={'title'}>
                        {dictionary?.[capitalizeFirstLetters(type)] || capitalizeFirstLetters(type)}:
                    </h2>
                }
                <div className="content">
                    {metas.map(item => item.type === 'actors' ?
                        <PostActor key={item._id} item={item}/> :
                        <PostMeta key={item._id} item={item}/>
                    )}
                </div>
            </div>
        );
    } else return null

};

export default PostMetasRenderer;