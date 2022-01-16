import React, {useState} from 'react';
import Image from 'next/image'
import styled from "styled-components";

const ActorCardMediaStyledImage = styled(Image)`
  border-radius: 3px;
  object-fit: cover;
`
const NoImageStyleDiv = styled.div`
  width: 140px;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    color: var(--post-element-info-text-color, #ccc);
  }

  @media only screen and (min-width: 768px) {
    width: ${(props: { cardWidth: number }) => props.cardWidth}px;
    height: calc(${(props: { cardWidth: number }) => props.cardWidth}px / 1.777);
  }
`

interface ActorCardMediaPropTypes {
    cardWidth: number;
    imageUrl: string;
    mediaAlt: string;
}

const ActorCardMedia = (props: ActorCardMediaPropTypes) => {
    const [gotError, setGotError] = useState(false)
    if (!props.imageUrl || gotError) {
        return (
            <NoImageStyleDiv cardWidth={props.cardWidth} className='no-image'>
                <span className={'no-image-alt'}>{props.mediaAlt || 'NO IMAGE'}</span>
            </NoImageStyleDiv>
        );
    } else {
        return (
            <ActorCardMediaStyledImage layout={'fixed'}
                                       quality={100}
                                       src={props.imageUrl.includes('http') ?
                                           props.imageUrl :
                                           process.env.NEXT_PUBLIC_PRODUCTION_URL + props.imageUrl
                                       }
                                       alt="Picture of the author"
                                       width={140}
                                       height={140}
                                       onError={()=>setGotError(true)}
            />
        );
    }
};
export default ActorCardMedia;






