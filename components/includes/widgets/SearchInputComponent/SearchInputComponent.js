import React, { useEffect, useState, useContext, useRef } from 'react';
import './SearchInputComponent.scss';
import Link from 'next/link';
import withRouter from 'next/dist/client/with-router'

const SearchInputComponent = props => {

    const [ state, setState ] = useState({
        pathURL: '',
        keyword: '',
        queries: {}
    });

    useEffect(() => {
        setState({
            ...state,
            queries:props.router ? props.router.query:{},
            pathURL: props.router? props.router.pathname.includes('meta') ? props.router.pathname: '/posts' :'/posts'
        })
    }, [props]);

    const onChangeHandler = e => {
        setState({
            ...state,
            keyword: e.target.value
        })
    }

    const onSubmitHandler = e => {
        e.preventDefault()
        props.router.push({
            pathname: state.pathURL,
            query: {
                ...state.queries,
                keyword: state.keyword
            }
        })
    }

    return (
        <form className='search-bar' onSubmit={ e => onSubmitHandler(e) }>
            <input className='search-input' name='keyword' onChange={ e => onChangeHandler(e) }/>
            <button className='search-bar-btn' type='submit'>Search</button>
        </form>
    );
};
export default withRouter(SearchInputComponent);
