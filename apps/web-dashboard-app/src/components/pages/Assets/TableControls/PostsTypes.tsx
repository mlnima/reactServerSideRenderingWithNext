import styled from "styled-components";
import React, {useMemo} from "react";
import {postTypes} from "@repo/data-structures";
import {convertVariableNameToName} from "shared-util";
import {useSearchParams} from "react-router-dom";
import paramsObjectGenerator from "../../../../variables/paramsObjectGenerator";

const PostsTypesStyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    margin: 0 10px;
  }
`
const PostsTypes = () => {
    // const {push,pathname,query} = useRouter()

    const [search, setSearch] = useSearchParams();
    //@ts-ignore
    const query = useMemo(()=>paramsObjectGenerator(search),[search])
    
    const onFormatChangeHandler = (e:React.ChangeEvent<any>) => {

        setSearch({...query,postType: e.target.value})
        // push({
        //     pathname: pathname,
        //     query: {...query, postType: e.target.value}
        // }).finally()
    }

    return (
        <PostsTypesStyledDiv className='post-type asset-page-asset-type-selector'>
            <p>Post Type :</p>
            <select className={'primarySelect'} onChange={e => onFormatChangeHandler(e)} value={query?.postType}>
                <option value='' >Select</option>
                <option value='all'>All</option>
                {postTypes.map((postType:string)=><option key={postType} value={postType}>{convertVariableNameToName(postType)}</option>)}
            </select>
        </PostsTypesStyledDiv>
    );
};
export default PostsTypes;
