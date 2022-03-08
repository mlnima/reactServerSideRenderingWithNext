import {useRef, useEffect, FC, useState} from 'react';
import {useRouter} from "next/router";
import styled from "styled-components";

const PostsByMetaStyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 300px;

  p {
    margin: 0 10px;
  }

  .form-control-input {
    width: 160px;
  }

  .btn-navigation {
    margin: 0 2px;
  }
`;

const PostsByMeta: FC = () => {

    const [metaId, setMetaId] = useState(null)

    const {query, pathname, push} = useRouter()

    const onSearchByMetaHandler = e => {
        e.preventDefault()
        if (metaId.trim().match(/^[0-9a-fA-F]{24}$/)) {
            const queryData = {...query, metaId}
            // @ts-ignore
            delete queryData.page
            // @ts-ignore
            delete queryData.keyword
            push({
                pathname,
                query: queryData
            }).finally()
        }

    }
    const onDeleteMetaHandler = () => {
        if (metaId) {
            setMetaId('')
            const resetQueries = query
            delete resetQueries.keyword
            delete resetQueries.metaId
            delete resetQueries.page
            push({
                pathname,
                query: resetQueries
            }).finally()
        }
    }

    useEffect(() => {
        if (query.metaId) {
            setMetaId(query.metaId)
        }
    }, [query]);


    return (


        <PostsByMetaStyledForm className='posts-by-meta' onSubmit={e => onSearchByMetaHandler(e)}>
            <p>Meta:</p>

            <input className={'form-control-input'}
                   type={'text'}
                   onChange={e => setMetaId(e.target.value)}
                   value={metaId}
            />

            <button className={'btn btn-navigation'}>Search</button>

            {metaId ? <span className={'btn btn-navigation'} onClick={onDeleteMetaHandler}>X</span> : null}

        </PostsByMetaStyledForm>


    );
};
export default PostsByMeta;
