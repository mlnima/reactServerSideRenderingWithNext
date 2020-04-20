import React, { useEffect, useState, useContext, useRef } from 'react';
import withRouter from 'next/dist/client/with-router'
const AssetSearch = props => {
    const searchInput = useRef(null)
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);

   const onSubmitHandler = e=>{
        e.preventDefault()
       props.router.push({
           pathname: props.router?props.router.pathname:'',
           query: { ...props.router.query, keyword: searchInput.current.value}
           })
    }
    return (
        <form className='asset-page-search' onSubmit={e=>onSubmitHandler(e)}>
            <input ref={searchInput}/>
            <button>Search</button>
        </form>
    );
};
export default withRouter(AssetSearch);
