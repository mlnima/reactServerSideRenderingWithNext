import {FC} from "react";
import {Meta} from "@repo/typescript-types";
import Link from "next/link";
import CardLastUpdate from '../CardLastUpdate/CardLastUpdate';
import { v4 as uuidv4 } from 'uuid';

interface IProps {
    actors: Meta[],
    updatedAt: string,
    createdAt: string,
    locale:string
}

const VideoPostCardActors: FC<IProps> = ({actors, updatedAt,createdAt,locale}) => {
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
