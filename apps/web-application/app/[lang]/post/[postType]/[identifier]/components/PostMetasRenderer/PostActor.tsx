import React, {FC} from "react";
import {convertMetasTypeToSingular, capitalizeFirstLetters} from "custom-util";
import ActorMetaImageRenderer from "./ActorMetaImageRenderer";
import {Meta} from "typescript-types";
import Link from "next/link";

interface ComponentPropTypes {
    item: Meta
}

const PostActor: FC<ComponentPropTypes> = ({item}) => {

    return (
        <Link href={`/${convertMetasTypeToSingular(item.type)}/${item._id}`}
              className={`post-meta-item ${item.type}`} title={item.name}>
            <ActorMetaImageRenderer imageUrl={item.imageUrl} name={item.name}/>
            {capitalizeFirstLetters(item.name)}
        </Link>
    )
};
export default PostActor;