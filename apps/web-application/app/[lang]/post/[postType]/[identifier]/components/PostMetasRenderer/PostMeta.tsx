import React, {FC} from "react";
import Link from "next/link";
import {convertMetasTypeToSingular,capitalizeFirstLetters} from "@repo/utils";
import {IMeta} from "@repo/typescript-types";

interface PostMetaPropTypes {
    item: IMeta
}

const PostMeta: FC<PostMetaPropTypes> = ({item}) => {
    return (
        <Link href={`/${convertMetasTypeToSingular(item.type)}/${item._id}`}
              className={`post-meta-item btn btn-dark ${item.type}`}
              title={item.name}>
            { capitalizeFirstLetters(item.name)}
        </Link>
    )
};
export default PostMeta;
