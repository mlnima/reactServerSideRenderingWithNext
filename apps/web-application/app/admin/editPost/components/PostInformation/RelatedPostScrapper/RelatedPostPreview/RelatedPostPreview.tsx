'use client';
import React, { FC, useState } from 'react';
import styled from 'styled-components';

interface IProps {
  cardData: {
    source: string;
    mainThumbnail: string;
    videoTrailerUrl: string;
    views: string;
    quality: string;
    duration: string;
    title: string;
  };
  onChangeHandler: (e: React.ChangeEvent<HTMLElement>) => void;
}

const Styles = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 200px;

    img, video {
        width: 200px;
        aspect-ratio: 16/9;
    }

    p {
        width: 100%;
        text-align: left;
        margin: 4px 0;
    }
`;

const RelatedPostPreview: FC<IProps> = ({ cardData, onChangeHandler }) => {
  const [isHover, setIsHover] = useState(false);
  const onClickHandler = () => {
    const e = {
      target: {
        name: 'source',
        value: cardData.source,
      },
    };
    onChangeHandler(e)
  };
  return (
    <Styles
      className={'relatedPost'}
      onMouseEnter={() => setIsHover(true)}
      onTouchStart={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onTouchEnd={() => setIsHover(false)}
      onClick={onClickHandler}
    >
      {cardData?.mainThumbnail && (
        <>
          {isHover ? (
            <video src={cardData?.videoTrailerUrl} muted autoPlay />
          ) : (
            <img src={cardData?.mainThumbnail} alt="1" />
          )}
        </>
      )}
      {cardData?.title && <p>title: {cardData?.title}</p>}
      {cardData?.quality && <p>quality: {cardData?.quality}</p>}
      {cardData?.views && <p>views: {cardData?.views}</p>}
    </Styles>
  );
};

export default RelatedPostPreview;


// import React, {FC, useState} from "react";
// import {editPostSourceAction} from "@store/reducers/postsReducer";
// import {useAppDispatch} from "@store/hooks";
// import styled from "styled-components";
//
// interface IProps {
//     cardData: {
//         source: string,
//         mainThumbnail: string,
//         videoTrailerUrl: string,
//         views: string,
//         quality: string,
//         duration: string,
//         title: string
//     }
// }
//
// const Styles = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   flex-direction: column;
//   width: 200px;
//
//   img,video {
//     width: 200px;
//     aspect-ratio: 16/9;
//   }
//
//   p {
//     width: 100%;
//     text-align: left;
//     margin: 4px 0;
//   }
//
// `
//
// const RelatedPostPreview: FC<IProps> = ({cardData}) => {
//     const dispatch = useAppDispatch()
//     const [isHover, setIsHover] = useState(false)
//     return (
//         <Styles className={'relatedPost'}
//              onMouseEnter={() => setIsHover(true)}
//              onTouchStart={() => setIsHover(true)}
//              onMouseLeave={() => setIsHover(false)}
//              onTouchEnd={() => setIsHover(false)}
//              onClick={() => dispatch(editPostSourceAction(cardData.source))}>
//             {cardData?.mainThumbnail && <>
//                 {isHover ?
//                     <video src={cardData?.videoTrailerUrl} muted autoPlay/> :
//                     <img src={cardData?.mainThumbnail} alt="1"/>
//                 }
//             </>}
//             {cardData?.title && <p> title: {cardData?.title}</p>}
//             {cardData?.quality && <p> quality: {cardData?.quality}</p>}
//             {cardData?.views && <p> views: {cardData?.views}</p>}
//         </Styles>
//     )
// };
// export default RelatedPostPreview
