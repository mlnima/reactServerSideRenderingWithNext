import {FC} from 'react';
import styled from "styled-components";
import {setLoading} from "@store/clientActions/globalStateActions";
import {useDispatch, useSelector} from "react-redux";
import cardSizeCalculator from "@_variables/util/cardSizeCalculator";
import {Meta, StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import dynamic from "next/dynamic";
const CategoryCard = dynamic(() => import('../../../../cards/desktop/CategoryCard/CategoryCard'));
const MobileCategoryCard = dynamic(() =>
    import('@components/includes/cards/mobile/MobileCategoryCard/MobileCategoryCard'));

let CategoriesRendererStyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

interface CategoriesRendererPropTypes {
    uniqueData?:{
        metaData?:Meta[],
    },
    postElementSize: string,
}

const CategoriesRenderer: FC<CategoriesRendererPropTypes> = ({ postElementSize,uniqueData}) => {

    const dispatch = useDispatch();

    const categoriesRendererData = useSelector(({settings,posts}: StoreTypes)=>{
        const elementSize = postElementSize ? postElementSize : settings?.design?.postElementSize;
        return{
            categoriesMetas: uniqueData?.metaData ? uniqueData?.metaData : posts?.categoriesMetas,
            postsPerRawForMobile: settings?.identity?.postsPerRawForMobile || 2,
            isMobile: settings?.isMobile,
            cardWidth: cardSizeCalculator(elementSize)
        }
    })

    return (
        <CategoriesRendererStyledDiv className='categories-block'>
            {categoriesRendererData.categoriesMetas.map((category) => {

                if (categoriesRendererData.isMobile){
                    return <MobileCategoryCard postsPerRawForMobile={categoriesRendererData.postsPerRawForMobile}
                                               category={category}
                                               key={category._id}
                                               onActivateLoadingHandler={() => dispatch(setLoading(true))}
                    />
                }else{
                    return <CategoryCard onActivateLoadingHandler={() => dispatch(setLoading(true))}
                                         key={category._id}
                                         cardWidth={categoriesRendererData.cardWidth}
                                         category={category}

                    />
                }
            })
            }
        </CategoriesRendererStyledDiv>
    );
};
export default CategoriesRenderer;
