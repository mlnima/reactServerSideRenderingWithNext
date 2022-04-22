import {FC} from "react";
import styled from "styled-components";
import {Meta} from "@_variables/TypeScriptTypes/GlobalTypes";
import Link from "next/link";

interface VideoPostCardActorsPropTypes {
    actors: Meta[],
    hover: boolean
}

interface VideoPostCardActorsStylePropTypes {
    actorsLength: number
    hover: boolean
}

// ${({hover}: VideoPostCardActorsStylePropTypes) => hover ? `text-overflow: clip;` : 'ellipsis'}
const VideoPostCardActorsStyle = styled.div`
  
  margin: 2px 0;
  text-overflow: ellipsis;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  color: var(--main-active-color, #f90);
  position: relative;

  &:hover {
    text-overflow: clip;
  }

  @keyframes textOverFlow {
    from {
      left: 0;
    }
    to {
      left: -60px;
    }
  }

  .card-actors-wrapper {
    position: relative;


    &:hover {
      text-overflow: ${({actorsLength}: VideoPostCardActorsStylePropTypes) => actorsLength >= 3 ? 'clip' : 'clip'};
      transition: ${({actorsLength}: VideoPostCardActorsStylePropTypes) => actorsLength >= 3 ? 'left 2 linear 0s' : 'none'};
      animation: ${({actorsLength}: VideoPostCardActorsStylePropTypes) => actorsLength >= 3 ? '2s textOverFlow' : 'none'};
      animation-fill-mode: ${({actorsLength}: VideoPostCardActorsStylePropTypes) => actorsLength >= 3 ? 'forwards' : 'none'};
    }


    .card-actor, a {
      color: var(--main-active-color, #f90);
      margin: 0 2px;
      font-weight:bold;
      :hover {
        text-decoration: underline;
      }

      &:after, &:before {
        box-sizing: border-box;
      }
    }
  }


`


const VideoPostCardActors: FC<VideoPostCardActorsPropTypes> = ({actors, hover}) => {
    return (
        <VideoPostCardActorsStyle className={'card-actors'} hover={hover} actorsLength={actors?.length}>
            <span className={'card-actors-wrapper'}>
                            {actors.map((actor,index) => {
                                return (
                                    <span key={actor?._id + index}>
                                        <Link href={`/actor/${actor?._id}`}>
                                            <a className={'card-actor'}>{actor.name}</a>
                                        </Link>
                                        {', '}
                                    </span>
                                )
                            })}
            </span>
        </VideoPostCardActorsStyle>
    )
};
export default VideoPostCardActors
// ${({hover}: VideoPostCardActorsStylePropTypes) => hover ?
//         ` text-overflow: clip;
//             transition: left 1.02s linear 0s;
//             animation: 1.5s textOverFlow;
//             animation-fill-mode: forwards;` :
//         ''
// }
//&:hover{
//  text-overflow: clip;
//  transition: left 1.02s linear 0s;
//  animation: 1.5s textOverFlow;
//  animation-fill-mode: forwards;
//}