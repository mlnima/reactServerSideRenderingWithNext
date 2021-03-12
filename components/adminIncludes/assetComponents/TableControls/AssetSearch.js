import React, { useRef } from 'react';
import {useRouter} from "next/router";
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
        <form className='asset-page-search' onSubmit={e=>onSubmitHandler(e)}>
            <input ref={searchInput}/>
            <button>Search</button>
        </form>
    );
};
export default AssetSearch;
