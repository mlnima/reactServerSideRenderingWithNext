import {useRef, useEffect} from 'react';
import {useRouter} from "next/router";
import styled from "styled-components";

const PostsByMetaStyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin: 0 10px;
  }
  .form-control-input{
    width: 160px;
  }

  .btn-navigation {
    margin: 0 2px;
  }
`;

const PostsByMeta = props => {
    const metaInput = useRef(null)
    const router = useRouter()

    const onSearchByMetaHandler = e => {
        e.preventDefault()
        if (metaInput.current.value.trim().match(/^[0-9a-fA-F]{24}$/)){
            const query = {...router.query, metaId: metaInput.current.value}
            delete query.page
            delete query.keyword
            router.push({
                pathname: router.pathname,
                query
            })
        }

    }
    const onDeleteMetaHandler = ()=>{
        if (metaInput.current){
            metaInput.current.value = '';
            const query = { ...router.query}
            delete query.keyword
            delete query.metaId
            delete query.page

            router.push({
                pathname: router?router.pathname:'',
                query
            })
        }
    }

    useEffect(() => {
        if (router.query.metaId && metaInput.current){
            metaInput.current.value = router.query.metaId
        }
    }, [props]);


    return (


        <PostsByMetaStyledForm className='posts-by-meta' onSubmit={e => onSearchByMetaHandler(e)}>
            <p>Meta:</p>
            <input className={'form-control-input'} ref={metaInput} type={'text'} defaultValue={router.query.metaId}/>
            <button className={'btn btn-navigation'}>Search</button>
            {metaInput?.current && metaInput?.current?.value ?
                <span className={'btn btn-navigation'} onClick={onDeleteMetaHandler}>X</span>
                :null
            }

        </PostsByMetaStyledForm>


    );
};
export default PostsByMeta;
