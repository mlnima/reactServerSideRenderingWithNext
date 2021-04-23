import React, {useEffect, useState} from 'react';
import withRouter from 'next/dist/client/with-router'
import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
let StyledFrom = styled.form`
  display: flex;
  height: 24px;
  width: 100%;
  font-size: 1em;
  .search-input {
    display: flex;
    justify-content: center;
    width: 80%;
    margin-right: 0;
    //border-radius: 0.6em 0 0 0.6em;
    border-radius: 3px 0  0  3px;
    &:focus{
      outline: none;
    }
  }

  .search-bar-btn {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    outline: none;
    padding: 0.2em;
    margin-left: 0;
    border-radius: 0 3px 3px 0;
    border: none;
    color: var(--main-text-color);
    &:focus{
      outline: none;
    }
    &:active{
      border: none;
    }
  }
  @media only screen and (min-width: 768px) {
    .search-input{
      max-width: 500px;
    }
    .search-bar-btn{
      max-width: 70px;
    }
}
`
let StyledButton = styled.button`
  border:none;
  display: flex;
  justify-content: center;
  align-items: center;
  //padding: 2px 5px;
  background-color: transparent;
  outline: none;
`
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
    //console.log(props.mobileMode)
    const [isOpen, setIsOpen] = useState(openStatus)


    useEffect(() => {
        setState({
            ...state,
            queries: props.router ? props.router.query : {},
            pathURL: props.router ? props.router.pathname.includes('meta') ? props.router.pathname : '/posts' : '/posts',
            keyword: props.router ? props.router.query ? props.router.query.keyword ? props.router.query.keyword : '' : '' : '',

        })
        props.mobileMode ? setIsOpen(false) : null;
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
    asQuery.page === 1 ? delete asQuery.page : null;
    !asQuery.page ? delete asQuery.page : null;
    !asQuery.content ? delete asQuery.content : null;


    const onSearchHandler = e => {
        e.preventDefault()
        router.push({
            pathname: mainPath,
            query: {
                ...state.queries,
                keyword: state.keyword,
                page:1
            }
        }, {
            pathname: asPath,
            query: asQuery
        })
    }


    const onOpenCloseHandler = e => {
        e.preventDefault()
        isOpen ?
            setIsOpen(false) :
            setIsOpen(true)
    }

    if (isOpen) {
        return (
            <StyledFrom className='search-bar' onSubmit={e => onSearchHandler(e)}>
                {props.mobileMode && isOpen ?
                    <StyledButton className='search-bar-btn-close' aria-label='Center Align' onClick={(e)=>onOpenCloseHandler(e)}><FontAwesomeIcon icon={faTimes} className='svg-logo-small'/></StyledButton> : null}
                <input className='search-input' type='text' name='keyword' onChange={e => onChangeHandler(e)} value={state.keyword} placeholder='search'/>
                <button className='search-bar-btn' aria-label='Center Align' type='submit'><FontAwesomeIcon icon={faSearch} className=' svg-logo-small'/></button>
            </StyledFrom>
        );
    } else {
        return (
            <StyledButton className='search-bar-btn-open' aria-label='Center Align' onClick={(e)=>onOpenCloseHandler(e)}><FontAwesomeIcon icon={faSearch} className='svg-logo-small'/></StyledButton>
        )
    }


};
export default withRouter(SearchInputComponent);

