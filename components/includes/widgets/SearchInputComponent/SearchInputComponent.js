import React, {useEffect, useState} from 'react';
import withRouter from 'next/dist/client/with-router'
import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";

const SearchInputComponent = props => {
    const router = useRouter()
    const [state, setState] = useState({
        pathURL: '',
        keyword: '',
        queries: {},
        style: {
            backgroundColor: '#222222'
        },
        isOpen: false
    });
    const openStatus = !props.mobileMode
    const [isOpen,setIsOpen] = useState(openStatus)


    useEffect(() => {
        setState({
            ...state,
            queries: props.router ? props.router.query : {},
            pathURL: props.router ? props.router.pathname.includes('meta') ? props.router.pathname : '/posts' : '/posts',
            keyword: props.router ? props.router.query ? props.router.query.keyword ? props.router.query.keyword : '' : '' : '',

        })
        props.mobileMode ? setIsOpen(false): null;
    }, []);


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


    const onOpenCloseHandler = () => {
        state.isOpen ?
            setState({
                ...state,
                isOpen: false
            }) :
            setState({
                ...state,
                isOpen: true
            })
    }


    if (isOpen) {
        return (
            <form className='search-bar' onSubmit={e => onSearchHandler(e)}>
                {props.mobileMode ?  <button className='search-bar-btn-close' aria-label='Center Align' onClick={onOpenCloseHandler}><FontAwesomeIcon icon={faTimes} className='svg-logo-small'/></button>:null }
                <input className='search-input' type='text' name='keyword' onChange={e => onChangeHandler(e)} value={state.keyword} placeholder='search'/>
                <button className='search-bar-btn' aria-label='Center Align' type='submit'><FontAwesomeIcon icon={faSearch} className=' svg-logo-small' /></button>
            </form>
        );
    } else {
        return (
            <button className='search-bar-btn-open' aria-label='Center Align' onClick={onOpenCloseHandler}><FontAwesomeIcon icon={faSearch} className='svg-logo-small'/></button>
        )
    }


};
export default withRouter(SearchInputComponent);

