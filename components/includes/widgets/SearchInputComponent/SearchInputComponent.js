import React,{useEffect, useState} from 'react';
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
                page: 1
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


    return (
        <React.Fragment>
            <style jsx>{`
                .search-bar{
                    display: flex;
                    height: 35px;
                    width: clamp(100px, 200px, 400px);
                    font-size: 1em;
                }
                .search-input {
                    display: flex;
                    justify-content: center;
                    width: 80%;
                    margin-right: 0;
                    border: none;
                   // border-radius: 3px 0  0  3px;
                    padding: 0 5px;
                }
                .search-input:focus{
                    outline: none;
                }
                .search-bar-btn{
                    width: 20%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: transparent;
                    outline: none;
                    padding: 0.2em;
                    margin-left: 0;
                    //border-radius: 0 3px 3px 0;
                    border: none;
                    color: var(--main-text-color);
                }
                .search-bar-btn:focus{
                    outline: none;
                }
                .search-bar-btn:active{
                    border: none;
                }
                .search-bar-btn-open{
                    border:none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: transparent;
                    outline: none;
                }
                //.search-bar-btn-open-svg{
                //    width: 15px;
                //    height: 15px;
                //}
                .search-bar-btn-open{
                      border:none;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      background-color: transparent;
                      outline: none;
                }
                //.search-bar-btn-open-svg{
                //      width: 20px;
                //      height: 20px;
                //}
                @media only screen and (min-width: 768px){
                                .search-bar{
                    display: flex;
                    height: 24px;
                    width: clamp(250px, 400px, 600px);
                    font-size: 1em;
                }
                }
            `}</style>
            {isOpen || !props.mobileMode ?
                <form className='search-bar' onSubmit={e => onSearchHandler(e)}>
                    {props.mobileMode ?
                        <button className='search-bar-btn-close' aria-label='Center Align' onClick={(e) => onOpenCloseHandler(e)}>

                            <FontAwesomeIcon style={{width: '24px',height: '24px',color:'var(--navigation-text-color)'}} icon={faTimes} className='search-bar-btn-open-svg'/>
                        </button> : null}
                    <input className='search-input' type='text' name='keyword' onChange={e => onChangeHandler(e)} value={state.keyword} placeholder='search'/>
                    <button className='search-bar-btn' aria-label='Center Align' type='submit'><FontAwesomeIcon style={{width: '24px',height: '24px',color:'var(--navigation-text-color)'}} icon={faSearch} /></button>
                </form> :
                <button className='search-bar-btn-open' aria-label='Center Align' onClick={(e) => onOpenCloseHandler(e)}>

                    <FontAwesomeIcon style={{width: '24px',height: '24px',color:'var(--navigation-text-color)'}} icon={faSearch} className='search-bar-btn-open-svg'/>
                </button>
            }

        </React.Fragment>
    )


};
export default withRouter(SearchInputComponent);

