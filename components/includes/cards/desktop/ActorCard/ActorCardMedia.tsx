import React, {useState} from 'react';
import styled from "styled-components";
import CardImageRenderer from "../../asset/CardImageRenderer/CardImageRenderer";

const NoImageStyleDiv = styled.div`
  width: 140px;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: var(--post-element-info-text-color, #ccc);
  }
`

interface ActorCardMediaPropTypes {
    imageUrl: string;
    mediaAlt: string;
}

const ActorCardMedia = ({mediaAlt, imageUrl}: ActorCardMediaPropTypes) => {
    const [gotError, setGotError] = useState(false)
    if (!imageUrl || gotError) {
        return (
            <NoImageStyleDiv className='no-image'>
                <span className={'no-image-alt'}>{mediaAlt || 'NO IMAGE'}</span>
            </NoImageStyleDiv>
        );
    } else {
        return (
            <CardImageRenderer mediaAlt={mediaAlt}
                               cardWidth={140}
                               cardHeight={140}
                               objectFitValue={'cover'}
                               errorHandler={() => setGotError(true)}
                               strictImageSize={true}
                               imageUrl={imageUrl.includes('http') ?
                                   imageUrl :
                                   process.env.NEXT_PUBLIC_PRODUCTION_URL + imageUrl
                               }
            />
        );
    }
};
export default ActorCardMedia;


//


// return (
//     <ActorCardMediaStyledImage layout={'responsive'}
//                                quality={80}
//                                src={imageUrl.includes('http') ?
//                                    imageUrl :
//                                    process.env.NEXT_PUBLIC_PRODUCTION_URL + imageUrl
//                                }
//                                alt="Picture of the author"
//                                width={140}
//                                height={140}
//                                onError={()=>setGotError(true)}
//     />
// );
