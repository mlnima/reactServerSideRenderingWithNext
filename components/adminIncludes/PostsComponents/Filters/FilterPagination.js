import React, { useEffect, useState, useRef } from 'react';
import FA from 'react-fontawesome';
import Link from 'next/link'
import withRouter from 'next/dist/client/with-router'

const FilterPagination = props => {

    let currentPageInput = useRef(null);

    const [ state, setState ] = useState({
        targetPage: 1
    })

    useEffect(() => {
        setState({
            ...state,
            targetPage: props.getPostsData.pageNo
        })
    }, [ props ]);


    const onChangeHandler = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='FilterPagination'>

            <div className='pagesNavigation'>
                <label className='totalPosts'>{ props.postsSource.totalCount } items</label>
                <Link key='...1' href={ {
                    pathname: props.pathname || props.router.pathname, query: { ...props.query, page: 1 }
                } }><a className='adminPaginationActionLink'><FA className='fontawesomeMedium' name="angle-double-left"/></a></Link>

                <Link href={ {
                    pathname: props.pathname || props.router.pathname, query: { ...props.query, page: props.getPostsData.pageNo + -1 }
                } }><a className='adminPaginationActionLink'><FA className='fontawesomeMedium' name="angle-left"/></a></Link>


                <input name='targetPage' className='pageNumberInput goToPageManuallyInput' value={ state.targetPage } ref={ currentPageInput } type='number' min={ 0 } onChange={ e => onChangeHandler(e) }/>
                <Link href={ {
                    pathname: props.pathname || props.router.pathname, query: { ...props.query, page: state.targetPage }
                } }><a className='goToPageManuallyLink'>GO</a></Link>

                <Link href={ {
                    pathname: props.pathname || props.router.pathname, query: { ...props.query, page: props.getPostsData.pageNo + 1 }
                } }><a className='adminPaginationActionLink'><FA className='fontawesomeMedium' name="angle-right"/></a></Link>

                <Link key={ `...${ Math.ceil(parseInt(props.postsSource.totalCount) / parseInt(props.getPostsData.size)) }` } href={ {
                    pathname: props.pathname || props.router.pathname, query: { ...props.query, page: Math.ceil(parseInt(props.postsSource.totalCount) / parseInt(props.getPostsData.size)) }
                } }><a className='adminPaginationActionLink'><FA className='fontawesomeMedium' name="angle-double-right"/></a></Link>
            </div>

        </div>
    );
};

export default withRouter(FilterPagination);