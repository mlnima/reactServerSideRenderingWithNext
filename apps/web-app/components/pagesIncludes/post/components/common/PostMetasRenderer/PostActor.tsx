import React, {FC} from "react";
import {convertMetasTypeToSingular,capitalizeFirstLetters} from "custom-util";
import ActorMetaImageRenderer from "./ActorMetaImageRenderer";
import {Meta} from "typescript-types";
import Link from "next/link";
import Csr from "@components/global/commonComponents/Csr";

interface ComponentPropTypes {
    item: Meta
}

const PostActor: FC<ComponentPropTypes> = ({item}) => {
    return (
        <Link href={`/${convertMetasTypeToSingular(item.type)}/${item._id}`}
              // key={`${item.type}_${item._id}`}
              className={`post-meta-item ${item.type}`} title={item.name}>
            {/*//@ts-ignore*/}
                {item.type === 'actors' && <Csr> <ActorMetaImageRenderer imageUrl={item?.imageUrl} name={item.name}/></Csr>}
                {capitalizeFirstLetters(item.name)}
        </Link>
    )
};
export default PostActor;
