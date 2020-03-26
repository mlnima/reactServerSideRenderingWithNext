import React, { useEffect, useState, useContext, useRef } from 'react';
import AppLayout from '../../components/layouts/AppLayout'
import { getSetting } from '../../_variables/ajaxVariables'
import { getMeta, getPosts } from '../../_variables/ajaxPostsVariables'
import SiteSettingSetter from '../../components/includes/SiteSettingsSetter/SiteSettingsSetter';
import withRouter from 'next/dist/client/with-router'
import Posts from '../../components/includes/Posts/Posts'
import Link from 'next/link'
import PaginationComponent from '../../components/includes/PaginationComponent/PaginationComponent'

const posts = props => {
    const [ state, setState ] = useState({
        posts: [],
        totalCount: 0
    });

    const [ postsData, setPostsData ] = useState({
        size: 30,
        pageNo: 1,
        postType: 'all',
        fields: [ 'all' ],
        keyword: '',
        author: 'all',
        status: 'all',
    });

    useEffect(() => {
        console.log(props)
    }, []);
    useEffect(() => {
        if (props.postsSource.posts) {
            setState({
                ...state,
                posts: props.postsSource.posts,
                totalCount: props.postsSource.totalCount
            })
        }
        if (props.getPostsData) {
            setPostsData(props.getPostsData)
        }
    }, [ props ]);

    return (
        <AppLayout>
            <div className='posts'>
                <SiteSettingSetter  { ...props }/>
                <Posts posts={ props.postsSource.posts || state.posts }/>
                <PaginationComponent
                    isActive={ true }
                    currentPage={postsData.pageNo }
                    totalCount={ state.totalCount }
                    size={ postsData.size }
                    maxPage={ Math.ceil(parseInt(state.totalCount) / parseInt(postsData.size))- 1 }
                    mainLinkUrl='http://localhost:3000/posts'
                />
            </div>
        </AppLayout>
    );
};

posts.getInitialProps = async ({ pathname, query, req, res, err }) => {
    let navigation;
    let identity;
    let postsSource;

    const getPostsData = {
        size: parseInt(query.size) || 30,
        pageNo: parseInt(query.page) || 1,
        postType: query.type || 'all',
        fields:  [ 'title', 'mainThumbnail', 'quality', 'likes', 'disLikes', 'views', 'duration' ],
        keyword: query.keyword || '',
        author: query.author || 'all',
        status: 'published',
        tag: query.tag || 'all',
        category: query.category || 'all',
        sort: query.sort || 'latest',
    }

    const identityData = await getSetting('identity');
    const navigationData = await getSetting('navigation');
    const postsData = await getPosts(getPostsData)

    identity = identityData.data.setting ? identityData.data.setting.data : {}
    navigation = navigationData.data.setting ? navigationData.data.setting : {}
    postsSource = postsData.data ? postsData.data : []
    return { identity, navigation, query, postsSource, getPostsData }
}

export default withRouter(posts);
