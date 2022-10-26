import React, {FC} from "react";
import ActorMetaImageRenderer from "@components/includes/PostPage/components/PostMetasRenderer/ActorMetaImageRenderer";
import Link from "next/link";
import {convertMetasTypeToSingular} from "@_variables/_variables";
import {Meta} from "@_typeScriptTypes/Meta";
import capitalizeFirstLetters from "@_variables/util/capitalizeFirstLetters";

interface PostMetaPropTypes {
    item: Meta
}

const PostMeta: FC<PostMetaPropTypes> = ({item}) => {
    return (
        <Link href={`/${convertMetasTypeToSingular(item.type)}/${item._id}`}
              // key={`${item.type}_${item._id}`}
              className={`post-meta-item btn btn-dark ${item.type}`}
              title={item.name}>
                {item.type === 'actors' && <ActorMetaImageRenderer imageUrl={item?.imageUrl} name={item.name}/>}
                { capitalizeFirstLetters(item.name)}
        </Link>
    )
};
export default PostMeta;
