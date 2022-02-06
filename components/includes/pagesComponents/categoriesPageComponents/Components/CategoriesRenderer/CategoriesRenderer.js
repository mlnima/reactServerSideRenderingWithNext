import {useMemo} from 'react';
import styled from "styled-components";
import dynamic from "next/dynamic";
import {setLoading} from "../../../../../../store/actions/globalStateActions";
import {useDispatch, useSelector} from "react-redux";
import cardSizeCalculator from "../../../../../../_variables/util/cardSizeCalculator";
const CategoryCard = dynamic(() => import('../../../../cards/desktop/CategoryCard/CategoryCard'));

let CategoriesRendererStyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const CategoriesRenderer = ({metaData, postElementSize}) => {
    const dispatch = useDispatch()
    const categoriesMetas = metaData ? metaData : useSelector(store => store?.posts?.categoriesMetas)
    const elementSize = postElementSize ? postElementSize : useSelector(store => store?.settings?.design?.postElementSize);
    const cardWidth = useMemo(()=>cardSizeCalculator(elementSize),[])

    return (
        <CategoriesRendererStyledDiv className='categories-block'>
            {categoriesMetas.map((category) => {
                    return <CategoryCard onActivateLoadingHandler={() => dispatch(setLoading(true))}
                                         key={category._id}
                                         cardWidth={cardWidth}
                                         category={category}
                                         postElementSize={elementSize}
                    />
                })
            }
        </CategoriesRendererStyledDiv>
    );
};
export default CategoriesRenderer;
