import React, {FC} from "react";
import {convertMetasTypeToSingular, capitalizeFirstLetters} from "@repo/utils";
import ActorMetaImageRenderer from "./ActorMetaImageRenderer";
import {IMeta} from "@repo/typescript-types";
import Link from "next/link";

interface ComponentPropTypes {
    item: IMeta
}

const PostActor: FC<ComponentPropTypes> = ({item}) => {

    return (
        <Link href={`/${convertMetasTypeToSingular(item.type)}/${item._id}`}
              className={`post-meta-item ${item.type}`} title={item.name}>
            <ActorMetaImageRenderer imageUrl={item.imageUrl} name={item.name}/>
            <strong>{capitalizeFirstLetters(item.name)}</strong>
        </Link>
    )
};
export default PostActor;