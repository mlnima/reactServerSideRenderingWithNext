import CategoryCard from "../CategoryCard/CategoryCard";
import _ from "lodash";

const CategoriesRenderer = ({postElementSize,metaData, categories}) => {


    const cardWidth = postElementSize === 'list' ? 116.6 :
        postElementSize === 'smaller' ? 209.8 :
            postElementSize === 'small' ? 255 :
                postElementSize === 'medium' ? 320 : 255


    return (
        <div className='categories-content'>
            <style jsx>{`
              .categories-content {
                margin: 0 auto;
                display: flex;
                flex-flow: row wrap;
              }
            `}</style>
            {
                (categories || metaData || []).map(category => {
                    return <CategoryCard key={_.uniqueId('category_')} cardWidth={cardWidth} category={category} postElementSize={postElementSize}/>
                })
            }
        </div>
    );
};
export default CategoriesRenderer;
