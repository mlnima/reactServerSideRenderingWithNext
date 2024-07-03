import React, {FC} from "react";
import Link from "next/link";
import {convertMetasTypeToSingular,capitalizeFirstLetters} from "@repo/shared-util";
import {Meta} from "typescript-types";

interface PostMetaPropTypes {
    item: Meta
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
