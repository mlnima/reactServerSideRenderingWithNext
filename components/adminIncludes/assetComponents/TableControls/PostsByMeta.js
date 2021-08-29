import {useRef} from 'react';
import {useRouter} from "next/router";
import styled from "styled-components";

const PostsByMetaStyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    margin: 0 4px;
  }
`;

const PostsByMeta = props => {
    const metaInput = useRef(null)
    const router = useRouter()

    const onSearchByMetaHandler = e => {
        e.preventDefault()
        router.push({
            pathname: router.pathname,
            query: {...router.query, metaId: metaInput.current.value},
        })
    }


    return (
        <PostsByMetaStyledForm className='posts-by-meta' onSubmit={e => onSearchByMetaHandler(e)}>
            <p>Meta:</p>
            <input ref={metaInput} type={'text'}/>
            <button>Search</button>
        </PostsByMetaStyledForm>
    );
};
export default PostsByMeta;
