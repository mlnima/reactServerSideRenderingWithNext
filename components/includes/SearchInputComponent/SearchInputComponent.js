import React, { useEffect, useState, useContext, useRef } from 'react';
import './SearchInputComponent.scss';
import Link from 'next/link';
import withRouter from 'next/dist/client/with-router'

const SearchInputComponent = props => {

    const [ state, setState ] = useState({
        pathURL:'',
        keyword:'',
        queries: {}
    });

    useEffect(() => {
        console.log( props)
        if (props.pathURL){
            setState({
                ...state,
                pathURL:props.pathURL || '/posts'
            })
        }
    }, []);



    const onChangeHandler = e=>{
        setState({
            ...state,
            keyword:e.target.value
        })
    }


    return (
        <div className='search-bar'>
            <input name='keyword' onChange={e=>onChangeHandler(e)}/>
            <Link href={{
                pathname:state.pathURL,
                query:{
                    ...state.queries,
                    keyword:state.keyword
                }
            }}><a>Search</a></Link>
        </div>
    );
};
export default withRouter(SearchInputComponent);
