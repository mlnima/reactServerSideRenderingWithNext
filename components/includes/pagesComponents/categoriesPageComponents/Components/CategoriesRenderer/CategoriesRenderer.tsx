import {FC} from 'react';
import styled from "styled-components";
import { useSelector} from "react-redux";
import {Meta, StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import CategoryCard from "@components/includes/cards/CategoryCard";

interface CategoriesRendererPropTypes {
    uniqueData?: {
        metaData?: Meta[],
    },
    cardWidthDesktop: number,
}

interface CategoriesContentStyledDivPropTypes {
    postsPerRawForMobile: number,
    cardWidth: number,
}


let CategoriesRendererStyledDiv = styled.div`
  padding: 20px 0;
  display: grid;
  width: 100%;
  margin: auto;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(${({postsPerRawForMobile}: CategoriesContentStyledDivPropTypes) => `${96 / postsPerRawForMobile}`}vw, 2fr));

  @media only screen and (min-width: 414px) {
    grid-gap: 15px 10px;
    grid-template-columns: repeat(auto-fill, minmax(${({cardWidth}: CategoriesContentStyledDivPropTypes) => `${cardWidth}px`}, 1fr));
    .mobile-card{
      max-width: ${({cardWidth}:CategoriesContentStyledDivPropTypes)=>`${cardWidth}px`};
    }
  }

  @media only screen and (min-width: 768px) {
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(${({cardWidth}: CategoriesContentStyledDivPropTypes) => `${cardWidth}px`}, 1fr));
  }
`


const CategoriesRenderer: FC<CategoriesRendererPropTypes> = ({ uniqueData}) => {

    const {categoriesMetas, postsPerRawForMobile, cardWidth} =
        useSelector(({settings, posts}: StoreTypes) => {
            return {
                categoriesMetas: uniqueData?.metaData ? uniqueData?.metaData : posts?.categoriesMetas,
                postsPerRawForMobile: settings?.design?.postsPerRawForMobile || 2,
                cardWidth:settings?.design?.cardWidthDesktop || 255,
            }
        })

    return (
        <CategoriesRendererStyledDiv className={'categories-block'}
                                     cardWidth={cardWidth}
                                     postsPerRawForMobile={postsPerRawForMobile}>

            {categoriesMetas.map((category, index) => {
                     return (
                         <CategoryCard category={category}
                                       key={category._id}
                                       cardWidth={cardWidth}
                                       postsPerRawForMobile={postsPerRawForMobile}
                                       index={index}
                         />
                     )
            })}
        </CategoriesRendererStyledDiv>
    );
};
export default CategoriesRenderer;


// if (isMobile) {
//     return <MobileCategoryCard category={category}
//                                key={category._id}
//                                onActivateLoadingHandler={() => dispatch(setLoading(true))}
//                                index={index}
//                                isAppleMobileDevice={isAppleMobileDevice}
//
//     />
// } else {
//     return <CategoryCard onActivateLoadingHandler={() => dispatch(setLoading(true))}
//                          key={category._id}
//                          category={category}
//                          index={index}
//                          cardWidth={cardWidth}
//
//     />
// }