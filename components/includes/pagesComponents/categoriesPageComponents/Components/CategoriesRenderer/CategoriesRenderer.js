import {useMemo} from 'react';
import styled from "styled-components";
import dynamic from "next/dynamic";
import {setLoading} from "../../../../../../store/actions/globalStateActions";
import {useDispatch, useSelector} from "react-redux";
import cardSizeCalculator from "../../../../../../_variables/util/cardSizeCalculator";
const CategoryCard = dynamic(() => import('../../../../cards/CategoryCard/CategoryCard'));

let CategoriesRendererStyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
  .category-card-link-image {
    width: 48vw;
    margin: 1vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    
    @media only screen and (min-width: 768px) {
      width: ${props => props?.cardWidth}px;
      margin: 5px;
      .category-card-title {
        font-size: 14px;
      }
    }
  }
`


const CategoriesRenderer = ({metaData, postElementSize}) => {
    const dispatch = useDispatch()
    const categoriesMetas = metaData ? metaData : useSelector(store => store?.posts?.categoriesMetas)
    const elementSize = postElementSize ? postElementSize : useSelector(store => store?.settings?.design?.postElementSize);
    const cardWidth = useMemo(()=>cardSizeCalculator(elementSize),[])

    return (
        <CategoriesRendererStyledDiv className='categories-content' cardWidth={cardWidth}>

            {
                categoriesMetas.map((category) => {
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
