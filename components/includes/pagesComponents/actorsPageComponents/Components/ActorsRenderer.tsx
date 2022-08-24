// import React, {FC} from 'react';
// import styled from "styled-components";
// import { useSelector} from "react-redux";
// import {Meta, StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
// import ActorCard from "@components/includes/cards/ActorCard";
//
// interface ActorsContentStyledDivPropTypes {
//     postsPerRawForMobile: number,
//     cardWidth: number,
//     cardsCustomStyle: string,
// }
//
// let ActorsRendererStyledDiv = styled.div`
//   padding: 20px 0;
//   display: grid;
//   width: 98%;
//   margin: auto;
//   grid-gap: 5px;
//   grid-template-columns: repeat(auto-fill, minmax(${({cardWidth}: ActorsContentStyledDivPropTypes) => `${cardWidth}px`}, 1fr));
//
//   @media only screen and (min-width: 768px) {
//     grid-gap: 30px;
//     grid-template-columns: repeat(auto-fill, minmax(${({cardWidth}: ActorsContentStyledDivPropTypes) => `${cardWidth}px`}, 1fr));
//   }
//   ${({cardsCustomStyle}:ActorsContentStyledDivPropTypes)=>cardsCustomStyle||''}
// `
//
// interface ActorsRendererPropTypes {
//     uniqueData?: {
//         metaData?: Meta[],
//     }
// }
//
// const ActorsRenderer: FC<ActorsRendererPropTypes> = ({uniqueData}) => {
//
//
//
//     const {cardWidth, postsPerRawForMobile, actorsMetas,cardsCustomStyle} = useSelector(
//         ({settings, posts}: StoreTypes) => {
//             return {
//                 postsPerRawForMobile: settings?.design?.postsPerRawForMobile || 2,
//                 actorsMetas: uniqueData?.metaData || posts?.actorsMetas || [],
//                 cardsCustomStyle:settings?.design?.cardsCustomStyle|| '',
//                 cardWidth: 140,
//             }
//         })
//
//     return (
//         <ActorsRendererStyledDiv className='actors-content'
//                                  cardWidth={cardWidth}
//                                  cardsCustomStyle={cardsCustomStyle}
//                                  postsPerRawForMobile={postsPerRawForMobile}>
//
//             {actorsMetas?.map((actor, index) => {
//
//                     return <ActorCard key={actor._id}
//                                       meta={actor}
//                                       cardWidth={cardWidth}
//                                       postsPerRawForMobile={postsPerRawForMobile}
//                                       index={index}
//                     />
//
//                 }
//             )}
//
//         </ActorsRendererStyledDiv>
//     );
// };
//
// export default ActorsRenderer;
