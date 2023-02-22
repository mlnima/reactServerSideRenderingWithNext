import React, {FC} from "react";
import ActorMetaImageRenderer from "./ActorMetaImageRenderer";
import Link from "next/link";
import {convertMetasTypeToSingular,capitalizeFirstLetters} from "custom-util";
import {Meta} from "typescript-types";
import Csr from "@components/global/commonComponents/Csr";


interface PostMetaPropTypes {
    item: Meta
}

const PostMeta: FC<PostMetaPropTypes> = ({item}) => {
    return (
        <Link href={`/${convertMetasTypeToSingular(item.type)}/${item._id}`}
              // key={`${item.type}_${item._id}`}
              className={`post-meta-item btn btn-dark ${item.type}`}
              title={item.name}>
                {item.type === 'actors' && <Csr> <ActorMetaImageRenderer imageUrl={item?.imageUrl} name={item.name}/></Csr>}
                { capitalizeFirstLetters(item.name)}
        </Link>
    )
};
export default PostMeta;
