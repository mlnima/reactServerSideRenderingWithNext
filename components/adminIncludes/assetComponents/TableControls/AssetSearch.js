import React, {useEffect, useRef} from 'react';
import {useRouter} from "next/router";
import styled from "styled-components";
let StyledForm = styled.form`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .form-control-input{
    width: 160px;
  }
  .btn-navigation {
    margin: 0 2px;
  }
`;

const AssetSearch = props => {
    const searchInput = useRef(null)
    const router = useRouter()

   const onSubmitHandler = e=>{
        e.preventDefault()

       const query = {
            ...router.query,
           keyword: searchInput.current.value,
        }
       delete query.page
       delete query.metaId

       router.push({
           pathname: router?router.pathname:'',
           query: { ...router.query, keyword: searchInput.current.value}
           })
    }
    const onDeleteKeywordHandler = ()=>{
        if (searchInput.current){
            searchInput.current.value = '';
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
        if (router.query.keyword && searchInput.current){
            searchInput.current.value = router.query.keyword
        }else if (router.query.keyword && searchInput.current){
            searchInput.current.value = ''
        }
    }, [props,router.query]);


    return (

        <StyledForm className={'asset-page-search'} onSubmit={e=>onSubmitHandler(e)}>
            <input className={'form-control-input'} ref={searchInput} type={'text'}/>
            <button className={'btn btn-navigation'}>Search</button>
            {searchInput?.current && searchInput?.current?.value?
                <span className={'btn btn-navigation'} onClick={onDeleteKeywordHandler}>X</span>
                :null
            }

        </StyledForm>
    );
};
export default AssetSearch;
