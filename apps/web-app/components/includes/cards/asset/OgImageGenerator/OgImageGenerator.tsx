import {FC} from "react";
import styled from "styled-components";
import { ImageResponse } from '@vercel/og';

export const config = {
    runtime: '(experimental)-edge',
};
interface PropTypes {
    title:string,
    postsPerRawForMobile: number,
    cardWidth: number,
}

interface StylePropTypes {
    cardWidth,
    postsPerRawForMobile,
}

const Style = styled.div`
  width: 100%;
  height: ${({postsPerRawForMobile}: StylePropTypes) => 96 / postsPerRawForMobile / 1.777}vw;
  aspect-ratio: 16 / 9;
  position: relative;
  @media only screen and (min-width: 768px) {
    width: ${({cardWidth}: StylePropTypes) => cardWidth}px;
    height: ${({cardWidth}: StylePropTypes) => cardWidth / 1.777}px !important;
  }
`


//@ts-ignore
const OgImageGenerator: FC<PropTypes> = ({title,cardWidth,postsPerRawForMobile}) => {

    return new ImageResponse(
    (    <Style style={{
            fontSize: 128,
            background: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
        }}
               cardWidth={cardWidth}
               postsPerRawForMobile={postsPerRawForMobile}
        >
            {title}
        </Style>),
        {
            width: 250,
            height: 100,
        }
    )
};
export default OgImageGenerator;
