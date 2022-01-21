import React from 'react';
import CategoryCard from "../../../../cards/CategoryCard/CategoryCard";
import styled from "styled-components";
import {setLoading} from "../../../../../../store/actions/globalStateActions";
import {useDispatch, useSelector} from "react-redux";

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

    const cardWidth = elementSize === 'list' ? 116.6 :
        elementSize === 'smaller' ? 209.8 :
            elementSize === 'small' ? 255 :
                elementSize === 'medium' ? 320 : 255

    return (
        <CategoriesRendererStyledDiv className='categories-content' postElementSize={postElementSize} cardWidth={cardWidth}>

            {
                categoriesMetas.map((category) => {
                    return <CategoryCard onActivateLoadingHandler={() => dispatch(setLoading(true))} key={category._id} cardWidth={cardWidth} category={category} postElementSize={elementSize}/>
                })
            }
        </CategoriesRendererStyledDiv>
    );
};
export default CategoriesRenderer;
