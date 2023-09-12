import {FC} from "react";
import styled from "styled-components";
import {Meta} from "typescript-types";
import Link from "next/link";
import dynamic from "next/dynamic";
const CardLastUpdate = dynamic(() => import('./CardLastUpdate/CardLastUpdate'),
               {ssr:false,loading: () => <span className={'last-update'}>...</span>});
import { v4 as uuidv4 } from 'uuid';
// import CardLastUpdate from "@components/includes/cards/asset/CardLastUpdate/CardLastUpdate";

interface VideoPostCardActorsPropTypes {
    actors: Meta[],
    hover: boolean,
    updatedAt: string,
    createdAt: string,
}

interface VideoPostCardActorsStylePropTypes {
    actorsLength: number
    hover: boolean
}

const VideoPostCardActorsStyle = styled.div`

  margin: 2px 0;
  max-width: 100%;
  color: var(--primary-active-color, #f90);
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 20px;
  justify-content: space-between;
  
  @keyframes textOverFlow {
    from {
      left: 0;
    }
    to {
      left: -80%;
    }
  }

  .last-update {
    white-space: nowrap;
    margin: 0;
  }

  .card-actors-container {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    &:hover {
      text-overflow: clip;
    
    }
    &:hover ~ .last-update {
      
      ${({actorsLength}: VideoPostCardActorsStylePropTypes) => actorsLength >= 3 ? 'display: none;' : ''};
    }
    .card-actors-wrapper {
      position: relative;
      
      &:hover {
        text-overflow: ${({actorsLength}: VideoPostCardActorsStylePropTypes) => actorsLength >= 3 ? 'clip' : 'clip'};
        transition: ${({actorsLength}: VideoPostCardActorsStylePropTypes) => actorsLength >= 3 ? 'left 2 linear 0s' : 'none'};
        animation: ${({actorsLength}: VideoPostCardActorsStylePropTypes) => actorsLength >= 3 ? '5s textOverFlow' : 'none'};
        animation-fill-mode: ${({actorsLength}: VideoPostCardActorsStylePropTypes) => actorsLength >= 3 ? 'forwards' : 'none'};
      }
      
      .card-actor, a {
        color: var(--primary-active-color, #f90);
        margin: 2px 2px;
        font-weight: bold;
        
        &:after, &:before {
          box-sizing: border-box;
        }
      }
    }
  }
`

const VideoPostCardActors: FC<VideoPostCardActorsPropTypes> = ({actors, hover, updatedAt,createdAt}) => {
    return (
        <VideoPostCardActorsStyle className={'card-actors'} hover={hover} actorsLength={actors?.length}>
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
            <CardLastUpdate targetedDate={updatedAt || createdAt}/>
            }
        </VideoPostCardActorsStyle>
    )
};
export default VideoPostCardActors
