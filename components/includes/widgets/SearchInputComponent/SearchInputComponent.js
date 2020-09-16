import React, {useEffect, useState} from 'react';
import './SearchInputComponent.scss';
import Link from 'next/link';
import withRouter from 'next/dist/client/with-router'
import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

const SearchInputComponent = props => {
    const router = useRouter()
    const [state, setState] = useState({
        pathURL: '',
        keyword: '',
        queries: {},
        style: {
            backgroundColor: '#222222'
        }
    });


    useEffect(() => {
        setState({
            ...state,
            queries: props.router ? props.router.query : {},
            pathURL: props.router ? props.router.pathname.includes('meta') ? props.router.pathname : '/posts' : '/posts',
            keyword: props.router ? props.router.query ? props.router.query.keyword ? props.router.query.keyword : '' : '' : '',
            style: {
                ...state.style,
                backgroundColor: props.searchBtnBackgroundColor,
                color: props.searchBtnColor,
            }
        })
    }, [props]);


    useEffect(() => {
        if (props.router) {
            if ((props.router.pathname.includes('posts') || props.router.pathname.includes('meta')) && props.router.query.keyword === '') {
                // props.router.push('/')
            }
        }
    }, [state]);


    const onChangeHandler = e => {
        setState({
            ...state,
            keyword: e.target.value
        })
    }


    const mainPath = props.router ?
        props.router.asPath.includes('/tags/') || props.router.asPath.includes('/categories/') || props.router.asPath.includes('/actors/') ? '/posts' :
            props.router.asPath.includes('/tags') || props.router.asPath.includes('/categories') || props.router.asPath.includes('/actors') ? '/meta' : '/posts' : '/posts'

    const contentType = props.router ? props.router.query.contentType : ''
    const contentName = props.router ? props.router.query.contentName : ''

    const asPath = props.router ? props.router.asPath.includes('/tags/') ? '/' + contentType + '/' + contentName :
        props.router.asPath.includes('/categories/') ? '/' + contentType + '/' + contentName :
            props.router.asPath.includes('/actors/') ? '/' + contentType + '/' + contentName :
                props.router.asPath.includes('/tags') ? '/tags' :
                    props.router.asPath.includes('/categories') ? '/categories' :
                        props.router.asPath.includes('/actors') ? '/actors' :
                            '/posts' : '/posts'

    const asQuery = {keyword: state.keyword ? state.keyword : undefined, page: router.query.page ? router.query.page : undefined, content: router.query.content ? router.query.content : undefined,}
    !asQuery.keyword ? delete asQuery.keyword : null;
    asQuery.page == 1 ? delete asQuery.page : null;
    !asQuery.page ? delete asQuery.page : null;
    !asQuery.content ? delete asQuery.content : null;


    const onSearchHandler = e => {
        e.preventDefault()
        router.push({
            pathname: mainPath,
            query: {
                ...state.queries,
                keyword: state.keyword
            }
        }, {
            pathname: asPath,
            query: asQuery
        })
    }


    return (
        <form className='search-bar' onSubmit={e => onSearchHandler(e)}>
            <input className='search-input' name='keyword' onChange={e => onChangeHandler(e)} value={state.keyword}/>
            <button className='search-bar-btn' type='submit'><FontAwesomeIcon icon={faSearch} className='search-bar-btn-logo' style={state.style}/></button>
        </form>
    );
};
export default withRouter(SearchInputComponent);

