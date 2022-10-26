import React, {FC} from "react";
import {convertMetasTypeToSingular} from "@_variables/_variables";
import ActorMetaImageRenderer from "@components/includes/PostPage/components/PostMetasRenderer/ActorMetaImageRenderer";
import {Meta} from "@_typeScriptTypes/Meta";
import Link from "next/link";
import capitalizeFirstLetters from "@_variables/util/capitalizeFirstLetters";

interface ComponentPropTypes {
    item: Meta
}

const PostActor: FC<ComponentPropTypes> = ({item}) => {
    return (
        <Link href={`/${convertMetasTypeToSingular(item.type)}/${item._id}`}
              // key={`${item.type}_${item._id}`}
              className={`post-meta-item ${item.type}`} title={item.name}>
                {item.type === 'actors' && <ActorMetaImageRenderer imageUrl={item?.imageUrl} name={item.name}/>}
                {capitalizeFirstLetters(item.name)}
        </Link>
    )
};
export default PostActor;
