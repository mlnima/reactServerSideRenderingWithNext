import React, { useRef } from 'react';
import {useRouter} from "next/router";
import styled from "styled-components";
let StyledForm = styled.form`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  input{
    @include adminMainInput;
    background-color: var(--admin-color-0);
  }
  button{
    @include adminMainBtn;
  }
`;
const AssetSearch = props => {
    const searchInput = useRef(null)
    const router = useRouter()

   const onSubmitHandler = e=>{
        e.preventDefault()
       router.push({
           pathname: router?router.pathname:'',
           query: { ...router.query, keyword: searchInput.current.value}
           })
    }
    return (
        <StyledForm className='asset-page-search' onSubmit={e=>onSubmitHandler(e)}>
            <input ref={searchInput} type={'text'}/>
            <button>Search</button>
        </StyledForm>
    );
};
export default AssetSearch;
