import {FC} from "react";
import {Meta} from "@repo/typescript-types";
import Link from "next/link";
import dynamic from "next/dynamic";
const CardLastUpdate = dynamic(() => import('../CardLastUpdate/CardLastUpdate'),
               {ssr:false,loading: () => <span className={'last-update'}>...</span>});
import { v4 as uuidv4 } from 'uuid';

interface IProps {
    actors: Meta[],
    hover: boolean,
    updatedAt: string,
    createdAt: string,
    locale:string
}

const VideoPostCardActors: FC<IProps> = ({actors, hover, updatedAt,createdAt,locale}) => {
    return (
        <div className={'cardActors'}>
            <div className={'card-actors-container'}>
                <span className={'card-actors-wrapper'}>
                                {actors?.map((actor, index) => {
                                    return (
                                        <span key={uuidv4()}>
                                            <Link href={`/actor/${actor?._id}`} className={'card-actor'}>
                                               {actor.name}{index !== actors.length -1 ? ', ' :''}
                                            </Link>
                                        </span>
                                    )
                                })}
                </span>
            </div>
            {(updatedAt || createdAt) &&
            <CardLastUpdate targetedDate={updatedAt || createdAt} locale={locale}/>
            }
        </div>
    )
};

export default VideoPostCardActors
