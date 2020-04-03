import React, { useEffect, useState, useContext, useRef } from 'react';
import AppLayout from '../../components/layouts/AppLayout'
import { getSetting, getWidgetsWithData } from '../../_variables/ajaxVariables'
import { getMeta, getPosts } from '../../_variables/ajaxPostsVariables'
import SiteSettingSetter from '../../components/includes/SiteSettingsSetter/SiteSettingsSetter';
import withRouter from 'next/dist/client/with-router'
import Posts from '../../components/includes/Posts/Posts'
import Link from 'next/link'
import PaginationComponent from '../../components/includes/PaginationComponent/PaginationComponent'
import SideBar from '../../components/includes/Sidebar/Sidebar'

const posts = props => {
    const [ state, setState ] = useState({
        style: {}
    })

    useEffect(() => {

        if (props.identity.postPageSidebar) {
            setState({
                style: {
                    gridArea: 'content'
                }
            })
        }
    }, [props]);

    return (
        <>
            <AppLayout>
                <SiteSettingSetter  { ...props }/>
                <div  className={ props.identity.postsPageSidebar ? 'content withSidebar' : 'content withOutSidebar' }>
                    <div className="main">
                        <div className='posts'>
                            <Posts posts={ props.postsSource.posts || [] }/>

                        </div>
                        <PaginationComponent
                            isActive={ true }
                            currentPage={ props.getPostsData.pageNo }
                            totalCount={ props.postsSource.totalCount }
                            size={ props.getPostsData.size }
                            maxPage={ Math.ceil(parseInt(props.postsSource.totalCount) / parseInt(props.getPostsData.size)) }
                            queryData={props.query || props.router.query}
                            pathnameData={props.pathname ||props.router.pathname }
                        />
                    </div>
                    <SideBar isActive={ props.identity.postsPageSidebar } widgets={ props.widgets } position='postsPageSidebar'/>
                </div>

            </AppLayout>
        </>
    );
};

posts.getInitialProps = async ({ pathname, query, req, res, err }) => {
    let navigation;
    let identity;
    let postsSource;
    let widgets;
    const identityData = await getSetting('identity');
    const navigationData = await getSetting('navigation');
    const widgetsData = await getWidgetsWithData('postsPageSidebar')
    identity = identityData.data.setting ? identityData.data.setting.data : {}
    navigation = navigationData.data.setting ? navigationData.data.setting : {}

    const getPostsData = {
        size: parseInt(query.size) || parseInt(identity.postsCountPerPage) || 30,
        pageNo: parseInt(query.page) || 1,
        postType: query.type || 'all',
        fields: [ 'title', 'mainThumbnail', 'quality', 'likes', 'disLikes', 'views', 'duration' ],
        keyword: query.keyword || '',
        author: query.author || 'all',
        actor: query.actor || 'all',
        status: 'published',
        tag: query.tag || 'all',
        category: query.category || 'all',
        sort: query.sort || 'latest',
    }

    const postsData = await getPosts(getPostsData)
    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []
    postsSource = postsData.data ? postsData.data : []
    return { identity, navigation, query, postsSource, getPostsData,pathname, widgets }
}

export default withRouter(posts);
