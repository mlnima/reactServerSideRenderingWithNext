import {FC, useMemo} from 'react';
import styled from "styled-components";
import {setLoading} from "../../../../../../store/actions/globalStateActions";
import {useDispatch, useSelector} from "react-redux";
import cardSizeCalculator from "../../../../../../_variables/util/cardSizeCalculator";
import {Meta, StoreTypes} from "../../../../../../_variables/TypeScriptTypes/GlobalTypes";
import CategoryCard from "../../../../cards/desktop/CategoryCard/CategoryCard";


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

    const dispatch = useDispatch()
    const categoriesMetas = uniqueData?.metaData ? uniqueData?.metaData :
                            useSelector((store: StoreTypes) => store?.posts?.categoriesMetas)
    const elementSize = postElementSize ? postElementSize : useSelector((store: StoreTypes) => store?.settings?.design?.postElementSize);
    const cardWidth = useMemo(() => cardSizeCalculator(elementSize), [])

    return (
        <CategoriesRendererStyledDiv className='categories-block'>
            {categoriesMetas.map((category) => {
                return <CategoryCard onActivateLoadingHandler={() => dispatch(setLoading(true))}
                                     key={category._id}
                                     cardWidth={cardWidth}
                                     category={category}

                />
            })
            }
        </CategoriesRendererStyledDiv>
    );
};
export default CategoriesRenderer;
