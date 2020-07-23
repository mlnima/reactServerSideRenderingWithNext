import React, {useEffect, useState, useContext, useRef} from 'react';
import './SearchInputComponent.scss';
import Link from 'next/link';
import withRouter from 'next/dist/client/with-router'

const SearchInputComponent = props => {

    const [state, setState] = useState({
        pathURL: '',
        keyword: '',
        queries: {}
    });
    useEffect(() => {
        console.log('search widget:',props)
    }, [props]);




    useEffect(() => {
        // const keyword = props.router ? props.router.query ? props.router.query.keyword ? props.router.query.keyword : '' : '' : ''
        // console.log('')
        setState({
            ...state,
            queries: props.router ? props.router.query : {},
            pathURL: props.router ? props.router.pathname.includes('meta') ? props.router.pathname : '/posts' : '/posts',
            keyword: props.router ? props.router.query ? props.router.query.keyword ? props.router.query.keyword : '' : '' : ''
        })
    }, [props]);


    useEffect(() => {
        if (props.router){
            if ((props.router.pathname.includes('posts')||props.router.pathname.includes('meta')) && props.router.query.keyword === '' ){
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

    const onSubmitHandler = e => {
        e.preventDefault()
        const mainPath = props.router ?
            props.router.asPath.includes('/tags/') || props.router.asPath.includes('/categories/') || props.router.asPath.includes('/actors/') ? '/posts' :
                props.router.asPath.includes('/tags') || props.router.asPath.includes('/categories') || props.router.asPath.includes('/actors')  ? '/meta' : '/posts':  '/posts'
        //
        // const asPath = !props.router ? '/posts' :
        //         props.router.asPath.includes('/tags/') || props.router.asPath.includes('/categories/') || props.router.asPath.includes('/actors/') ?  props.router.asPath:
        //         props.router.asPath.includes('/tags') || props.router.asPath.includes('/categories') || props.router.asPath.includes('/actors') ? '/' + props.router.pageType:
        //         props.router.pathname

        const asPath = props.router ? props.router.asPath.includes('/tags/') || props.router.asPath.includes('/categories/') || props.router.asPath.includes('/actors/')? props.router.asPath :
             props.router.asPath.includes('/tags') ? '/tags' :
             props.router.asPath.includes('/categories') ? '/categories' :
             props.router.asPath.includes('/actors') ? '/actors' :
            '/posts':
            '/posts'


        const mainQuery = !props.router ? {} :
            props.router.asPath.includes('/tags') || props.router.asPath.includes('/categories') || props.router.asPath.includes('/actors') ? {keyword:state.keyword?state.keyword:null} : { ...props.queryData }

        const maineQuery = props.router.asPath.includes('/tags') || props.router.asPath.includes('/categories') || props.router.asPath.includes('/actors') ? {keyword:state.keyword?state.keyword:null} : {}
        const asQuery = props.router.asPath.includes('/tags') || props.router.asPath.includes('/categories') || props.router.asPath.includes('/actors') ? {keyword:state.keyword?state.keyword:null} : {}

        console.log(mainPath,asPath,asQuery)
        props.router.push({
            pathname: mainPath,
            query: {
                    ...state.queries,
                    keyword:state.keyword
                },
            as:{
                pathname:asPath,
                query:asQuery
            },

        })
    }

    const mainPath = props.router ?
        props.router.asPath.includes('/tags/') || props.router.asPath.includes('/categories/') || props.router.asPath.includes('/actors/') ? '/posts' :
            props.router.asPath.includes('/tags') || props.router.asPath.includes('/categories') || props.router.asPath.includes('/actors')  ? '/meta' : '/posts':  '/posts'

    const asPath = props.router ? props.router.asPath.includes('/tags/') || props.router.asPath.includes('/categories/') || props.router.asPath.includes('/actors/')? props.router.asPath :
        props.router.asPath.includes('/tags') ? '/tags' :
            props.router.asPath.includes('/categories') ? '/categories' :
                props.router.asPath.includes('/actors') ? '/actors' :
                    '/posts':
        '/posts'

    const asQuery = {keyword:state.keyword?state.keyword:undefined,page:props.router.query.page ?props.router.query.page:undefined,content:props.router.query.content ?props.router.query.content:undefined,}
          !asQuery.keyword ? delete asQuery.keyword  : null;
          // asQuery.page ==1 ? delete asQuery.page  : null;
          !asQuery.page ? delete asQuery.page  : null;
          !asQuery.content ? delete asQuery.content  : null;


    return (
        <div className='search-bar' >
            <input className='search-input' name='keyword' onChange={e => onChangeHandler(e)} value={state.keyword}/>
            <Link href={{
                pathname: mainPath,
                query: {
                    ...state.queries,
                    keyword:state.keyword
                }
            }} as={{
                pathname:asPath,
                query:asQuery
            }}><a className='search-bar-btn'>Search</a></Link>
        </div>
    );
};
export default withRouter(SearchInputComponent);
