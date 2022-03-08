import {useRouter} from "next/router";
import styled from "styled-components";

const PostsTypesStyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    margin: 0 10px;
  }
`
const PostsTypes = () => {
    const {push,pathname,query} = useRouter()
    
    const onFormatChangeHandler = e => {
        push({
            pathname: pathname,
            query: {...query, postType: e.target.value}
        }).finally()
    }

    return (
        <PostsTypesStyledDiv className='post-type asset-page-asset-type-selector'>
            <p>Post Type :</p>
            <select className={'custom-select'} onChange={e => onFormatChangeHandler(e)} value={query.postType}>
                <option value='all'>All</option>
                <option value='standard'>Standard</option>
                <option value='video'>Video</option>
                <option value='product'>Product</option>
                <option value='food'>Food</option>
                <option value='article'>Article</option>
                <option value='learn'>Learn</option>
                <option value='promotion'>Promotion</option>
            </select>
        </PostsTypesStyledDiv>
    );
};
export default PostsTypes;
