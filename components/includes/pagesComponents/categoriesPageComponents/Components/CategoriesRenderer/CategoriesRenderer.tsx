import {FC} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import dynamic from "next/dynamic";
import {setLoading} from "@store/clientActions/globalStateActions";
import {Meta, StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

const CategoryCard = dynamic(() => import('@components/includes/cards/desktop/CategoryCard/CategoryCard'));
const MobileCategoryCard = dynamic(() =>
    import('@components/includes/cards/mobile/MobileCategoryCard/MobileCategoryCard'));

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

  @media only screen and (min-width: 768px) {
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(${({cardWidth}: CategoriesContentStyledDivPropTypes) => `${cardWidth}px`}, 1fr));
  }
`


const CategoriesRenderer: FC<CategoriesRendererPropTypes> = ({ uniqueData}) => {

    const dispatch = useDispatch();

    const {categoriesMetas, postsPerRawForMobile, isMobile, cardWidth, isAppleMobileDevice} =
        useSelector(({settings, posts}: StoreTypes) => {
            return {
                categoriesMetas: uniqueData?.metaData ? uniqueData?.metaData : posts?.categoriesMetas,
                postsPerRawForMobile: settings?.design?.postsPerRawForMobile || 2,
                isMobile: settings?.isMobile,
                cardWidth:settings?.design?.cardWidthDesktop || 255,
                isAppleMobileDevice: settings?.isAppleMobileDevice
            }
        })



    return (
        <CategoriesRendererStyledDiv className={'categories-block'}
                                     cardWidth={cardWidth}
                                     postsPerRawForMobile={postsPerRawForMobile}>

            {categoriesMetas.map((category, index) => {
                if (isMobile) {
                    return <MobileCategoryCard category={category}
                                               key={category._id}
                                               onActivateLoadingHandler={() => dispatch(setLoading(true))}
                                               index={index}
                                               isAppleMobileDevice={isAppleMobileDevice}
                                               cardWidth={cardWidth}
                    />
                } else {
                    return <CategoryCard onActivateLoadingHandler={() => dispatch(setLoading(true))}
                                         key={category._id}
                                         category={category}
                                         index={index}
                                         cardWidth={cardWidth}

                    />
                }
            })
            }
        </CategoriesRendererStyledDiv>
    );
};
export default CategoriesRenderer;
