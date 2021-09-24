import CategoryCard from "../CategoryCard/CategoryCard";
import _ from "lodash";
import {useContext} from "react";
import {AppContext} from "../../../../../context/AppContext";
import styled from "styled-components";

let CategoriesRendererStyledDiv  = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`


const CategoriesRenderer = ({postElementSize, metaData, categories}) => {
    const contextData = useContext(AppContext);

    const cardWidth = postElementSize === 'list' ? 116.6 :
        postElementSize === 'smaller' ? 209.8 :
            postElementSize === 'small' ? 255 :
                postElementSize === 'medium' ? 320 : 255

    return (
        <CategoriesRendererStyledDiv className='categories-content'>
            {
                (categories || metaData || []).map(category => {
                    return <CategoryCard onActivateLoadingHandler={contextData?.functions?.loadingHandler} key={_.uniqueId('category_')} cardWidth={cardWidth} category={category} postElementSize={postElementSize}/>
                })
            }
        </CategoriesRendererStyledDiv>
    );
};
export default CategoriesRenderer;
